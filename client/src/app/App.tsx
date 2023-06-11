import Task from "../components/task/Task";
import Column from "../components/column/Column";

function App() {
  return (
    <>
      <Column>
        <Task
          key={1}
          title="Do chores"
          timestamp={1686410263}
          timesPostponed={0}
        />
        <Task
          key={2}
          title="Do other things"
          timestamp={1686400263}
          timesPostponed={6}
        />
      </Column>
    </>
  );
}

export default App;
