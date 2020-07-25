import { apiGet, createAbsoluteUrl } from "./utils";
import { BASE_API_PATH, SEARCH_PATH } from "./constants";

// Given a path and some data creates and absolute path purring all the data as parameters afer the path.

export function getSearchResult(value) {
  return apiGet(
    createAbsoluteUrl(BASE_API_PATH, `${SEARCH_PATH}`, {
      action: "updateItem",
    }),
    value
  );
}
