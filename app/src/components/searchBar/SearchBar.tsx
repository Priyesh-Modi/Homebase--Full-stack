import React, { useState, ChangeEvent } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";

const types: string[] = ["buy", "rent"];

interface QueryState {
  type: string;
  city: string;
  minPrice: number;
  maxPrice: number;
}

function SearchBar(): JSX.Element {
  const [query, setQuery] = useState<QueryState>({
    type: "buy",
    city: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (val: string): void => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: name.includes('Price') ? Number(value) : value }));
  };

  return (
      <div className="searchBar">
        <div className="type">
          {types.map((type) => (
              <button
                  key={type}
                  onClick={() => switchType(type)}
                  className={query.type === type ? "active" : ""}
              >
                {type}
              </button>
          ))}
        </div>
        <form>
          <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleChange}
          />
          <input
              type="number"
              name="minPrice"
              min={0}
              max={10000000}
              placeholder="Min Price"
              onChange={handleChange}
          />
          <input
              type="number"
              name="maxPrice"
              min={0}
              max={10000000}
              placeholder="Max Price"
              onChange={handleChange}
          />
          <Link
              to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
          >
            <button>
              <img src="/search.png" alt="" />
            </button>
          </Link>
        </form>
      </div>
  );
}

export default SearchBar;

