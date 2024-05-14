import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../types";

type IModalState = {
  boardId: string;
  listId: string;
  task: ITask;
};
const initialState: IModalState = {
  boardId: "board-0",
  listId: "board-0",
  task: {
    taskId: "task-0",
    taskName: "task 0",
    taskDescription: "task description",
    taskOwner: "John",
  },
};
const modalSlice = createSlice({
  name: "modal",
  initialState, // 초기 상태
  reducers: {}, // 액션에 대한 리듀서
});

export const modalReducer = modalSlice.reducer;
