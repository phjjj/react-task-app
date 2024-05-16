import React, { FC, useState } from "react";
import { useTypedSelector } from "../../hooks/redux";
import SideForm from "./SideForm/SideForm";
import { FiPlusCircle } from "react-icons/fi";
import { addSection, boardItem, boardItemActive, container, title } from "./BoardList.css";
import clsx from "clsx";

type TBoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

const BoardList: FC<TBoardListProps> = ({ activeBoardId, setActiveBoardId }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { boardArray } = useTypedSelector((state) => state.boards);

  const handleClick = () => {
    setIsFormOpen(!isFormOpen);
    // SideForm이 렌더링 되는데에 약간의 시간이 걸리기 때문에 setTimeout을 사용 ms단위로 0을 주어 렌더링이 완료된 후 포커스를 줍니다.
    // setTimeout(() => {
    //   inputRef.current?.focus();
    // }, 0);
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
        {isFormOpen ? <SideForm setIsFormOpen={setIsFormOpen} /> : <FiPlusCircle onClick={handleClick} />}
      </div>
    </div>
  );
};

export default BoardList;
