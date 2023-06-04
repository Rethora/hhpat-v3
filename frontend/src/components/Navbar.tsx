import { ReactElement } from "react";
import { useIsAuthenticated, useSignOut } from "react-auth-kit";
import { Link, useLocation } from "react-router-dom";
import { clientRoutes } from "routes/clientRoutes";

interface INavItem {
  label: string;
  path: string;
  icon: ReactElement;
}

// TODO: responsive icons
const loggedInItems: INavItem[] = [
  {
    label: "Dashboard",
    path: clientRoutes.authShared.dashboard,
    icon: <></>,
  },
  {
    label: "Profile",
    path: clientRoutes.authShared.profile,
    icon: <></>,
  },
];

const loggedOutItems: INavItem[] = [];

const sharedItems: INavItem[] = [
  { label: "HHPAT", path: clientRoutes.public.root, icon: <></> },
];

interface INavButtonProps {
  navItem: INavItem;
}

const NavItem = ({ navItem }: INavButtonProps) => {
  const { pathname } = useLocation();

  const isActive = pathname === navItem.path;

  return (
    <div
      className={`${
        isActive && pathname !== "/" ? "underline" : "no-underline"
      } px-4`}
    >
      <Link to={navItem.path}>{navItem.label}</Link>
    </div>
  );
};

export const Navbar = () => {
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();

  const currentNavItems = isAuthenticated()
    ? sharedItems.concat(loggedInItems)
    : sharedItems.concat(loggedOutItems);

  return (
    <div className="absolute left-0 top-0 h-14 w-screen bg-grey text-offWhite">
      <div className="flex h-full items-center justify-between">
        <div className="flex">
          {currentNavItems.map((item) => (
            <NavItem key={item.label} navItem={item} />
          ))}
        </div>
        <div>
          {isAuthenticated() ? (
            <div className="cursor-pointer px-4" onClick={() => signOut()}>
              Sign Out
            </div>
          ) : (
            <NavItem
              navItem={{
                label: "Sign In",
                path: clientRoutes.public.signIn,
                icon: <></>,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
