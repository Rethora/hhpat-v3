export const clientRoutes = {
  public: {
    root: "/",
    signIn: "/sign-in/",
  },
  nonAdmin: {
    dashboard: "/user/dashboard/",
  },
  admin: {
    admin: "/admin/",
    dashboard: "/admin/dashboard/",
    users: "/admin/users/",
    allUsers: "/admin/users/all/",
    newUser: "/admin/users/new/",
  },
  authShared: {
    profile: "/profile/",
  },
};
