import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signInFunctionParams } from "react-auth-kit/dist/types";
import { apiRoutes } from "routes/apiRoutes";
import { fetchAuthenticated, fetchNonAuthenticated } from "routes/fetch";
import { ELoadingStatus, IEntry, IToken, IUser } from "types";
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

type TLoadingStatusKey =
  | "signUserIn"
  | "fetchUsers"
  | "createUser"
  | "fetchEntriesByUserId"
  | "createEntryForUser";

type TLoadingStatus = {
  [K in TLoadingStatusKey]: ILoadingStatus;
};

export interface IUserState {
  currentUser: IUser | null;
  users: IUser[];
  loadingStatus: TLoadingStatus;
}

const initialState: IUserState = {
  currentUser: null,
  users: [],
  loadingStatus: {
    signUserIn: { status: ELoadingStatus.IDLE, errorMessage: null },
    fetchUsers: { status: ELoadingStatus.IDLE, errorMessage: null },
    createUser: { status: ELoadingStatus.IDLE, errorMessage: null },
    fetchEntriesByUserId: { status: ELoadingStatus.IDLE, errorMessage: null },
    createEntryForUser: { status: ELoadingStatus.IDLE, errorMessage: null },
  },
};

export const userSlicer = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<IUser | null>) => {
      state.currentUser = action.payload;
    },
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
      state.users =
        action.payload.filter(u => u.id !== state.currentUser?.id) ||
        action.payload;
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
    builder.addCase(fetchEntriesByUserId.pending, state => {
      state.loadingStatus.fetchEntriesByUserId.status = ELoadingStatus.PENDING;
      state.loadingStatus.fetchEntriesByUserId.errorMessage = null;
    });
    builder.addCase(fetchEntriesByUserId.rejected, state => {
      state.loadingStatus.fetchEntriesByUserId.status = ELoadingStatus.REJECTED;
      state.loadingStatus.fetchEntriesByUserId.errorMessage =
        "Unable to retrieve entries";
    });
    builder.addCase(fetchEntriesByUserId.fulfilled, (state, action) => {
      state.loadingStatus.fetchEntriesByUserId.status =
        ELoadingStatus.FULFILLED;
      state.loadingStatus.fetchEntriesByUserId.errorMessage = null;

      const user = state.users.find(u => u.id === action.meta.arg.userId);
      if (user) {
        user.entries = action.payload;
      }
    });
    builder.addCase(createEntryForUser.pending, state => {
      state.loadingStatus.createEntryForUser.status = ELoadingStatus.PENDING;
      state.loadingStatus.createEntryForUser.errorMessage = null;
    });
    builder.addCase(createEntryForUser.rejected, state => {
      state.loadingStatus.createEntryForUser.status = ELoadingStatus.REJECTED;
      state.loadingStatus.createEntryForUser.errorMessage =
        "Unable to create entry";
    });
    builder.addCase(createEntryForUser.fulfilled, (state, action) => {
      state.loadingStatus.createEntryForUser.status = ELoadingStatus.FULFILLED;
      state.loadingStatus.createEntryForUser.errorMessage = null;

      const user = state.users.find(u => u.id === action.payload.user);
      if (user) {
        if (!user.entries) {
          user.entries = [];
        }
        user.entries.push(action.payload);
      }
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
    } = await fetchNonAuthenticated().post<IToken>(
      apiRoutes.authentication.signIn,
      { username, password }
    );

    const { data: authState } = await fetchNonAuthenticated().get<IUser>(
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
  const { data } = await fetchAuthenticated().get<IUser[]>(
    apiRoutes.admin.users
  );
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
    const { data } = await fetchAuthenticated().post<IUser>(
      apiRoutes.admin.users,
      {
        ...payload,
      }
    );

    return data;
  }
);

export const fetchEntriesByUserId = createAsyncThunk(
  "users/fetchEntriesByUserId",
  async ({ userId }: { userId: number }) => {
    const { data } = await fetchAuthenticated().get<IEntry[]>(
      apiRoutes.admin.usersEntries,
      {
        params: {
          user: userId,
        },
      }
    );
    return data;
  }
);

export const createEntryForUser = createAsyncThunk(
  "users/createEntryForUser",
  async ({ entry }: { entry: Partial<IEntry> }) => {
    const { data } = await fetchAuthenticated().post<IEntry>(
      apiRoutes.admin.usersEntries,
      entry
    );
    return data;
  }
);

export const selectUserById = (state: RootState, userId: number) =>
  state.users.users.find(user => user.id === userId) || null;

export const selectLastUserEntry = (state: RootState, userId: number) =>
  state.users.users.find(u => u.id === userId)?.entries?.slice(-1)[0] || null;

export const { setCurrentUser, reset, resetLoadingState } = userSlicer.actions;

export default userSlicer.reducer;
