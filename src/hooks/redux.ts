import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

// reducx를 사용할 때 타입을 지정해줘야한다.

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
// eslint-disable-next-line react-hooks/rules-of-hooks
export const usetypeDispatch = () => useDispatch<AppDispatch>();
