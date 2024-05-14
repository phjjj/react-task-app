import { createSlice } from "@reduxjs/toolkit";
import { IBoard } from "../../types";

type TBoardsState = {
  modalActive: boolean;
  boardArray: IBoard[];
};
const initialState: TBoardsState = {
  modalActive: false,
  boardArray: [
    {
      boardId: "board-0",
      boardName: "첫 번째 게시물",
      lists: [
        {
          listId: "list-0",
          listName: "List 1",
          tasks: [
            { taskId: "task-0", taskName: "Task 1", taskDescription: "Task 1 description", taskOwner: "Task 1 owner" },
          ],
        },
        {
          listId: "list-1",
          listName: "List 2",
          tasks: [
            { taskId: "task-1", taskName: "Task 2", taskDescription: "Task 1 description", taskOwner: "Task 2 owner" },
          ],
        },
      ],
    },
  ],
};
const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
});

export const boardReducer = boardSlice.reducer;
