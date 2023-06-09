import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { apiRoutes } from "routes/apiRoutes";
import { ELoadingStatus, IUser } from "types";
import { RootState } from "utils/store";

export interface IUserState {
  users: IUser[];
  loadingStatus: {
    fetchUsers: ELoadingStatus;
    createUser: ELoadingStatus;
  };
}

const initialState: IUserState = {
  users: [],
  loadingStatus: {
    fetchUsers: ELoadingStatus.IDLE,
    createUser: ELoadingStatus.IDLE,
  },
};

export const userSlicer = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, state => {
      state.loadingStatus.fetchUsers = ELoadingStatus.LOADING;
    });
    builder.addCase(fetchUsers.rejected, state => {
      state.loadingStatus.fetchUsers = ELoadingStatus.FAILED;
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<IUser[]>) => {
        state.loadingStatus.fetchUsers = ELoadingStatus.FULFILLED;
        state.users = action.payload;
      }
    );
    builder.addCase(createUser.pending, state => {
      state.loadingStatus.createUser = ELoadingStatus.LOADING;
    });
    builder.addCase(createUser.rejected, state => {
      state.loadingStatus.createUser = ELoadingStatus.FAILED;
    });
    builder.addCase(
      createUser.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.loadingStatus.createUser = ELoadingStatus.FULFILLED;
        state.users.push(action.payload);
      }
    );
  },
});

export const selectUserById = (state: RootState, userId: number) =>
  state.users.users.find(user => user.id === userId);

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (params: { fetchMethod: AxiosInstance }) => {
    const { data } = await params.fetchMethod.get<IUser[]>(
      apiRoutes.admin.users
    );
    return data;
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (params: {
    fetchMethod: AxiosInstance;
    payload: {
      first_name: string;
      last_name: string;
      username: string;
      email: string;
    };
  }) => {
    const { data } = await params.fetchMethod.post(
      apiRoutes.admin.users,
      params.payload
    );
    return data;
  }
);

// export const {} = userSlicer.actions;

export default userSlicer.reducer;
