// * interfaces
export interface IUser {
  readonly id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_superuser: boolean;
  entries?: IEntry[];
}

export interface IEntry {
  readonly id: number;
  readonly created_at: string;
  readonly updated_at: string;
  weight: number | null;
  height: number | null;
  systolic: number | null;
  diastolic: number | null;
  blood_glucose: number | null;
  resting_metabolic_rate: number | null;
  cholesterol: number | null;
  low_density_lipoprotein: number | null;
  high_density_lipoprotein: number | null;
  triglycerides: number | null;
  vo2: number | null;
  sleep_score: number | null;
  stress_score: number | null;
  comments: string | null;
  readonly user: number;
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
