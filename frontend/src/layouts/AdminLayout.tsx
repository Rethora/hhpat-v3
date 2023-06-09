import { fetchUsers } from "features/user/userSlicer";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { useFetch } from "hooks/useFetch";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ELoadingStatus } from "types";

export const AdminLayout = () => {
  const { fetchAuthenticated } = useFetch();
  const dispatch = useAppDispatch();
  const userLoadingStatus = useAppSelector(
    state => state.users.loadingStatus.fetchUsers
  );

  useEffect(() => {
    if (userLoadingStatus === ELoadingStatus.IDLE) {
      dispatch(fetchUsers({ fetchMethod: fetchAuthenticated }));
    }
  }, [dispatch, fetchAuthenticated, userLoadingStatus]);

  return <Outlet />;
};
