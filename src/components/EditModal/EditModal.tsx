import { ChangeEvent, useState } from "react";
import { FiX } from "react-icons/fi";
import { useTypedSelector, usetypeDispatch } from "../../hooks/redux";
import { deleteTask, setModalActive, updateTask } from "../../store/slices/boardsSlice";
import { addLog } from "../../store/slices/loggerSlice";
import { v4 } from "uuid";
import {
  buttons,
  closeButton,
  deleteButton,
  header,
  input,
  modalWindow,
  title,
  updateButton,
  wrapper,
} from "./EditModal.css";

const EditModal = () => {
  const editingState = useTypedSelector((state) => state.modal);
  const [data, setData] = useState(editingState);
  const dispatch = usetypeDispatch();

  const handleCloseButton = () => {
    dispatch(setModalActive(false));
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      task: {
        ...data.task,
        taskName: e.target.value,
      },
    });
  };
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      task: {
        ...data.task,
        taskDescription: e.target.value,
      },
    });
  };
  const handelAuthorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      task: {
        ...data.task,
        taskOwner: e.target.value,
      },
    });
  };

  const handleUpdate = () => {
    dispatch(
      updateTask({
        boardId: editingState.boardId,
        listId: editingState.listId,
        task: data.task,
      })
    );
    dispatch(
      addLog({
        logId: v4(),
        log: `일이 수정되었습니다. ${data.task.taskName}`,
        logAuthor: "User",
        logTimestamp: String(Date.now()),
      })
    );

    dispatch(setModalActive(false));
  };

  const handleDelete = () => {
    dispatch(
      deleteTask({
        boardId: editingState.boardId,
        listId: editingState.listId,
        taskId: editingState.task.taskId,
      })
    );

    dispatch(
      addLog({
        logId: v4(),
        log: `일이 삭제되었습니다. ${editingState.task.taskName}`,
        logAuthor: "User",
        logTimestamp: String(Date.now()),
      })
    );
    dispatch(setModalActive(false));
  };

  return (
    <div className={wrapper}>
      <div className={modalWindow}>
        <div className={header}>
          <div className={title}>{editingState.task.taskName}</div>
          <FiX className={closeButton} onClick={handleCloseButton} />
        </div>
        <div className={title}>제목</div>
        <input className={input} type="text" value={data.task.taskName} onChange={handleNameChange} />
        <div>설명</div>
        <input className={input} value={data.task.taskDescription} onChange={handleDescriptionChange} />
        <div>생성한 사람</div>
        <input className={input} type="text" value={data.task.taskOwner} onChange={handelAuthorChange} />
        <div className={buttons}>
          <button className={updateButton} onClick={handleUpdate}>
            일 수정하기
          </button>
          <button className={deleteButton} onClick={handleDelete}>
            일 삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
