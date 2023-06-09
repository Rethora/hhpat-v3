import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "utils/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
