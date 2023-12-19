import { useEffect, useState } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import { url } from './constants';
import AddTask from './components/AddTask';

function App() {
  const [taskList, setTaskList] = useState(null);
  const [newTask, setNewTask] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        setTaskList(data);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, [newTask]);

  return (
    <div>
      <AddTask setNewTask={(data) => setNewTask((prev) => [...prev, data])} />
      <TaskList taskList={taskList} />
    </div>
  );
}

export default App;
