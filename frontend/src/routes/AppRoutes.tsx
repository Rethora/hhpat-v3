import {
  RouterProvider,
  createBrowserRouter,
  defer,
  redirect,
} from "react-router-dom";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { SignIn } from "pages/SignIn";
import { Dashboard } from "pages/Dashboard";
import { clientRoutes } from "./clientRoutes";
import { AppContainer } from "components/AppContainer";
import { NewUser } from "pages/NewUser";
import { ShowUser } from "pages/ShowUser";
import { useFetch } from "hooks/useFetch";
import { apiRoutes } from "./apiRoutes";
import { IUserResponse } from "types";
import { RootLayout } from "layouts/RootLayout";
import { AllUsers } from "pages/AllUsers";

export const AppRoutes = () => {
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const { fetchAuthenticated } = useFetch();

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
          path: clientRoutes.admin.users,
          loader: () => {
            const authUser = auth();
            if (!isAuthenticated() || !authUser) {
              return redirect(clientRoutes.public.signIn);
            } else if (authUser && !authUser.isStaff) {
              return redirect(clientRoutes.authShared.dashboard);
            }
            return null;
          },
          children: [
            {
              path: "new",
              element: <NewUser />,
            },
            {
              path: "all",
              element: <AllUsers />,
              loader: async () => {
                const usersPromise = fetchAuthenticated.get<IUserResponse[]>(
                  apiRoutes.admin.users
                );

                return defer({ users: usersPromise });
              },
            },
            {
              path: ":userId",
              element: <ShowUser />,
              loader: async ({ params }) => {
                const userPromise = fetchAuthenticated.get<IUserResponse>(
                  `${apiRoutes.admin.users}${params.userId}/`
                );

                return defer({ user: userPromise });
              },
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
