import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useSignIn } from "react-auth-kit";
import { AxiosError } from "axios";
import { IconButton } from "@mui/material";
import { VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { Copyright } from "components/Copyright";
import { apiRoutes } from "routes/apiRoutes";
import { useApi } from "hooks/useApi";
import { apiTokenInfo } from "utils/config";

export const SignIn = () => {
  const { fetchNonAuthenticated } = useApi();
  const signIn = useSignIn();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const {
        data: { access, refresh },
      } = await fetchNonAuthenticated.post<{
        access: string;
        refresh: string;
      }>(apiRoutes.authentication.signin, {
        username: data.get("username"),
        password: data.get("password"),
      });

      const {
        data: { username, first_name, last_name, is_staff, is_superuser },
      } = await fetchNonAuthenticated.get<{
        username: string;
        first_name: string;
        last_name: string;
        is_staff: boolean;
        is_superuser: boolean;
      }>(apiRoutes.authentication.userSummary, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <VisibilityOffRounded />
                    ) : (
                      <VisibilityRounded />
                    )}
                  </IconButton>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </React.Fragment>
  );
};
