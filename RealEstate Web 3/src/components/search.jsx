import React from "react";

export function Search () {
    return (
        <input 
          type="search"
          className="px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-rose-500 w-80"
          placeholder="Search for properties..."
        />
    );
}