import { useState } from "react";
import { appContainer, board, buttons, deleteBoardButton, loggerButton } from "./App.css.ts";
import BoardList from "./components/BoardList/BoardList.tsx";
import ListsContainer from "./components/ListsContainer/ListsContainer.tsx";
import { useTypedSelector } from "./hooks/redux.ts";
import EditModal from "./components/EditModal/EditModal.tsx";
import LoggerModal from "./components/LoggerModal/LoggerModal.tsx";
import { useDispatch } from "react-redux";
import { deleteBoard, sort } from "./store/slices/boardsSlice.ts";
import { addLog } from "./store/slices/loggerSlice.ts";
import { v4 } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const dispatch = useDispatch();
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);
  const [activeBoardId, setActiveBoardId] = useState("board-0");
  const modalActive = useTypedSelector((state) => state.boards.modalActive);
  const boards = useTypedSelector((state) => state.boards.boardArray);

  const getActiveBoard = boards.filter((board) => board.boardId === activeBoardId)[0];
  const lists = getActiveBoard.lists;
  console.log();
  const handelDeleteBoard = () => {
    if (boards.length > 1) {
      dispatch(deleteBoard({ boardId: getActiveBoard.boardId }));
      dispatch(
        addLog({
          logId: v4(),
          logMessage: `게시판 ${getActiveBoard.boardName}이 삭제되었습니다.`,
          logAuthor: "User",
          logTimeStmap: String(Date.now()),
        })
      );

      const newIndexToSet = () => {
        const indexToBeDeleted = boards.findIndex((board) => board.boardId === activeBoardId);

        return indexToBeDeleted === 0 ? indexToBeDeleted + 1 : indexToBeDeleted - 1;
      };

      setActiveBoardId(boards[newIndexToSet()].boardId);
    } else {
      alert("최소 한 개의 게시판이 있어야 합니다.");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    // sourceList는 드래그 시작한 리스트 정보
    const sourceList = lists.filter((list) => list.listId === source.droppableId)[0];

    dispatch(
      sort({
        boardIndex: boards.findIndex((board) => board.boardId === activeBoardId),
        // source.droppableId 드래그 시작한 리스트의 인덱스
        droppableIdStart: source.droppableId,
        // destination.droppableId 드래그 끝난 리스트의 인덱스
        droppableIdEnd: destination.droppableId,
        droppableIndexStart: source.index,
        droppableIndexEnd: destination.index,
        draggableId: draggableId,
      })
    );

    dispatch(
      addLog({
        logId: v4(),
        logMessage: `
        리스트 ${sourceList.listName}에서
        리스트 ${destination.droppableId}로 
        ${sourceList.tasks.filter((task) => task.taskId === draggableId)[0].taskName}이(가) 이동되었습니다.`,
        logAuthor: "User",
        logTimeStmap: String(Date.now()),
      })
    );
  };

  return (
    <div className={appContainer}>
      {isLoggerOpen ? <LoggerModal setIsLoggerOpen={setIsLoggerOpen} /> : null}
      {modalActive ? <EditModal /> : null}

      <BoardList activeBoardId={activeBoardId} setActiveBoardId={setActiveBoardId} />

      <div className={board}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <ListsContainer lists={lists} boardId={getActiveBoard.boardId} />
        </DragDropContext>
      </div>

      <div className={buttons}>
        <button className={deleteBoardButton} onClick={handelDeleteBoard}>
          이 게시판 삭제하기
        </button>
        <button className={loggerButton} onClick={() => setIsLoggerOpen(!isLoggerOpen)}>
          {isLoggerOpen ? "활동 목록 숨기기" : "활동 목록 보기"}
        </button>
      </div>
    </div>
  );
}

export default App;
