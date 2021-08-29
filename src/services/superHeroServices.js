import { fetchContent } from "../utils/fetchContent";
import { useQuery } from "react-query";

export const useSearchSuperHeroServices = (heroName) => {
  const { data, isLoading } = useQuery(
    ["searchSuperHero", heroName],
    async () => {
      const { results } = await fetchContent("/search/" + heroName);
      return results;
    }
  );

  return {
    data,
    isLoading,
  };
};
