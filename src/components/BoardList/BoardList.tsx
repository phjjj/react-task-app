import React, { FC, useState } from "react";
import { useTypedSelector, usetypeDispatch } from "../../hooks/redux";
import SideForm from "./SideForm/SideForm";
import { FiLogIn, FiPlusCircle } from "react-icons/fi";
import { addButton, addSection, boardItem, boardItemActive, container, title } from "./BoardList.css";
import clsx from "clsx";
import { GoSignOut } from "react-icons/go";
import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../../firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { removeUser, setUser } from "../../store/slices/userSlice";
import { useAuth } from "../../hooks/useAuth";

type TBoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

const BoardList: FC<TBoardListProps> = ({ activeBoardId, setActiveBoardId }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { boardArray } = useTypedSelector((state) => state.boards);
  const dispatch = usetypeDispatch();
  const handleClick = () => {
    setIsFormOpen(!isFormOpen);
    // SideForm이 렌더링 되는데에 약간의 시간이 걸리기 때문에 setTimeout을 사용 ms단위로 0을 주어 렌더링이 완료된 후 포커스를 줍니다.
    // setTimeout(() => {
    //   inputRef.current?.focus();
    // }, 0);
  };

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const { isAuth } = useAuth();
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        dispatch(
          setUser({
            email: userCredential.user.email,
            id: userCredential.user.uid,
          })
        ); // userSlice.ts에 있는 setUser 함수를 사용하여 email과 id를 저장합니다.
      })
      .catch((error) => {
        // 에러 발생 시 에러를 출력합니다.
        console.log(error);
      });
  };

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={container}>
      <div className={title}>게시판 :</div>
      {boardArray.map((board, index) => (
        <div
          key={board.boardId}
          onClick={() => setActiveBoardId(boardArray[index].boardId)}
          className={clsx(
            {
              // 해당 조건이 만족한다면 boardItemActive 클래스를 추가하고, 그렇지 않다면 boardItem 클래스를 추가합니다.
              [boardItemActive]: boardArray.findIndex((b) => b.boardId === activeBoardId) === index,
            },
            {
              [boardItem]: boardArray.findIndex((b) => b.boardId === activeBoardId) !== index,
            }
          )}>
          <div>{board.boardName}</div>
        </div>
      ))}
      <div className={addSection}>
        {isFormOpen ? (
          <SideForm setIsFormOpen={setIsFormOpen} />
        ) : (
          <FiPlusCircle className={addButton} onClick={handleClick} />
        )}
        {isAuth ? (
          <GoSignOut className={addButton} onClick={handleSignout} />
        ) : (
          <FiLogIn className={addButton} onClick={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default BoardList;
