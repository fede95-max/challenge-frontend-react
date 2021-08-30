import { useQuery } from "react-query";
import { fetchContent } from "../utils/fetchContent";

export const useSearchSuperHeroServices = (heroName) => {
  const { data, isLoading, error } = useQuery(
    ["searchSuperHero", heroName],

    async () => {
      if (heroName === "") {
        return {};
      }

      const results = await fetchContent("/search/" + heroName);

      return results.results;
    }
  );

  return {
    data,
    isLoading,
    error,
  };
};
