import axios, { CreateAxiosDefaults } from "axios";
import { getCookie } from "typescript-cookie";
import { BASE_API_URL } from "utils/config";

const defaultAxiosConfig: CreateAxiosDefaults = {
  baseURL: BASE_API_URL,
};

export const fetchAuthenticated = () => axios.create({
  ...defaultAxiosConfig,
  headers: {
    Authorization: `${getCookie("_auth_type")} ${getCookie("_auth")}`,
  },
});

export const fetchNonAuthenticated = () => axios.create({ ...defaultAxiosConfig });
