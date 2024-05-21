import { FC } from "react";
import { container, description, title } from "./Task.css";
import { Draggable } from "react-beautiful-dnd";

type TTaskProps = {
  index: number;
  id: string;
  boardId: string;
  taskName: string;
  taskDescription: string;
};

const Task: FC<TTaskProps> = ({ index, id, taskName, taskDescription }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provieded) => (
        <div
          className={container}
          ref={provieded.innerRef}
          {...provieded.dragHandleProps}
          {...provieded.draggableProps}>
          <div className={title}>{taskName}</div>
          <div className={description}>{taskDescription}</div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
