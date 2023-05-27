import axios from "axios";

export const axiosFetcher = async ([url, searchParams = {}]: [
  url: string,
  searchParams: Record<string, string>
]) => {
  const nonUndefinedKeys = JSON.parse(JSON.stringify(searchParams));
  const queryParams = new URLSearchParams(nonUndefinedKeys || {}).toString();
  return axios
    .get(url + (queryParams ? `?${queryParams}` : ""))
    .then((res) => res.data);
};
