import React from "react";
import { Center } from "components/Center";
import { Loading } from "components/Loading";
import { useAppSelector } from "hooks/useAppSelector";
import { Link } from "react-router-dom";
import { clientRoutes } from "routes/clientRoutes";
import { ELoadingStatus } from "types";

export const AllUsers = () => {
  const users = useAppSelector(state => state.users.users);
  const fetchUsersLoadingStatus = useAppSelector(
    state => state.users.loadingStatus.fetchUsers.status
  );

  if (fetchUsersLoadingStatus === ELoadingStatus.PENDING) {
    return (
      <Center>
        <Loading />
      </Center>
    );
  }

  if (fetchUsersLoadingStatus > ELoadingStatus.PENDING && users.length === 0) {
    return (
      <Center>
        <React.Fragment>No Users Found</React.Fragment>
      </Center>
    );
  }

  return (
    <React.Fragment>
      {users.map(user => (
        <div key={user.id}>
          <Link
            to={clientRoutes.admin.singleUser.replace(
              ":userId",
              user.id.toString()
            )}
          >
            {user.email}
          </Link>
        </div>
      ))}
    </React.Fragment>
  );
};
