import React from "react";
import { Link } from "react-router-dom";
import { clientRoutes } from "routes/clientRoutes";

export const NonAdminDashboard = () => (
  <React.Fragment>
    <Link to={clientRoutes.nonAdmin.listEntries}>Entries</Link>
  </React.Fragment>
);
