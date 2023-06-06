import { faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "components/Card";
import React from "react";
import { useAuthUser } from "react-auth-kit";
import { Link } from "react-router-dom";
import { clientRoutes } from "routes/clientRoutes";

const AdminLayout = () => (
  <div className="flex w-full justify-between">
    <Link to={clientRoutes.admin.newUser}>
      <Card className="flex w-56 cursor-pointer items-center justify-center">
        <div className="flex items-center justify-center">
          <h2>Create a New User</h2>
          <FontAwesomeIcon icon={faPlus} className="pl-2" />
        </div>
      </Card>
    </Link>
    <Link to={clientRoutes.admin.allUsers}>
      <Card className="flex w-56 cursor-pointer items-center justify-center">
        <div className="flex w-56 items-center justify-center">
          <h2>All Users</h2>
          <FontAwesomeIcon icon={faUsers} className="pl-2" />
        </div>
      </Card>
    </Link>
  </div>
);

export const Dashboard = () => {
  const auth = useAuthUser();

  const isAdmin = React.useMemo(() => {
    const authUserState = auth();

    if (authUserState) {
      return authUserState.isStaff || authUserState.isSuperuser;
    }

    return false;
  }, [auth]);

  return (
    <div className="flex justify-between pt-10">
      {isAdmin && <AdminLayout />}
    </div>
  );
};
