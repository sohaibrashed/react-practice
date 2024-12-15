import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Search } from "lucide-react";
import { useGetProductsQuery } from "@/services/productsApi";
import { useState } from "react";
import LoadingSpinner from "./ui/loadingSpinner";
import { useDebounce } from "../hooks/useDebounce";
import { ScrollArea } from "./ui/scroll-area";

export default function SearchSuggestions() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const { data, isLoading, isError } = useGetProductsQuery(
    { search: debouncedQuery },
    { skip: !debouncedQuery.trim() }
  );

  const results = debouncedQuery.trim() ? data?.products : [];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button title="Search" className="hover:text-gray-700">
          <Search size={20} />
        </button>
      </SheetTrigger>
      <SheetContent
        side="top"
        className={`p-4 border-none rounded-none shadow-none bg-slate-200 ${
          query.trim() && results?.length > 0 && "h-1/2"
        }`}
      >
        <div className="flex justify-center items-center">
          <Input
            type="text"
            placeholder="Search..."
            className="w-2/3 shadow-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center">
            <LoadingSpinner />
          </div>
        ) : results?.length > 0 ? (
          <div className="mt-2 w-2/3 mx-auto overflow-y-auto shadow-md h-4/5">
            {results.map((product) => (
              <Card
                key={product._id}
                className="flex flex-row-reverse items-center hover:bg-gray-100 justify-end cursor-pointer"
              >
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">
                    {product.name}
                  </CardTitle>
                  <CardDescription className="text-xs text-gray-500">
                    ${product.price}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src={product?.images[0]}
                    className="mt-5 w-24 h-24 object-cover rounded-md"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          debouncedQuery.trim() !== "" && (
            <div className="mt-2 w-2/3 mx-auto text-center text-gray-500">
              No results found
            </div>
          )
        )}
      </SheetContent>
    </Sheet>
  );
}
