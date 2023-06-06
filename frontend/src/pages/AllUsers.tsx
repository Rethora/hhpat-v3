import { Center } from "components/Center";
import { Loading } from "components/Loading";
import React from "react";
import { Await, Link, useLoaderData } from "react-router-dom";
import { clientRoutes } from "routes/clientRoutes";

export const AllUsers = () => {
  const data: any = useLoaderData();

  return (
    <React.Suspense
      fallback={
        <Center>
          <Loading />
        </Center>
      }
    >
      <Await resolve={data.users} errorElement={<p>Error loading users...</p>}>
        {({ data }) => (
          <>
            {data.map((user: any) => (
              <div key={user.pk}>
                <Link to={`${clientRoutes.admin.users}${user.pk}/`}>
                  {user.email}
                </Link>
              </div>
            ))}
          </>
        )}
      </Await>
    </React.Suspense>
  );
};
