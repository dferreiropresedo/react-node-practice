import React from "react";
import Column from "../column/Column";
import Task from "../task/Task";
import { SCBoardColumns } from "./boardcomponents";

function Board() {
  const data1 = [
    { id: 1, timestamp: 1686410263, title: "Do chores", postponed: 0 },
    { id: 2, timestamp: 1686410263, title: "Do other things", postponed: 1 },
    { id: 3, timestamp: 1686410263, title: "Buy another", postponed: 3 },
    { id: 4, timestamp: 1686410263, title: "Check other", postponed: 0 },
    { id: 5, timestamp: 1686410263, title: "Check other", postponed: 0 },
    { id: 6, timestamp: 1686410263, title: "Check other", postponed: 0 },
    { id: 7, timestamp: 1686410263, title: "Check other", postponed: 0 },
    { id: 8, timestamp: 1686410263, title: "Check other", postponed: 0 },
    { id: 9, timestamp: 1686410263, title: "Check other", postponed: 0 },
    { id: 10, timestamp: 1686410263, title: "Check other", postponed: 0 },
  ];

  const data2 = [
    { id: 1, timestamp: 1686410263, title: "Do chores", postponed: 0 },
    { id: 2, timestamp: 1686410263, title: "Do other things", postponed: 1 },
  ];

  const data3 = [
    { id: 1, timestamp: 1686410263, title: "Do chores", postponed: 0 },
    { id: 2, timestamp: 1686410263, title: "Do other things", postponed: 1 },
    { id: 6, timestamp: 1686410263, title: "Check other", postponed: 0 },
    { id: 7, timestamp: 1686410263, title: "Check other", postponed: 0 },
    { id: 8, timestamp: 1686410263, title: "Check other", postponed: 0 },
  ];

  const data4 = [];

  const mapToTask = function (taskData: {
    id: number;
    title: string;
    timestamp: number;
    postponed: number;
  }) {
    return (
      <Task
        key={taskData.id}
        title={taskData.title}
        timestamp={taskData.timestamp}
        timesPostponed={taskData.postponed}
      />
    );
  };

  return (
    <SCBoardColumns>
      <Column columnTitle="To do">
        {data1.map((taskElement) => mapToTask(taskElement))}
      </Column>
      <Column columnTitle="Doing">
        {data2.map((taskElement) => mapToTask(taskElement))}
      </Column>
      <Column columnTitle="Done">
        {data3.map((taskElement) => mapToTask(taskElement))}
      </Column>
      <Column columnTitle="Done">
        {data4.map((taskElement) => mapToTask(taskElement))}
      </Column>
      <Column columnTitle="Done">
        {data1.map((taskElement) => mapToTask(taskElement))}
      </Column>
      <Column columnTitle="Done">
        {data1.map((taskElement) => mapToTask(taskElement))}
      </Column>
      <Column columnTitle="Done">
        {data2.map((taskElement) => mapToTask(taskElement))}
      </Column>
    </SCBoardColumns>
  );
}

export default Board;
