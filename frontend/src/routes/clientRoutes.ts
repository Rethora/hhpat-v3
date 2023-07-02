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
    singleUser: "/admin/users/:userId/",
    newUser: "/admin/users/new/",
    newUserEntry: "/admin/users/:userId/entries/new/",
    allUserEntries: "/admin/users/:userId/entries/all/",
    singleUserEntry: "/admin/users/:userId/entries/:entryId/",
  },
  authShared: {
    profile: "/profile/",
  },
};
