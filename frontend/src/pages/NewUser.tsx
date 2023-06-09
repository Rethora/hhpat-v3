import { Input } from "components/Input";
import { PositiveButton } from "components/PositiveButton";
import { createUser } from "features/user/userSlicer";
import { Formik } from "formik";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useFetch } from "hooks/useFetch";
import { isEmpty } from "lodash";
import { useSnackbar } from "notistack";
import React from "react";
import { Navigate } from "react-router-dom";
import { clientRoutes } from "routes/clientRoutes";

interface IFormValues {
  first_name: string;
  last_name: string;
  email: string;
}

const initialValues: IFormValues = {
  first_name: "",
  last_name: "",
  email: "",
};

const validate = (values: IFormValues) => {
  const errors: IFormValues = {} as IFormValues;

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
  const { fetchAuthenticated } = useFetch();
  const { enqueueSnackbar } = useSnackbar();
  const [newUserId, setNewUserId] = React.useState<number | null>(null);
  const dispatch = useAppDispatch();

  const onSubmit = async (values: IFormValues) => {
    const res = await dispatch(
      createUser({
        fetchMethod: fetchAuthenticated,
        payload: { ...values, username: values.email },
      })
    );

    const id = res.payload?.id;

    if (!id) {
      enqueueSnackbar({ message: "Couldn't create user", variant: "error" });
      return;
    }

    setNewUserId(+id);
  };

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
              <div className="input-with-error">
                <Input
                  name="first_name"
                  placeholder="First Name"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.first_name}
                  autoComplete="first_name"
                  required
                  autoFocus
                />
                <span className="error-span">
                  {errors.first_name && touched.first_name && errors.first_name}
                </span>
              </div>
              <div className="input-with-error">
                <Input
                  name="last_name"
                  placeholder="Last Name"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.last_name}
                  autoComplete="last_name"
                  required
                />
                <span className="error-span">
                  {errors.last_name && touched.last_name && errors.last_name}
                </span>
              </div>
              <div className="input-with-error">
                <Input
                  name="email"
                  placeholder="Email"
                  type="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  autoComplete="email"
                  required
                />
                <span className="error-span">
                  {errors.email && touched.email && errors.email}
                </span>
              </div>
              <div className="flex justify-end">
                <PositiveButton type="submit">Create</PositiveButton>
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
