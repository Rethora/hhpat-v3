// * interfaces
export interface IUserResponse {
  pk: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_superuser: boolean;
  entries: string[];
}

// * enums
export enum ELoadingStatus {
  PENDING,
  LOADING,
  FULFILLED,
  FAILED,
}
