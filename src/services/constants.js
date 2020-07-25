export const BASE_API_PATH =
  process.env.NODE_ENV === "development"
    ? "" // configurable DEV path
    : ""; // PROD path

export const SEARCH_PATH = "/search";
