import React, { useState, useEffect } from 'react';

const Search = ({ hotels, setFilteredHotels, allHotels }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!query) {
      setFilteredHotels(allHotels); // Reset when input is empty
      return;
    }

    const searchTerm = query.toLowerCase();
    const filtered = allHotels.filter(hotel =>
      hotel.properties.name.toLowerCase().includes(searchTerm) ||
      hotel.properties.city.toLowerCase().includes(searchTerm) ||
      (hotel.properties.address_line2 && hotel.properties.address_line2.toLowerCase().includes(searchTerm)) ||
      (hotel.properties.contact?.phone && hotel.properties.contact.phone.toLowerCase().includes(searchTerm))
    );

    setFilteredHotels(filtered);
  }, [query, allHotels, setFilteredHotels]);

  return (
    <input
      type="text"
      placeholder="Search hotels..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default Search;
