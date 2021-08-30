import axios from "axios";
import camelcaseKeys from "camelcase-keys";

const httpClient = axios.create({
  baseURL: "https://superheroapi.com/api/1211122722666933",
});

export const Method = {
  GET: "GET",
  PUT: "PUT",
  PATCH: "PATCH",
  POST: "POST",
  DELETE: "DELETE",
};

export const fetchContent = async (url, config = {}) => {
  try {
    const { body, ...options } = config;
    const source = axios.CancelToken.source();

    const request = {
      cancelToken: source.token,
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
      url,
    };

    if (body) {
      request.data = body;
    }
    const promise = httpClient.request(request);
    promise.cancel = () => source.cancel("cancelled");
    const response = await promise;

    if (response?.data?.error) {
      throw new Error(response.data.error);
    }
    return camelcaseKeys(response?.data, { deep: true });
  } catch (error) {
    throw error;
  }
};
