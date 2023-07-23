import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { clientRoutes } from "./clientRoutes";
import { RootLayout } from "layouts/RootLayout";
import { AdminLayout } from "layouts/AdminLayout";
import { AuthLayout } from "layouts/AuthLayout";
import { IUser } from "types";
import { SignIn } from "pages/nonAuth/SignIn";
import { AdminDashboard } from "pages/admin/AdminDashboard";
import { ListUsers } from "pages/admin/ListUsers";
import { NewUser } from "pages/admin/NewUser";
import { ShowUser } from "pages/admin/ShowUser";
import { useAppDispatch } from "hooks/useAppDispatch";
import { setCurrentUser } from "features/user/userSlicer";
import { NewUserEntry } from "pages/admin/NewUserEntry";
import { AdminUserLayout } from "layouts/AdminUserLayout";
import { ShowUserEntry } from "pages/admin/ShowUserEntry";
import { NonAdminLayout } from "layouts/NonAdminLayout";
import { NonAdminDashboard } from "pages/nonAdmin/NonAdminDashboard";
import { ListEntries } from "pages/nonAdmin/ListEntries";
import { ShowEntry } from "pages/nonAdmin/ShowEntry";
import { ShowUserGraph } from "pages/admin/ShowUserGraph";

export const AppRoutes = () => {
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const dispatch = useAppDispatch();

  const isSignedIn = React.useMemo(() => isAuthenticated(), [isAuthenticated]);

  const isAdmin = React.useMemo(() => {
    const authUser = auth() as IUser;
    if (isAuthenticated() && authUser) {
      return authUser.is_staff;
    }
    return false;
  }, [auth, isAuthenticated]);

  React.useEffect(() => {
    const currentUser = auth();
    dispatch(setCurrentUser(currentUser ? (currentUser as IUser) : null));
  }, [auth, dispatch, isSignedIn]);

  const router = createBrowserRouter([
    {
      path: clientRoutes.public.root,
      element: <RootLayout />,
      children: [
        {
          path: clientRoutes.public.root,
          element: <>root page</>,
        },
        {
          path: clientRoutes.public.signIn,
          element: <SignIn />,
          loader: () => {
            if (isSignedIn) {
              if (isAdmin) {
                return redirect(clientRoutes.admin.dashboard);
              } else {
                return redirect(clientRoutes.nonAdmin.dashboard);
              }
            }
            return null;
          },
        },
        {
          element: <AuthLayout />,
          loader: () => {
            if (!isSignedIn) {
              return redirect(clientRoutes.public.signIn);
            }
            return null;
          },
          children: [
            {
              path: clientRoutes.nonAdmin.nonAdmin,
              element: <NonAdminLayout />,
              loader: () => {
                if (isAdmin) {
                  return redirect(clientRoutes.admin.dashboard);
                }
                return null;
              },
              children: [
                {
                  path: "dashboard/",
                  element: <NonAdminDashboard />,
                },
                {
                  path: "entries/all/",
                  element: <ListEntries />,
                },
                {
                  path: "entries/:entryId",
                  element: <ShowEntry />,
                },
              ],
            },
            {
              path: clientRoutes.admin.admin,
              element: <AdminLayout />,
              loader: () => {
                if (!isAdmin) {
                  return redirect(clientRoutes.nonAdmin.dashboard);
                }
                return null;
              },
              children: [
                {
                  path: "dashboard/",
                  element: <AdminDashboard />,
                },
                {
                  path: "users/new/",
                  element: <NewUser />,
                },
                {
                  path: "users/all/",
                  element: <ListUsers />,
                },
                {
                  element: <AdminUserLayout />,
                  children: [
                    {
                      path: "users/:userId/",
                      element: <ShowUser />,
                    },
                    {
                      path: "users/:userId/graph/",
                      element: <ShowUserGraph />,
                    },
                    {
                      path: "users/:userId/entries/new/",
                      element: <NewUserEntry />,
                    },
                    {
                      path: "users/:userId/entries/:entryId/",
                      element: <ShowUserEntry />,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
