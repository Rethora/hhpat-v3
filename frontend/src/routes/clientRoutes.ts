export const clientRoutes = {
  public: {
    root: "/",
    signIn: "/sign-in/",
  },
  nonAdmin: {},
  admin: {
    admin: "/admin/",
    users: "/admin/users/",
    allUsers: "/admin/users/all/",
    newUser: "/admin/users/new/",
  },
  authShared: {
    dashboard: "/dashboard/",
    profile: "/profile/",
  },
};
