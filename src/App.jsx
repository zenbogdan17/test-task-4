import { useEffect, useState } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import { url } from './constants';
import AddTask from './components/AddTask';

function App() {
  const [taskList, setTaskList] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        setTaskList(data);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []);

  return (
    <div>
      <AddTask setTaskList={(data) => setTaskList((prev) => [...prev, data])} />
      <TaskList taskList={taskList} />
    </div>
  );
}

export default App;
