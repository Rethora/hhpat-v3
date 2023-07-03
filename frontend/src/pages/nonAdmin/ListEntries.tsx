import React from "react";
import { Center } from "components/Center";
import { Loading } from "components/Loading";
import { useAppSelector } from "hooks/useAppSelector";
import { ELoadingStatus } from "types";
import { Link } from "react-router-dom";
import { clientRoutes } from "routes/clientRoutes";

export const ListEntries = () => {
  const entries = useAppSelector(
    state => state.users.currentUser?.entries || null
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

  return (
    <React.Fragment>
      {entries &&
        entries.map(entry => (
          <div key={entry.id}>
            <Link
              to={clientRoutes.nonAdmin.showEntry.replace(
                ":entryId",
                entry.id.toString()
              )}
            >
              {new Date(entry.created_at).toDateString()}
            </Link>
          </div>
        ))}
    </React.Fragment>
  );
};
