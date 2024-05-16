import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../types";

type TModalState = {
  boardId: string;
  listId: string;
  task: ITask;
};

type TSetModalDataAction = {
  boardId: string;
  listId: string;
  task: ITask;
};

const initialState: TModalState = {
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
  reducers: {
    setModalData: (state, { payload }: PayloadAction<TSetModalDataAction>) => {
      // payload로 받은 데이터를 state에 저장합니다.
      state.boardId = payload.boardId;
      state.listId = payload.listId;
      state.task = payload.task;
    },
  }, // 액션에 대한 리듀서
});

export const { setModalData } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
