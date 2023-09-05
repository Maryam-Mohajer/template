import { useMutation, useQuery } from "@tanstack/react-query";
import methods from "../../interceptor/interceptor";

const GetAllForMenu = async () => {
  return await methods.get(
    `${process.env.NEXT_PUBLIC_API_URL}/MenuItem/GetAllForMenu`
  );
};

const ServeImage = async (file: any) => {
  return await methods.get(
    `${process.env.NEXT_PUBLIC_API_URL}/MenuCategory/ServeImage?fullFileName=${file}`,
    {
      responseType: "blob",
    }
  );
};

export const useGetAllForMenu = () =>
  useQuery(["GetAllForMenu"], GetAllForMenu, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

export const useServeImage = () => useMutation(["ServeImage"], ServeImage);
