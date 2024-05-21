import { FC } from "react";
import { IList, ITask } from "../../types";
import { GrSubtract } from "react-icons/gr";
import Task from "../Task/Task";
import ActionButton from "../ActionButton/ActionButton";
import { usetypeDispatch } from "../../hooks/redux";
import { addLog } from "../../store/slices/loggerSlice";
import { v4 } from "uuid";
import { deleteList, setModalActive } from "../../store/slices/boardsSlice";
import { setModalData } from "../../store/slices/modalSlice";
import { deleteButton, header, listWrapper, name } from "./List.css";
import { Droppable } from "react-beautiful-dnd";

type TListProps = {
  list: IList;
  boardId: string;
};
const List: FC<TListProps> = ({ list, boardId }) => {
  const dispatch = usetypeDispatch();
  const handleListDelete = (listId: string) => {
    dispatch(deleteList({ boardId, listId }));

    dispatch(
      addLog({
        logId: v4(),
        logMessage: `리스트 삭제하기 : ${list.listName}`,
        logAuthor: "User",
        logTimestamp: String(Date.now()),
      })
    );
  };

  const handleTaskChange = (boardId: string, listId: string, task: ITask) => {
    dispatch(setModalData({ boardId, listId, task }));
    dispatch(setModalActive(true));
    dispatch(
      addLog({
        logId: v4(),
        logMessage: `작업 변경하기 : ${task.taskName}`,
        logAuthor: "User",
        logTimestamp: String(Date.now()),
      })
    );
  };
  return (
    <Droppable droppableId={list.listId}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className={listWrapper}>
          <div className={header}>
            <div className={name}>{list.listName}</div>
            <GrSubtract className={deleteButton} onClick={() => handleListDelete(list.listId)} />
          </div>
          {list.tasks.map((task, index) => (
            <div onClick={() => handleTaskChange(boardId, list.listId, task)} key={task.taskId}>
              <Task
                index={index}
                taskName={task.taskName}
                taskDescription={task.taskDescription}
                boardId={boardId}
                id={task.taskId}
              />
            </div>
          ))}
          {provided.placeholder}
          <ActionButton boardId={boardId} listId={list.listId} />
        </div>
      )}
    </Droppable>
  );
};

export default List;
