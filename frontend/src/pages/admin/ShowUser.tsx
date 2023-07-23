import React from "react";
import { Loading } from "components/Loading";
import { NeutralButton } from "components/NeutralButton";
import { selectUserById } from "features/user/userSlicer";
import { useAppSelector } from "hooks/useAppSelector";
import { Link, useParams } from "react-router-dom";
import { clientRoutes } from "routes/clientRoutes";
import { ELoadingStatus } from "types";
import { PositiveButton } from "components/PositiveButton";

export const ShowUser = () => {
  const { userId } = useParams();
  const user = useAppSelector(state =>
    selectUserById(state, userId ? +userId : -1)
  );
  const fetchEntriesByUserIdLoadingStatus = useAppSelector(
    state => state.users.loadingStatus.fetchEntriesByUserId.status
  );

  if (!user) {
    return <></>;
  }

  return (
    <>
      Email: {user.email}
      <br />
      <Link
        to={clientRoutes.admin.singleUserGraph.replace(
          ":userId",
          user.id.toString()
        )}
      >
        <PositiveButton>Graph</PositiveButton>
      </Link>
      <br />
      Entries:
      <br />
      {fetchEntriesByUserIdLoadingStatus === ELoadingStatus.PENDING ? (
        <Loading />
      ) : user.entries && user.entries.length > 0 ? (
        user.entries.map(entry => (
          <div key={entry.id}>
            <Link
              to={clientRoutes.admin.singleUserEntry
                .replace(":userId", user.id.toString())
                .replace(":entryId", entry.id.toString())}
            >
              {new Date(entry.created_at).toLocaleString()}
            </Link>
          </div>
        ))
      ) : (
        <React.Fragment>No Entries Found</React.Fragment>
      )}
      <br />
      <Link
        to={clientRoutes.admin.newUserEntry.replace(
          ":userId",
          user.id.toString()
        )}
      >
        <NeutralButton>New Entry</NeutralButton>
      </Link>
    </>
  );
};
