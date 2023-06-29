import { faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "components/Card";
import { Link } from "react-router-dom";
import { clientRoutes } from "routes/clientRoutes";

export const AdminDashboard = () => (
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
