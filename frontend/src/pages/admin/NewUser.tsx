import { Formik, FormikErrors } from "formik";
import { createUser, resetLoadingState } from "features/user/userSlicer";

import { Center } from "components/Center";
import { ELoadingStatus } from "types";
import { Input } from "components/Input";
import { Loading } from "components/Loading";
import { Navigate } from "react-router-dom";
import { PositiveButton } from "components/PositiveButton";
import React from "react";
import { clientRoutes } from "routes/clientRoutes";
import { isEmpty } from "lodash";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { useSnackbar } from "notistack";

interface IFormValues {
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_superuser: boolean;
}

const initialValues: IFormValues = {
  first_name: "",
  last_name: "",
  email: "",
  is_staff: false,
  is_superuser: false,
};

const validate = (values: IFormValues) => {
  const errors: FormikErrors<IFormValues> = {};

  if (isEmpty(values.first_name)) {
    errors.first_name = "Required";
  }

  if (isEmpty(values.last_name)) {
    errors.last_name = "Required";
  }

  if (isEmpty(values.email)) {
    errors.email = "Required";
  }

  return errors;
};

export const NewUser = () => {
  const dispatch = useAppDispatch();
  const createUserLoadingStatus = useAppSelector(
    state => state.users.loadingStatus.createUser
  );
  const users = useAppSelector(state => state.users.users);
  const { enqueueSnackbar } = useSnackbar();
  const [newUserId, setNewUserId] = React.useState<number | null>(null);

  React.useEffect(() => {
    return () => {
      dispatch(resetLoadingState("createUser"));
    };
  }, [dispatch]);

  React.useEffect(() => {
    if (createUserLoadingStatus.status === ELoadingStatus.FULFILLED) {
      const newUser = users[users.length - 1];
      setNewUserId(newUser.id);
    }
  }, [createUserLoadingStatus.status, users]);

  React.useEffect(() => {
    if (createUserLoadingStatus.errorMessage !== null) {
      enqueueSnackbar({
        message: createUserLoadingStatus.errorMessage,
        variant: "error",
      });
    }
  }, [createUserLoadingStatus.errorMessage, enqueueSnackbar]);

  const onSubmit = (values: IFormValues) => {
    dispatch(createUser({ ...values, username: values.email }));
  };

  if (createUserLoadingStatus.status === ELoadingStatus.PENDING) {
    return (
      <Center>
        <Loading />
      </Center>
    );
  }

  return (
    <React.Fragment>
      <div className="flex h-3/4 flex-col items-center justify-center">
        <h1>Create a new user</h1>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Input
                id="first_name"
                name="first_name"
                labelprops={{ label: "First Name" }}
                placeholder="First Name"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.first_name}
                autoComplete="first_name"
                required
                autoFocus
                error={Boolean(errors.first_name && touched.first_name)}
                errortext={errors.first_name}
              />
              <Input
                id="last_name"
                name="last_name"
                labelprops={{
                  label: "Last Name",
                }}
                placeholder="Last Name"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.last_name}
                autoComplete="last_name"
                required
                error={Boolean(errors.last_name && touched.last_name)}
                errortext={errors.last_name}
              />
              <Input
                id="email"
                name="email"
                labelprops={{
                  label: "Email",
                }}
                placeholder="Email"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                autoComplete="email"
                required
                error={Boolean(errors.email && touched.email)}
                errortext={errors.email}
              />
              <div className="mt-4 flex justify-end">
                <PositiveButton type="submit">Submit</PositiveButton>
              </div>
            </form>
          )}
        </Formik>
      </div>
      {newUserId !== null && (
        <Navigate to={`${clientRoutes.admin.users}${newUserId}/`} />
      )}
    </React.Fragment>
  );
};
