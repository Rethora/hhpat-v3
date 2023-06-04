import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";
import { SignIn } from "pages/SignIn";
import { Dashboard } from "pages/Dashboard";
import { clientRoutes } from "./clientRoutes";
import { Root } from "pages/Root";
import { AppContainer } from "components/AppContainer";

export const AppRoutes = () => {
  const isAuthenticated = useIsAuthenticated();

  const router = createBrowserRouter([
    {
      path: clientRoutes.public.root,
      element: <Root />,
    },
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
  ]);

  return (
    <AppContainer>
      <RouterProvider router={router} />
    </AppContainer>
  );
};
