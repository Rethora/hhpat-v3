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

export interface IToken {
  access: string;
  refresh: string;
}

// * enums
export enum ELoadingStatus {
  IDLE,
  PENDING,
  FULFILLED,
  REJECTED,
}
