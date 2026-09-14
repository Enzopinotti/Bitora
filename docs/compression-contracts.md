# Bitora compression contracts

This document makes the educational/product invariants explicit so tests and future refactors have a stable target.

## Lossless round-trip

For any supported non-empty input, the core contract is:

```text
decode(encode(input)) === input
```

This applies independently to Huffman and Shannon-Fano. A refactor that changes tree/code construction is acceptable only if the round-trip remains lossless.

## Frequencies and probabilities

For an input of length `N`:

- every emitted symbol has a positive frequency;
- the sum of symbol frequencies equals `N`;
- probability is derived from `frequency / N`;
- probability totals should equal `1` within normal floating-point tolerance.

## Prefix-code behavior

Generated codes must remain decodable without ambiguity. Huffman output is expected to satisfy the prefix-code property. Shannon-Fano output must likewise remain uniquely decodable for the generated table.

Bitora does **not** treat one exact code assignment as a public API when multiple valid assignments exist. Tie-breaking should only become a compatibility guarantee if it is explicitly covered by tests/file-format requirements.

## Edge cases

The implementation and tests should make these cases explicit instead of relying on incidental behavior:

- empty input;
- a single repeated symbol;
- whitespace/newlines;
- Unicode text if supported by the current implementation;
- uploaded text that is empty or invalid for the selected workflow.

## Metrics

Bitora exposes educational metrics such as:

- Shannon entropy;
- average code length;
- coding efficiency;
- original/compressed bit counts or compression reduction metrics.

Metric formulas must be derived from the same symbol-frequency/code table used for the displayed analysis. UI labels should not silently change the mathematical meaning of a metric.

## Compare mode

When comparing Huffman and Shannon-Fano:

- both algorithms operate on the exact same input;
- metrics are computed independently from each algorithm's code table;
- winner/difference messaging is derived from measured results rather than hard-coded algorithm preference.

## `.bitora` files

A `.bitora` file is an analysis artifact used to restore a prior Bitora session. Treat its structure as a compatibility boundary:

- required metadata and code-table data must be validated before restoration;
- malformed or incomplete files must fail clearly rather than partially mutating UI state;
- if the file shape evolves, introduce an explicit version/migration rule before breaking existing exported files.

The exact current schema should stay close to the implementation; this document defines compatibility expectations rather than inventing fields that do not exist.

## Quality authority

Current deterministic checks are intentionally small and honest:

1. backend dependencies install from `backend/package-lock.json`;
2. backend Jest tests pass;
3. frontend dependencies install from `frontend/package-lock.json`;
4. the production Vite build succeeds;
5. `docker compose config --quiet` accepts the repository Compose file.

Frontend behavior tests can be added when they protect real workflows; they are not required merely to make CI look larger.
