import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { SignIn } from "pages/SignIn";
import { Dashboard } from "pages/Dashboard";
import { clientRoutes } from "./clientRoutes";
import { AppContainer } from "components/AppContainer";
import { ShowUser } from "pages/ShowUser";
import { RootLayout } from "layouts/RootLayout";
import { AllUsers } from "pages/AllUsers";
import { AdminLayout } from "layouts/AdminLayout";
import { NewUser } from "pages/NewUser";

export const AppRoutes = () => {
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();

  const router = createBrowserRouter([
    {
      path: clientRoutes.public.root,
      element: <RootLayout />,
      children: [
        {
          path: clientRoutes.public.signIn,
          element: <SignIn />,
          loader: () => {
            if (isAuthenticated()) {
              return redirect(clientRoutes.authShared.dashboard);
            }
            return null;
          },
        },
        {
          path: clientRoutes.authShared.dashboard,
          element: <Dashboard />,
          loader: () => {
            if (!isAuthenticated()) {
              return redirect(clientRoutes.public.signIn);
            }
            return null;
          },
        },
        {
          path: clientRoutes.admin.admin,
          element: <AdminLayout />,
          loader: () => {
            if (!isAuthenticated()) {
              return redirect(clientRoutes.public.signIn);
            } else {
              const authUser = auth();
              if (authUser && !authUser.isStaff) {
                return redirect(clientRoutes.authShared.dashboard);
              }
            }
            return null;
          },
          children: [
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
  ]);

  return (
    <AppContainer>
      <RouterProvider router={router} />
    </AppContainer>
  );
};
