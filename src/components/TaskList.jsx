import React, { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { SlExclamation, SlCheck } from 'react-icons/sl';
import { RiSortAsc, RiSortDesc } from 'react-icons/ri';
import { format } from 'date-fns';
import Button from './Button';
import styles from './../../styles/taskList.module.css';
import { url } from '../constants';
import toast from 'react-hot-toast';

const TaskList = ({ taskList }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [filteredTaskList, setFilteredTaskList] = useState([]);
  const [taskSelectedId, setTaskSelectedId] = useState('');
  const [reversTaskList, setReversTaskList] = useState(false);
  const [sortTask, setSortTask] = useState('');

  const handleSortTask = (event) => {
    setSortTask(event.target.value);

    if (event.target.value === 'priority') {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };

      setFilteredTaskList(
        filteredTaskList.sort((a, b) => {
          const priorityComparison =
            priorityOrder[a.priority] - priorityOrder[b.priority];

          if (priorityComparison === 0) {
            return new Date(a.createdAt) - new Date(b.createdAt);
          }

          return priorityComparison;
        })
      );
    }

    if (event.target.value === 'finished') {
      setFilteredTaskList(
        filteredTaskList.sort((a, b) => {
          return b.status - a.status;
        })
      );
    }

    if (event.target.value === 'date') {
      setFilteredTaskList(
        filteredTaskList.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
      );
    }
  };

  useEffect(() => {
    if (taskList) {
      setIsLoading(false);
      setFilteredTaskList(taskList);
    } else {
      setIsLoading(true);
    }
  }, [taskList]);

  const handlerDeleteTask = (id) => {
    fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => {
        toast.success('Successfully delete task!');
        setFilteredTaskList((prevTaskList) =>
          prevTaskList.filter((task) => task.id !== id)
        );
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Something went wrong!');
      });
  };

  const handlerFinishedTask = (id) => {
    fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: true }),
    })
      .then((response) => response.json())
      .then(() => {
        setFilteredTaskList((prevTaskList) =>
          prevTaskList.map((task) =>
            task.id === id ? { ...task, status: true } : task
          )
        );
        toast.success('Successfully finished task!');
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Something went wrong!');
      });
  };

  return (
    <div className={styles.container}>
      <BeatLoader color="#5d2dab" loading={isLoading} />
      <div>
        {filteredTaskList.length > 0 && (
          <>
            <div className={styles.nav}>
              <h2 className={styles.title}>Your task</h2>
              <div className={styles.sort}>
                <label htmlFor="sortTask">Sort Task by: </label>
                <select
                  id="sortTask"
                  value={sortTask}
                  onChange={handleSortTask}
                >
                  <option value="">---</option>
                  <option value="priority">Priority</option>
                  <option value="finished">Finished</option>
                  <option value="date">Date</option>
                </select>

                <Button
                  onClick={() => {
                    filteredTaskList.reverse();
                    setReversTaskList((prev) => !prev);
                  }}
                >
                  {reversTaskList ? (
                    <RiSortAsc size={20} />
                  ) : (
                    <RiSortDesc size={20} />
                  )}
                </Button>
              </div>
            </div>

            {filteredTaskList.map(
              ({ id, task, status, priority, createdAt }) => (
                <div
                  className={styles.task_box}
                  onClick={() => {
                    setTaskSelectedId(taskSelectedId === id ? '' : id);
                  }}
                  key={id}
                >
                  <div className={styles.task}>
                    <div>
                      <h3>{task}</h3>
                      <span>{format(new Date(createdAt), 'dd.MM.yy ')}</span>
                    </div>
                    <div className={styles.status_task}>
                      {!status && (
                        <div>
                          <h4>Priority</h4>
                          <p
                            className={`${priority === 'Low' && styles.low} ${
                              priority === 'Medium' && styles.medium
                            } ${priority === 'High' && styles.high}`}
                          >
                            {priority}
                          </p>
                        </div>
                      )}

                      <p>
                        {status ? (
                          <SlCheck color="green" />
                        ) : (
                          <SlExclamation color="yellow" />
                        )}
                      </p>
                    </div>
                  </div>
                  {taskSelectedId === id && (
                    <div className={styles.task_control}>
                      {!status && (
                        <Button
                          finished
                          onClick={() => handlerFinishedTask(id)}
                        >
                          Finished
                        </Button>
                      )}
                      <Button onClick={() => handlerDeleteTask(id)} danger>
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TaskList;
