import React from "react";
import { useSignIn } from "react-auth-kit";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { apiRoutes } from "routes/apiRoutes";
import { useFetch } from "hooks/useFetch";
import { apiTokenInfo } from "utils/config";
import { isEmpty } from "lodash";
import { Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Input } from "components/Input";
import { InputAdornment } from "components/InputAdornmnent";
import { IconButton } from "components/IconButton";
import { PositiveButton } from "components/PositiveButton";
import { IUserResponse } from "types";

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
  const { fetchNonAuthenticated } = useFetch();
  const signIn = useSignIn();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = async (values: IFormValues) => {
    try {
      const {
        data: { access, refresh },
      } = await fetchNonAuthenticated.post<{
        access: string;
        refresh: string;
      }>(apiRoutes.authentication.signin, {
        username: values.username,
        password: values.password,
      });

      const {
        data: { username, first_name, last_name, is_staff, is_superuser },
      } = await fetchNonAuthenticated.get<IUserResponse>(
        apiRoutes.authentication.userSummary,
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      signIn({
        token: access,
        expiresIn: apiTokenInfo.access.expiresIn,
        refreshToken: refresh,
        refreshTokenExpireIn: apiTokenInfo.refresh.expiresIn,
        tokenType: "Bearer",
        authState: {
          username,
          firstName: first_name,
          lastName: last_name,
          isStaff: is_staff,
          isSuperuser: is_superuser,
        },
      });
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          enqueueSnackbar({
            variant: "error",
            message: "Wrong password or username",
          });
        }
      }
    }
  };

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
                  placeholder="Username"
                  aria-label="username"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  autoComplete="username"
                  autoFocus
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
