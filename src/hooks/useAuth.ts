import { useTypedSelector } from "./redux";

export function useAuth() {
  const { id, email } = useTypedSelector((state) => state.user);

  return {
    // !!를 사용하여 email이 존재하면 true, 존재하지 않으면 false를 반환합니다.
    isAuth: !!email,
    email,
    id,
  };
}
