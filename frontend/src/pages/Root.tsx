import { Navbar } from "components/Navbar";
import { useApi } from "hooks/useApi";
import { apiRoutes } from "routes/apiRoutes";

export const Root = () => {
  const { fetchAuthenticated } = useApi();

  return (
    <>
      <Navbar />
      <button
        onClick={() => {
          fetchAuthenticated
            .get(apiRoutes.userEntries.all)
            .then((res) => {
              console.log(res);
            })
            .catch((error) => console.error(error));
        }}
      >
        Click me
      </button>
    </>
  );
};
