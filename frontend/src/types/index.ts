// * interfaces
export interface IUser {
  id: number;
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
  IDLE,
  LOADING,
  FULFILLED,
  FAILED,
}
