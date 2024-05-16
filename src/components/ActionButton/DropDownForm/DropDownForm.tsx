import React, { FC, useState } from "react";
import { FiX } from "react-icons/fi";
import { addList, addTask } from "../../../store/slices/boardsSlice";
import { v4 } from "uuid";
import { addLog } from "../../../store/slices/loggerSlice";
import { usetypeDispatch } from "../../../hooks/redux";
import { button, buttons, close, input, listForm, taskForm } from "./DropDownFrom.css";

type TDropDownFromProps = {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  listId: string;
  boardId: string;
  list?: boolean;
};
const DropDownForm: FC<TDropDownFromProps> = ({ setIsFormOpen, listId, boardId, list }) => {
  const [text, setText] = useState("");
  const formPlaceholder = list ? "리스트의 제목을 입력하세요" : "일의 제목을 입력하세요";
  const buttonTitle = list ? "리스트 추가" : "일 추가";
  const dispatch = usetypeDispatch();
  // list에 따라 dispatch할 action을 다르게 해야함
  const handleButtonClick = () => {
    if (text) {
      if (list) {
        // list 추가
        dispatch(
          addList({
            boardId,
            list: { listId: v4(), listName: text, tasks: [] },
          })
        );
        // log 추가
        dispatch(
          addLog({
            logId: v4(),
            logMessage: `리스트 생성하기 : ${text}`,
            logAuthor: "User",
            logTimestamp: String(Date.now()),
          })
        );
      } else {
        // task 추가
        dispatch(
          addTask({
            boardId,
            listId,
            task: {
              taskId: v4(),
              taskName: text,
              taskDescription: "",
              taskOwner: "User",
            },
          })
        );

        // log 추가
        dispatch(
          addLog({
            logId: v4(),
            logMessage: `일 생성하기 : ${text}`,
            logAuthor: "User",
            logTimestamp: String(Date.now()),
          })
        );
      }
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  return (
    <div className={list ? listForm : taskForm}>
      <textarea
        className={input}
        onBlur={() => setIsFormOpen(false)}
        value={text}
        onChange={handleTextChange}
        autoFocus
        placeholder={formPlaceholder}
      />
      <div className={buttons}>
        <button className={button} onMouseDown={handleButtonClick}>
          {buttonTitle}
        </button>
        <FiX className={close} />
      </div>
    </div>
  );
};

export default DropDownForm;
