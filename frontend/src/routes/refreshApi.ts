import axios from "axios";
import { createRefresh } from "react-auth-kit";
import { apiRoutes } from "./apiRoutes";
import { BASE_API_URL, apiTokenInfo } from "utils/config";

export const refreshApi = createRefresh({
  interval: 10, // Refreshes the token in every 10 minutes
  // @ts-ignore # tf?
  refreshApiCallback: async ({
    authToken,
    refreshToken,
  }) => {
    try {
      const {
        data: { access, refresh },
      } = await axios.post<{
        access: string;
        refresh: string;
      }>(
        BASE_API_URL + apiRoutes.authentication.tokenRefresh,
        { refresh: refreshToken },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      return {
        isSuccess: true,
        newAuthToken: access,
        newRefreshToken: refresh,
        newAuthTokenExpireIn: apiTokenInfo.access.expiresIn,
        newRefreshTokenExpiresIn: apiTokenInfo.refresh.expiresIn,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
      };
    }
  },
});
