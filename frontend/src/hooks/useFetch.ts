import axios from "axios";
import { useAuthHeader } from "react-auth-kit";
import { BASE_API_URL } from "utils/config";

export const useFetch = () => {
  const authHeader = useAuthHeader();

  axios.defaults.baseURL = BASE_API_URL;

  const fetchAuthenticated = axios.create({
    headers: {
      Authorization: authHeader(),
    },
  });

  const fetchNonAuthenticated = axios.create();

  return { fetchAuthenticated, fetchNonAuthenticated };
};
