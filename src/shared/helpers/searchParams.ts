import { ReadonlyURLSearchParams } from "next/navigation";

export const addQueryInParamsString = (
  name: string,
  value: any,
  params: ReadonlyURLSearchParams,
) => {
  const searchParams = new URLSearchParams(params.toString());
  searchParams.set(name, value.toString());

  return searchParams.toString();
};
