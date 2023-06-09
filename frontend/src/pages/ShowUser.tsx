import { selectUserById } from "features/user/userSlicer";
import { useAppSelector } from "hooks/useAppSelector";
import { useParams } from "react-router-dom";

export const ShowUser = () => {
  const { userId } = useParams();
  const user = useAppSelector(state =>
    selectUserById(state, userId ? +userId : -1)
  );

  if (!user) return <>User not found</>;

  return <>{user.email}</>;
};
