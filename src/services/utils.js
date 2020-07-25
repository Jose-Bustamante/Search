import axios from "axios";
import isEmpty from "lodash/isEmpty";
import Qs from "qs";

export function processParams(params) {
  const processedParams = {};
  Object.keys(params).forEach((key) => {
    if (params[key] !== null && params[key] !== undefined) {
      processedParams[key] = params[key];
    }
  });
  return Qs.stringify(processedParams);
}

export const createAbsoluteUrl = (baseUrl, path, data) => {
  let allParams = {};
  if (data) {
    allParams = {
      ...allParams,
      ...data,
    };
  }

  return isEmpty(allParams)
    ? `${baseUrl}${path}`
    : `${baseUrl}${path}?${processParams(allParams)}`;
};

/**
 * Perform a call to the REST API.
 * @param path
 * @returns {Promise<any>}
 */
export const apiGet = (path, contentType = "application/json") =>
  new Promise((resolve, reject) => {
    axios
      .get(path, {
        withCredentials: true,
        headers: {
          "Content-Type": `application/${contentType}; charset=UTF-8;`,
        },
        data: {},
      })
      .then(resolve)
      .catch(reject);
  });
