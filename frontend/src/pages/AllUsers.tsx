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

  return fetchUsersLoadingStatus === ELoadingStatus.PENDING ? (
    <Loading />
  ) : (
    <>
      {users.map(user => (
        <div key={user.id}>
          <Link to={`${clientRoutes.admin.users}${user.id}/`}>
            {user.email}
          </Link>
        </div>
      ))}
    </>
  );
};
