import React from "react";
import { Center } from "components/Center";
import { Loading } from "components/Loading";
import { selectOwnEntryById } from "features/user/userSlicer";
import { useAppSelector } from "hooks/useAppSelector";
import { useParams } from "react-router-dom";
import { ELoadingStatus } from "types";

export const ShowEntry = () => {
  const { entryId } = useParams();
  const entry = useAppSelector(state =>
    selectOwnEntryById(state, entryId ? +entryId : -1)
  );
  const fetchOwnEntriesLoadingStatus = useAppSelector(
    state => state.users.loadingStatus.fetchOwnEntries.status
  );

  if (fetchOwnEntriesLoadingStatus === ELoadingStatus.PENDING) {
    return (
      <Center>
        <Loading />
      </Center>
    );
  }

  if (!entry) {
    return <React.Fragment>Entry Not Found</React.Fragment>;
  }

  return (
    <React.Fragment>
      <pre>{JSON.stringify(entry, null, 2)}</pre>
    </React.Fragment>
  );
};
