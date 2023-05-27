import axios from "axios";
import { createRefresh } from "react-auth-kit";

export const refreshApi = createRefresh({
  interval: 10, // Refreshes the token in every 10 minutes
  // @ts-ignore # tf?
  refreshApiCallback: async ({
    // arguments
    authToken,
    authTokenExpireAt,
    refreshToken,
    refreshTokenExpiresAt,
    authUserState,
  }) => {
    try {
      const {
        data: { access, refresh },
      } = await axios.post<{
        access: string;
        refresh: string;
      }>(
        "http://localhost:8080/token/refresh/",
        { refresh: refreshToken },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      return {
        isSuccess: true,
        newAuthToken: access,
        newRefreshToken: refresh,
        newAuthTokenExpireIn: authTokenExpireAt,
        newRefreshTokenExpiresIn: refreshTokenExpiresAt,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
      };
    }
  },
});
