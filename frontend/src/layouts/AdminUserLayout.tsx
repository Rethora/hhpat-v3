import React from "react";
import {
  fetchEntriesByUserId,
  resetLoadingState,
  selectUserById,
} from "features/user/userSlicer";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { Outlet, useParams } from "react-router-dom";
import { ELoadingStatus } from "types";
import { Center } from "components/Center";
import { Loading } from "components/Loading";

export const AdminUserLayout = () => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state =>
    selectUserById(state, userId ? +userId : -1)
  );
  const fetchUsersLoadingStatus = useAppSelector(
    state => state.users.loadingStatus.fetchUsers.status
  );
  const fetchEntriesByUserIdLoadingStatus = useAppSelector(
    state => state.users.loadingStatus.fetchEntriesByUserId.status
  );

  React.useEffect(() => {
    return () => {
      if (fetchEntriesByUserIdLoadingStatus > ELoadingStatus.IDLE) {
        dispatch(resetLoadingState("fetchEntriesByUserId"));
      }
    };
  }, [dispatch, fetchEntriesByUserIdLoadingStatus]);

  React.useEffect(() => {
    if (!user) {
      return;
    }

    if (
      fetchEntriesByUserIdLoadingStatus === ELoadingStatus.IDLE &&
      !user.entries
    ) {
      dispatch(fetchEntriesByUserId({ userId: user.id }));
    }
  }, [dispatch, fetchEntriesByUserIdLoadingStatus, user]);

  if (fetchUsersLoadingStatus === ELoadingStatus.PENDING) {
    return (
      <Center>
        <Loading />
      </Center>
    );
  }

  if (fetchUsersLoadingStatus > ELoadingStatus.PENDING && !user) {
    return (
      <Center>
        <React.Fragment>User Not Found</React.Fragment>
      </Center>
    );
  }

  return <Outlet />;
};
