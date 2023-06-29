import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { clientRoutes } from "./clientRoutes";
import { AppContainer } from "components/AppContainer";
import { RootLayout } from "layouts/RootLayout";
import { AdminLayout } from "layouts/AdminLayout";
import { AuthLayout } from "layouts/AuthLayout";
import { IUser } from "types";
import { SignIn } from "pages/nonAuth/SignIn";
import { AdminDashboard } from "pages/admin/AdminDashboard";
import { AllUsers } from "pages/admin/AllUsers";
import { NewUser } from "pages/admin/NewUser";
import { ShowUser } from "pages/admin/ShowUser";
import { useAppDispatch } from "hooks/useAppDispatch";
import { setCurrentUser } from "features/user/userSlicer";

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
    dispatch(setCurrentUser(auth() ? (auth() as IUser) : null));
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
