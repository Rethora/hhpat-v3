import { Center } from "components/Center";
import { Loading } from "components/Loading";
import { selectUserById } from "features/user/userSlicer";
import { useAppSelector } from "hooks/useAppSelector";
import React from "react";
import { useParams } from "react-router-dom";
import { ELoadingStatus } from "types";

export const ShowUserEntry = () => {
  const { userId, entryId } = useParams();
  const user = useAppSelector(state =>
    selectUserById(state, userId ? +userId : -1)
  );
  const fetchEntriesByUserIdLoadingStatus = useAppSelector(
    state => state.users.loadingStatus.fetchEntriesByUserId.status
  );
  const entry = React.useMemo(
    () =>
      user?.entries?.find(entry => entryId && entry.id === +entryId) || null,
    [entryId, user?.entries]
  );

  if (fetchEntriesByUserIdLoadingStatus === ELoadingStatus.PENDING) {
    return (
      <Center>
        <Loading />
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

  return (
    <React.Fragment>
      <pre>{JSON.stringify(entry, null, 2)}</pre>
    </React.Fragment>
  );
};
