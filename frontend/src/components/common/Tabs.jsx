import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext(null);

export function Tabs({ defaultValue, value, onValueChange, children, className = '', ...props }) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  const currentTab = value !== undefined ? value : activeTab;
  const setTab = onValueChange !== undefined ? onValueChange : setActiveTab;

  return (
    <TabsContext.Provider value={{ currentTab, setTab }}>
      <div className={`tabs ${className}`} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = '', ...props }) {
  return (
    <div className={`tabs__list ${className}`} {...props}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className = '', ...props }) {
  const { currentTab, setTab } = useContext(TabsContext);
  const isActive = currentTab === value;
  const activeClass = isActive ? 'tabs__trigger--active' : '';

  return (
    <button
      type="button"
      className={`tabs__trigger ${activeClass} ${className}`}
      onClick={() => setTab(value)}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className = '', ...props }) {
  const { currentTab } = useContext(TabsContext);
  if (currentTab !== value) return null;

  return (
    <div className={`tabs__content ${className}`} {...props}>
      {children}
    </div>
  );
}
