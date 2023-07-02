import React from "react";
import { fetchUsers } from "features/user/userSlicer";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { Outlet } from "react-router-dom";
import { ELoadingStatus } from "types";

export const AdminLayout = () => {
  const dispatch = useAppDispatch();
  const fetchUsersLoadingStatus = useAppSelector(
    state => state.users.loadingStatus.fetchUsers.status
  );

  React.useEffect(() => {
    if (fetchUsersLoadingStatus === ELoadingStatus.IDLE) {
      dispatch(fetchUsers());
    }
  }, [dispatch, fetchUsersLoadingStatus]);

  return <Outlet />;
};
