import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signInFunctionParams } from "react-auth-kit/dist/types";
import { apiRoutes } from "routes/apiRoutes";
import { fetchAuthenticated, fetchNonAuthenticated } from "routes/fetch";
import { ELoadingStatus, IToken, IUser } from "types";
import {
  ACCESS_TOKEN_EXPIRE_IN,
  REFRESH_TOKEN_EXPIRE_IN,
  TOKEN_TYPE,
} from "utils/config";
import { RootState } from "utils/store";

interface ILoadingStatus {
  status: ELoadingStatus;
  errorMessage: string | null;
}

type TLoadingStatusKey = "signUserIn" | "fetchUsers" | "createUser";

type TLoadingStatus = {
  [K in TLoadingStatusKey]: ILoadingStatus;
};

export interface IUserState {
  users: IUser[];
  loadingStatus: TLoadingStatus;
}

const initialState: IUserState = {
  users: [],
  loadingStatus: {
    signUserIn: { status: ELoadingStatus.IDLE, errorMessage: null },
    fetchUsers: { status: ELoadingStatus.IDLE, errorMessage: null },
    createUser: { status: ELoadingStatus.IDLE, errorMessage: null },
  },
};

export const userSlicer = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: state => {
      const { users, loadingStatus } = initialState;
      state.users = users;
      state.loadingStatus = loadingStatus;
    },
    resetLoadingState: (state, action: PayloadAction<TLoadingStatusKey>) => {
      state.loadingStatus[action.payload].status = ELoadingStatus.IDLE;
      state.loadingStatus[action.payload].errorMessage = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(signUserIn.pending, state => {
      state.loadingStatus.signUserIn.status = ELoadingStatus.PENDING;
      state.loadingStatus.signUserIn.errorMessage = null;
    });
    builder.addCase(signUserIn.rejected, state => {
      state.loadingStatus.signUserIn.status = ELoadingStatus.REJECTED;
      state.loadingStatus.signUserIn.errorMessage =
        "Wrong username or password";
    });
    builder.addCase(signUserIn.fulfilled, (state, action) => {
      state.loadingStatus.signUserIn.status = ELoadingStatus.FULFILLED;
      state.loadingStatus.signUserIn.errorMessage = null;
      action.meta.arg.signIn({
        token: action.payload.access,
        expiresIn: ACCESS_TOKEN_EXPIRE_IN,
        refreshToken: action.payload.refresh,
        refreshTokenExpireIn: REFRESH_TOKEN_EXPIRE_IN,
        tokenType: TOKEN_TYPE,
        authState: action.payload.authState,
      });
    });
    builder.addCase(fetchUsers.pending, state => {
      state.loadingStatus.fetchUsers.status = ELoadingStatus.PENDING;
      state.loadingStatus.fetchUsers.errorMessage = null;
    });
    builder.addCase(fetchUsers.rejected, state => {
      state.loadingStatus.fetchUsers.status = ELoadingStatus.REJECTED;
      state.loadingStatus.fetchUsers.errorMessage = "Unable to retrieve users";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loadingStatus.fetchUsers.status = ELoadingStatus.FULFILLED;
      state.loadingStatus.fetchUsers.errorMessage = null;
      state.users = action.payload;
    });
    builder.addCase(createUser.pending, state => {
      state.loadingStatus.createUser.status = ELoadingStatus.PENDING;
      state.loadingStatus.createUser.errorMessage = null;
    });
    builder.addCase(createUser.rejected, state => {
      state.loadingStatus.createUser.status = ELoadingStatus.REJECTED;
      state.loadingStatus.createUser.errorMessage = "Unable to create user";
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loadingStatus.createUser.status = ELoadingStatus.FULFILLED;
      state.loadingStatus.createUser.errorMessage = null;
      state.users.push(action.payload);
    });
  },
});

export const signUserIn = createAsyncThunk(
  "users/signUserIn",
  async ({
    username,
    password,
    signIn,
  }: {
    username: string;
    password: string;
    signIn: (signInConfig: signInFunctionParams) => boolean;
  }) => {
    const {
      data: { access, refresh },
    } = await fetchNonAuthenticated.post<IToken>(
      apiRoutes.authentication.signIn,
      { username, password }
    );

    const { data: authState } = await fetchNonAuthenticated.get<IUser>(
      apiRoutes.authentication.userSummary,
      { headers: { Authorization: `${TOKEN_TYPE} ${access}` } }
    );

    return {
      access,
      refresh,
      authState,
    };
  }
);

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const { data } = await fetchAuthenticated.get<IUser[]>(apiRoutes.admin.users);
  return data;
});

export const createUser = createAsyncThunk(
  "users/createUser",
  async (payload: {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    is_staff: boolean;
    is_superuser: boolean;
  }) => {
    const { data } = await fetchAuthenticated.post<IUser>(
      apiRoutes.admin.users,
      {
        ...payload,
      }
    );

    return data;
  }
);

export const selectUserById = (state: RootState, userId: number) =>
  state.users.users.find(user => user.id === userId);

export const { reset, resetLoadingState } = userSlicer.actions;

export default userSlicer.reducer;
