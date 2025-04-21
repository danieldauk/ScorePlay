import axios, { AxiosResponse } from "axios";

export const API_BASE_URL = "https://media.scoreplay.io";

const httpClient = axios.create({
  baseURL: API_BASE_URL,
});

const getData = (response: AxiosResponse) => response.data;

export const get = <T = unknown>(url: string): Promise<T> =>
  httpClient.get<T>(url).then(getData);
