import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { SignIn } from "pages/SignIn";
import { clientRoutes } from "./clientRoutes";
import { AppContainer } from "components/AppContainer";
import { ShowUser } from "pages/ShowUser";
import { RootLayout } from "layouts/RootLayout";
import { AllUsers } from "pages/AllUsers";
import { AdminLayout } from "layouts/AdminLayout";
import { NewUser } from "pages/NewUser";
import { AuthLayout } from "layouts/AuthLayout";
import { AdminDashboard } from "pages/AdminDashboard";
import { IUser } from "types";

export const AppRoutes = () => {
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();

  const isSignedIn = React.useMemo(() => isAuthenticated(), [isAuthenticated]);

  const isAdmin = React.useMemo(() => {
    const authUser = auth() as IUser;
    if (isAuthenticated() && authUser) {
      return authUser.is_staff;
    }
    return false;
  }, [auth, isAuthenticated]);

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
          path: "",
          element: <AuthLayout />,
          loader: () => {
            if (!isSignedIn) {
              return redirect(clientRoutes.public.signIn);
            }
            return null;
          },
          children: [
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
                  element: <AllUsers />,
                },
                {
                  path: "users/:userId/",
                  element: <ShowUser />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return (
    <AppContainer>
      <RouterProvider router={router} />
    </AppContainer>
  );
};
