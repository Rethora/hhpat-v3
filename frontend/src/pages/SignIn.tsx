import React from "react";
import { useSignIn } from "react-auth-kit";
import { useSnackbar } from "notistack";
import { isEmpty } from "lodash";
import { Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Input } from "components/Input";
import { InputAdornment } from "components/InputAdornmnent";
import { IconButton } from "components/IconButton";
import { PositiveButton } from "components/PositiveButton";
import { ELoadingStatus } from "types";
import { useAppDispatch } from "hooks/useAppDispatch";
import { resetLoadingState, signUserIn } from "features/user/userSlicer";
import { useAppSelector } from "hooks/useAppSelector";
import { Loading } from "components/Loading";
import { Center } from "components/Center";

interface IFormValues {
  username: string;
  password: string;
}

const initialValues: IFormValues = {
  username: "",
  password: "",
};

const validate = (values: IFormValues) => {
  const errors: IFormValues = {} as IFormValues;

  if (isEmpty(values.username)) {
    errors.username = "Required";
  }
  if (isEmpty(values.password)) {
    errors.password = "Required";
  }

  return errors;
};

export const SignIn = () => {
  const dispatch = useAppDispatch();
  const signUserInLoadingStatus = useAppSelector(
    state => state.users.loadingStatus.signUserIn
  );
  const signIn = useSignIn();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = React.useState(false);

  React.useEffect(() => {
    return () => {
      dispatch(resetLoadingState("signUserIn"));
    };
  }, [dispatch]);

  React.useEffect(() => {
    if (signUserInLoadingStatus.errorMessage !== null) {
      enqueueSnackbar({
        message: signUserInLoadingStatus.errorMessage,
        variant: "error",
      });
    }
  }, [enqueueSnackbar, signUserInLoadingStatus.errorMessage]);

  const onSubmit = async (values: IFormValues) => {
    const { username, password } = values;
    dispatch(signUserIn({ username, password, signIn }));
  };

  if (signUserInLoadingStatus.status === ELoadingStatus.PENDING) {
    return (
      <Center>
        <Loading />
      </Center>
    );
  }

  return (
    <React.Fragment>
      <div className="flex h-3/4 flex-col items-center justify-center">
        <h1>Sign In</h1>
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
                  name="username"
                  placeholder="Email or Username"
                  aria-label="username"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  autoComplete="username"
                  autoFocus
                  required
                />
                <span className="error-span">
                  {errors.username && touched.username && errors.username}
                </span>
              </div>
              <div className="input-with-error">
                <Input
                  name="password"
                  placeholder="Password"
                  aria-label="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  autoComplete="current-password"
                  required
                  endAdornment={
                    <InputAdornment>
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <FontAwesomeIcon width={20} icon={faEyeSlash} />
                        ) : (
                          <FontAwesomeIcon width={20} icon={faEye} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <span className="error-span">
                  {errors.password && touched.password && errors.password}
                </span>
              </div>
              <div className="flex justify-end">
                <PositiveButton type="submit">Sign In</PositiveButton>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
};
