import React, { FC, useState } from "react";
import { icon, input } from "./SideForm.css";
import { FiCheck } from "react-icons/fi";
import { usetypeDispatch } from "../../../hooks/redux";
import { addBoard } from "../../../store/slices/boardsSlice";
import { v4 as uuidv4 } from "uuid";
import { addLog } from "../../../store/slices/loggerSlice";

type TSideFormProps = {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const SideForm: FC<TSideFormProps> = ({ setIsFormOpen }) => {
  const [inputText, setInputText] = useState("");
  const dispatch = usetypeDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleOnBlur = () => {
    setIsFormOpen(false);
  };

  const handleClick = () => {
    if (inputText) {
      dispatch(addBoard({ board: { boardId: uuidv4(), boardName: inputText, lists: [] } }));
    }

    dispatch(
      addLog({
        logId: uuidv4(),
        logMessage: `게시판 등록 : ${inputText}`,
        logAuthor: "User",
        logTimestamp: String(Date.now()),
      })
    );
  };
  return (
    <div>
      <input
        className={input}
        autoFocus
        type="text"
        placeholder="새로운 게시판 등록하기"
        onChange={handleChange}
        value={inputText}
        onBlur={handleOnBlur}
      />
      <FiCheck onMouseDown={handleClick} className={icon} />
    </div>
  );
};

export default SideForm;
