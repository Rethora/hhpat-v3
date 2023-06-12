import { reset } from "features/user/userSlicer";
import { useAppDispatch } from "hooks/useAppDispatch";
import React from "react";
import { ReactElement } from "react";
import { useAuthUser, useIsAuthenticated, useSignOut } from "react-auth-kit";
import { Link, useLocation } from "react-router-dom";
import { clientRoutes } from "routes/clientRoutes";

interface INavItem {
  label: string;
  path: string;
  icon: ReactElement;
}

// TODO: responsive icons
const defaultItems: INavItem[] = [
  { label: "HHPAT", path: clientRoutes.public.root, icon: <></> },
];

const nonAdminItems: INavItem[] = [
  { label: "Dashboard", path: clientRoutes.nonAdmin.dashboard, icon: <></> },
];

const adminItems: INavItem[] = [
  { label: "Dashboard", path: clientRoutes.admin.dashboard, icon: <></> },
];

interface INavButtonProps {
  navItem: INavItem;
}

const NavItem = ({ navItem }: INavButtonProps) => {
  const { pathname } = useLocation();
  const isActive = React.useRef(pathname === navItem.path);

  return (
    <div
      className={`${
        isActive.current && pathname !== "/" ? "underline" : "no-underline"
      } px-4`}
    >
      <Link to={navItem.path}>{navItem.label}</Link>
    </div>
  );
};

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const signOut = useSignOut();

  const isSignedIn = React.useMemo(() => isAuthenticated(), [isAuthenticated]);

  const isAdmin = React.useMemo(() => {
    const authUser = auth();
    if (isAuthenticated() && authUser) {
      return Boolean(authUser.is_staff);
    }
    return false;
  }, [auth, isAuthenticated]);

  const navItems = React.useMemo(() => {
    const items: INavItem[] = [];

    items.push(...defaultItems);

    if (isSignedIn) {
      if (isAdmin) {
        items.push(...adminItems);
      } else {
        items.push(...nonAdminItems);
      }
    }

    return items;
  }, [isSignedIn, isAdmin]);

  return (
    <div className="navbar-shadow absolute left-0 top-0 h-14 w-screen bg-grey text-offWhite">
      <div className="flex h-full items-center justify-between">
        <div className="flex">
          {navItems.map(item => (
            <NavItem key={item.label} navItem={item} />
          ))}
        </div>
        <div>
          {isSignedIn ? (
            <div
              className="cursor-pointer px-4"
              onClick={() => {
                signOut();
                dispatch(reset());
              }}
            >
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
