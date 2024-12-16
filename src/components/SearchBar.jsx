import React from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

export default function SearchBar({
  placeholder = "Search...",
  className = "",
  value,
  onChange,
}) {
  return (
    <>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`rounded-lg shadow-sm py-6 ${className}`}
      />
      <Search className="absolute right-3 text-gray-400" size={20} />
    </>
  );
}
