import { Link, useParams } from "react-router-dom";
import {
  deleteEntryForUser,
  resetLoadingState,
  selectUserById,
} from "features/user/userSlicer";

import { Center } from "components/Center";
import { ELoadingStatus } from "types";
import { Loading } from "components/Loading";
import { NegativeButton } from "components/NegativeButton";
import { NeutralButton } from "components/NeutralButton";
import { PositiveButton } from "components/PositiveButton";
import React from "react";
import { clientRoutes } from "routes/clientRoutes";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";

export const ShowUserEntry = () => {
  const dispatch = useAppDispatch();
  const { userId, entryId } = useParams();
  const user = useAppSelector(state =>
    selectUserById(state, userId ? +userId : -1)
  );
  const fetchEntriesByUserIdLoadingStatus = useAppSelector(
    state => state.users.loadingStatus.fetchEntriesByUserId.status
  );
  const deleteEntryForUserLoadingStatus = useAppSelector(
    state => state.users.loadingStatus.deleteEntryForUser.status
  );
  const entry = React.useMemo(
    () =>
      user?.entries?.find(entry => entryId && entry.id === +entryId) || null,
    [entryId, user?.entries]
  );

  const handleOnDelete = React.useCallback(() => {
    if (!entry) return;
    dispatch(deleteEntryForUser({ entry }));
  }, [dispatch, entry]);

  if (!user) {
    return (
      <Center>
        <React.Fragment>User Not Found!</React.Fragment>
      </Center>
    );
  }

  if (fetchEntriesByUserIdLoadingStatus > ELoadingStatus.PENDING && !entry) {
    return (
      <Center>
        <React.Fragment>No Entry Found!</React.Fragment>
      </Center>
    );
  }

  if (fetchEntriesByUserIdLoadingStatus === ELoadingStatus.PENDING) {
    return (
      <Center>
        <Loading />
      </Center>
    );
  }

  if (deleteEntryForUserLoadingStatus === ELoadingStatus.FULFILLED && user) {
    dispatch(resetLoadingState("deleteEntryForUser"));
    // return (
    //   <Navigate
    //     to={`${clientRoutes.admin.singleUser.replace(
    //       ":userId",
    //       user?.id.toString()
    //     )}`}
    //   />
    // );
  }

  return (
    <React.Fragment>
      <Link
        to={clientRoutes.admin.singleUser.replace(
          ":userId",
          user.id.toString()
        )}
      >
        <NeutralButton>Back</NeutralButton>
      </Link>
      <Link
        to={clientRoutes.admin.singleUserGraph.replace(
          ":userId",
          user.id.toString()
        )}
      >
        <PositiveButton>Graph</PositiveButton>
      </Link>
      <pre>{JSON.stringify(entry, null, 2)}</pre>
      <NegativeButton onClick={handleOnDelete}>Delete</NegativeButton>
    </React.Fragment>
  );
};
