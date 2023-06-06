export const clientRoutes = {
  public: {
    root: "/",
    signIn: "/sign-in/",
  },
  nonAdmin: {},
  admin: {
    users: "/users/",
    allUsers: "/users/all/",
    newUser: "/users/new/",
  },
  authShared: {
    dashboard: "/dashboard/",
    profile: "/profile/",
  },
};
