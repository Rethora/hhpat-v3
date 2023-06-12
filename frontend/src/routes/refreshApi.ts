import { createRefresh } from "react-auth-kit";
import { apiRoutes } from "./apiRoutes";
import { ACCESS_TOKEN_EXPIRE_IN, REFRESH_TOKEN_EXPIRE_IN } from "utils/config";
import { fetchNonAuthenticated } from "./fetch";
import { IToken } from "types";

export const refreshApi = createRefresh({
  interval: 30,
  refreshApiCallback: async ({ refreshToken }) => {
    try {
      const {
        data: { access, refresh },
      } = await fetchNonAuthenticated.post<IToken>(
        apiRoutes.authentication.tokenRefresh,
        {
          refresh: refreshToken,
        }
      );

      return new Promise(resolve => {
        resolve({
          isSuccess: true,
          newAuthToken: access,
          newRefreshToken: refresh,
          newAuthTokenExpireIn: ACCESS_TOKEN_EXPIRE_IN,
          newRefreshTokenExpiresIn: REFRESH_TOKEN_EXPIRE_IN,
        });
      });
    } catch (error) {
      return new Promise((_, reject) => reject({ isSuccess: false }));
    }
  },
});
