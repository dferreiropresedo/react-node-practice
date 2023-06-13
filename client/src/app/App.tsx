import Task from "../components/task/Task";
import Column from "../components/column/Column";

function App() {
  const data = [
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
    <>
      <Column columnTitle="To do">
        {data.map((taskElement) => mapToTask(taskElement))}
      </Column>
    </>
  );
}

export default App;
