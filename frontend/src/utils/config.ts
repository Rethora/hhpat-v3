export const BASE_API_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:8080" : "";

export const apiTokenInfo = {
  access: {
    expiresIn: 10,
  },
  refresh: {
    expiresIn: 60,
  },
};