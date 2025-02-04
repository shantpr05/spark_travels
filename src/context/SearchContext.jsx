import React, { createContext, useContext } from 'react';

// useContext is used to avoid prop drilling in the search component
export const SearchContext = createContext();

export const SearchProvider = ({ children, searchSubmit }) => {
  return (
    <SearchContext.Provider value={searchSubmit}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (context === undefined) {
      throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
  };