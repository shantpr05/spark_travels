import React, { createContext, useContext } from 'react';

// Create the context
export const SearchContext = createContext();

// Create a provider component
export const SearchProvider = ({ children, searchSubmit }) => {
  return (
    <SearchContext.Provider value={searchSubmit}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to use the search context
export const useSearch = () => {
    const context = useContext(SearchContext);
    if (context === undefined) {
      throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
  };