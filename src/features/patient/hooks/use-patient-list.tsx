import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { ovokClient } from "../../../app/_layout";

export const usePatientList = () => {
  const debounceTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const [searchQuery, setSearchQuery] = React.useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = React.useState("");
  const { data: patients, isLoading } = useQuery({
    queryKey: ["patients", debouncedSearchQuery],
    queryFn: () => {
      const searchParams: Record<string, string> = {
        _sort: "name",
        _count: "100",
        name: debouncedSearchQuery,
      };

      return ovokClient.searchResources("Patient", searchParams);
    },
  });

  const handleSearchQueryChange = React.useCallback(
    (query: string) => {
      setSearchQuery(query);

      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        setDebouncedSearchQuery(query.trim());
      }, 300);
    },
    [setSearchQuery]
  );

  return {
    searchQuery,
    debouncedSearchQuery,
    patients: patients || [],
    isLoading: isLoading && !patients,
    handleSearchQueryChange,
  };
};
