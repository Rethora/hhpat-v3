import { fetchOwnEntries, resetLoadingState } from "features/user/userSlicer";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import React from "react";
import { Outlet } from "react-router-dom";
import { ELoadingStatus } from "types";

export const AuthLayout = () => {
  const dispatch = useAppDispatch();
  const entries = useAppSelector(
    state => state.users.currentUser?.entries || null
  );
  const fetchOwnEntriesLoadingStatus = useAppSelector(
    state => state.users.loadingStatus.fetchOwnEntries.status
  );

  React.useEffect(() => {
    return () => {
      if (fetchOwnEntriesLoadingStatus > ELoadingStatus.IDLE) {
        dispatch(resetLoadingState("fetchOwnEntries"));
      }
    };
  }, [dispatch, fetchOwnEntriesLoadingStatus]);

  React.useEffect(() => {
    if (fetchOwnEntriesLoadingStatus === ELoadingStatus.IDLE && !entries) {
      dispatch(fetchOwnEntries());
    }
  }, [dispatch, entries, fetchOwnEntriesLoadingStatus]);

  return <Outlet />;
};
