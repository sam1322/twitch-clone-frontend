"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import qs from "query-string";

interface SearchProps {}

const Search: FC<SearchProps> = ({}) => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!value) return;
      const url = qs.stringifyUrl(
        {
          url: "/search",
          query: { term: value },
        },
        { skipEmptyString: true }
      );

      router.push(url);
    } catch (error) {
      console.error("error", error);
    }
  };

  const onClear = () => {
    setValue("");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative w-full lg:w-[400px] flex items-center border border-muted-foreground rounded-full h-9 transition focus-within:border-primary-foreground focus-within:ring-2 focus-within:ring-primary-foreground focus-within:ring-opacity-50 focus-within:ring-offset-2 focus-within:ring-offset-muted-foreground focus-within:ring-offset-opacity-50"
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        className=" h-8 rounded-full focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
      {value && (
        <X
          className="absolute top-1.8 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
          onClick={onClear}
        />
      )}
      <Button
        type="submit"
        size="sm"
        variant={"ghost"}
        className="rounded-tl-none rounded-bl-none rounded-tr-full rounded-br-full h-8 "
      >
        <SearchIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
      {/* <MagnifyingGlassIcon /> */}
    </form>
  );
};

export default Search;
