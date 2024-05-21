import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBoard, IList, ITask } from "../../types";

type TBoardsState = {
  modalActive: boolean;
  boardArray: IBoard[];
};

type TaddBoardAction = {
  board: IBoard;
};

type TdeleteBoardAction = {
  boardId: string;
};

type TdeleteListAction = {
  boardId: string;
  listId: string;
};

type TaddListAction = {
  boardId: string;
  list: IList;
};

type TaddTaskAction = {
  boardId: string;
  listId: string;
  task: ITask;
};

type TDeleteTaskAction = {
  boardId: string;
  listId: string;
  taskId: string;
};

type TSortAction = {
  boardIndex: number;
  droppableIdStart: string;
  droppableIdEnd: string;
  droppableIndexStart: number;
  droppableIndexEnd: number;
  draggableId: string;
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
  reducers: {
    // action.payload에는 새로운 게시판의 이름이 들어옵니다.
    // 구조 분해 할당을 통해 payload를 추출합니다.
    addBoard: (state, { payload }: PayloadAction<TaddBoardAction>) => {
      state.boardArray.push(payload.board);
    },
    // action.payload에는 게시판의 id와 리스트의 id가 들어옵니다.
    // 구조 분해 할당을 통해 payload를 추출합니다.
    // boardArray를 map을 통해 순회하면서 boardId가 payload.boardId와 같은 board를 찾아내고,
    // 그 board의 lists를 filter를 통해 listId가 payload.listId와 같은 리스트를 제외한 나머지 리스트들만 남깁니다.
    // 그리고 나서 board의 lists를 payload로 업데이트합니다.
    // 이렇게 하면 리스트를 삭제할 수 있습니다.
    deleteBoard: (state, { payload }: PayloadAction<TdeleteBoardAction>) => {
      state.boardArray = state.boardArray.filter((board) => board.boardId !== payload.boardId);
    },
    addList: (state, { payload }: PayloadAction<TaddListAction>) => {
      state.boardArray.map((board) =>
        board.boardId === payload.boardId ? { ...board, lists: board.lists.push(payload.list) } : board
      );
    },
    addTask: (state, { payload }: PayloadAction<TaddTaskAction>) => {
      state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                list.listId === payload.listId
                  ? {
                      ...list,
                      tasks: list.tasks.push(payload.task),
                    }
                  : list
              ),
            }
          : board
      );
    },
    updateTask: (state, { payload }: PayloadAction<TaddTaskAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                list.listId === payload.listId
                  ? {
                      ...list,
                      tasks: list.tasks.map((task) =>
                        task.taskId === payload.task.taskId
                          ? {
                              ...task,
                              taskName: payload.task.taskName,
                              taskDescription: payload.task.taskDescription,
                              taskOwner: payload.task.taskOwner,
                            }
                          : task
                      ),
                    }
                  : list
              ),
            }
          : board
      );
    },
    deleteTask: (state, { payload }: PayloadAction<TDeleteTaskAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                list.listId === payload.listId
                  ? {
                      ...list,
                      tasks: list.tasks.filter((task) => task.taskId !== payload.taskId),
                    }
                  : list
              ),
            }
          : board
      );
    },
    deleteList: (state, { payload }: PayloadAction<TdeleteListAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.filter((list) => list.listId !== payload.listId),
            }
          : board
      );
    },
    setModalActive: (state, { payload }: PayloadAction<boolean>) => {
      state.modalActive = payload;
    },
    sort: (state, { payload }: PayloadAction<TSortAction>) => {
      // same list
      if (payload.droppableIdStart === payload.droppableIdEnd) {
        const list = state.boardArray[payload.boardIndex].lists.find(
          (list) => list.listId === payload.droppableIdStart
        );
        // splice를 통해 해당 리스트에서 해당 task를 제거합니다.
        // 그리고 나서 destination.index로 해당 task를 다시 추가합니다.
        // 이렇게 하면 task의 순서를 바꿀 수 있습니다.
        const card = list?.tasks.splice(payload.droppableIndexStart, 1);
        list?.tasks.splice(payload.droppableIndexEnd, 0, ...card!);
      }

      if (payload.droppableIdStart !== payload.droppableIdEnd) {
        // moving to other list
        const listStart = state.boardArray[payload.boardIndex].lists.find(
          (list) => list.listId === payload.droppableIdStart
        );
        const card = listStart?.tasks.splice(payload.droppableIndexStart, 1);

        const listEnd = state.boardArray[payload.boardIndex].lists.find(
          (list) => list.listId === payload.droppableIdEnd
        );
        listEnd?.tasks.splice(payload.droppableIndexEnd, 0, ...card!);
      }
    },
  },
});

// action creator를 내보냅니다.
export const { addList, deleteBoard, addTask, addBoard, deleteList, setModalActive, updateTask, deleteTask, sort } =
  boardSlice.actions;
export const boardReducer = boardSlice.reducer;
