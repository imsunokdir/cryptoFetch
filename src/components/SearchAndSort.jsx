import React from "react";

const SearchAndSort = ({ searchTerm, setSearchTerm, setSortConfig }) => {
  const handleSort = (e) => {
    const [key, direction] = e.target.value.split(":");
    setSortConfig({ key, direction });
  };
  return (
    <div className="inputs">
      <input
        type="text"
        placeholder="search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="sorts">
        <label htmlFor="sort-by">Sort by</label>
        <select
          onChange={handleSort}
          defaultValue="market_cap:desc"
          id="sort-by"
        >
          <option value="market_cap:desc">Market Cap: High to Low</option>
          <option value="market_cap:asc">Market Cap: Low to High</option>
          <option value="price_change_percentage_24h:desc">
            % Change: High to Low
          </option>
          <option value="price_change_percentage_24h:asc">
            % Change: Low to High
          </option>
        </select>
      </div>
    </div>
  );
};

export default SearchAndSort;
