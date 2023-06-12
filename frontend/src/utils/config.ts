export const BASE_API_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:8080" : "";

export const TOKEN_TYPE = "Bearer";

export const ACCESS_TOKEN_EXPIRE_IN = 60;

export const REFRESH_TOKEN_EXPIRE_IN = 65;
