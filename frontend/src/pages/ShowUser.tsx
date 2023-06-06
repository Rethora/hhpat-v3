import { Center } from "components/Center";
import { Loading } from "components/Loading";
import React from "react";
import { Await, useLoaderData } from "react-router-dom";

// TODO:
// show user info
// show entries
// option to delete

export const ShowUser = () => {
  const data: any = useLoaderData();

  return (
    <React.Suspense
      fallback={
        <Center>
          <Loading />
        </Center>
      }
    >
      <Await resolve={data.user} errorElement={<p>Error loading user!</p>}>
        {({ data }) => (
          <>
            <p>user email: {data.email}</p>
          </>
        )}
      </Await>
    </React.Suspense>
  );
};
