import { useDispatch } from "react-redux";
import { AppDispatch } from "utils/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
