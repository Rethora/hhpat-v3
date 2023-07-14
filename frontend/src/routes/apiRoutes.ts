export const apiRoutes = {
  authentication: {
    signIn: "/token/",
    userSummary: "/user-summary/",
    tokenRefresh: "/token/refresh/",
    tokenBlacklist: "/token/blacklist/",
  },
  nonAdmin: {
    entries: "/api/user/entries/",
  },
  admin: {
    users: "/api/admin/users/",
    usersEntries: "/api/admin/entries/",
  },
};
