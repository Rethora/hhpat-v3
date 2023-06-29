import { NeutralButton } from "components/NeutralButton";
import { selectUserById } from "features/user/userSlicer";
import { useAppSelector } from "hooks/useAppSelector";
import { Link, useParams } from "react-router-dom";
import { clientRoutes } from "routes/clientRoutes";

export const ShowUser = () => {
  const { userId } = useParams();
  const user = useAppSelector(state =>
    selectUserById(state, userId ? +userId : -1)
  );

  if (!user) return <>User not found</>;

  return (
    <>
      {user.email}
      <br />
      <Link to={clientRoutes.admin.newUserEntry}>
        <NeutralButton>New Entry</NeutralButton>
      </Link>
    </>
  );
};
