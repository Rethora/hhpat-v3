import { fetchUsers } from "features/user/userSlicer";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ELoadingStatus } from "types";

export const AdminLayout = () => {
  const dispatch = useAppDispatch();
  const userLoadingStatus = useAppSelector(
    state => state.users.loadingStatus.fetchUsers.status
  );

  useEffect(() => {
    if (userLoadingStatus === ELoadingStatus.IDLE) {
      dispatch(fetchUsers());
    }
  }, [dispatch, userLoadingStatus]);

  return <Outlet />;
};
