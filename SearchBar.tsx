import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { useState } from "react";

type SearchType = "all" | "isbn" | "author" | "title";

interface SearchBarProps {
  onSearch: (query: string, type: SearchType) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "Search books..." }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("all");

  const handleSearch = () => {
    onSearch(query, searchType);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("", "all");
    setSearchType("all");
  };

  const searchTypes: { value: SearchType; label: string }[] = [
    { value: "all", label: "All" },
    { value: "isbn", label: "ISBN" },
    { value: "author", label: "Author" },
    { value: "title", label: "Title" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10"
            data-testid="input-search"
          />
        </div>
        <Button onClick={handleSearch} data-testid="button-search">
          Search
        </Button>
        {(query || searchType !== "all") && (
          <Button variant="outline" onClick={handleClear} data-testid="button-clear-search">
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {searchTypes.map((type) => (
          <Badge
            key={type.value}
            variant={searchType === type.value ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => setSearchType(type.value)}
            data-testid={`badge-filter-${type.value}`}
          >
            {type.label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
