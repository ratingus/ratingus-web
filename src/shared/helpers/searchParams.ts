import { ReadonlyURLSearchParams } from "next/navigation";

export const addQueryInParamsString = (
  params: ReadonlyURLSearchParams,
  ...queries: { name: string; value: any }[]
) => {
  const searchParams = new URLSearchParams(params.toString());
  queries.forEach(({ name, value }) => {
    if (value === undefined) {
      searchParams.delete(name);
      return;
    }
    searchParams.set(name, value.toString());
  });

  return searchParams.toString();
};
