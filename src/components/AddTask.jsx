import React, { useEffect, useState } from 'react';
import styles from './../../styles/addTask.module.css';
import Input from './Input';
import Button from './Button';
import { url } from './../constants';
import toast from 'react-hot-toast';
import { getPriorityId } from '../utils';

const items = [
  { id: 1, label: 'Low' },
  { id: 2, label: 'Medium' },
  { id: 3, label: 'High' },
];

const AddTask = ({ setNewTask, editTask, resetEdit }) => {
  const [task, setTask] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [statusTask, setStatusTask] = useState(false);

  useEffect(() => {
    if (editTask) {
      setTask(editTask.task);
      setSelectedItemId(getPriorityId(editTask.priority, items));
      setStatusTask(editTask.status);
    }
  }, [editTask]);

  const handlePriorityCheckbox = (itemId) => {
    setSelectedItemId(itemId);
  };

  console.log(new Date());

  const handleStatusCheckbox = () => {
    setStatusTask(!statusTask);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    if (!task || !selectedItemId) {
      return toast.error('Fill out the form completely!');
    }

    const priority = items[selectedItemId - 1].label;

    fetch(editTask ? `${url}/${editTask.id}` : url, {
      method: editTask ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task,
        priority,
        status: statusTask,
        createdAt: new Date(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setNewTask(data);

        toast.success(`Successfully ${editTask ? 'edit' : 'added'} task!`);
        resetEdit();
        setTask('');
        setSelectedItemId(null);
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Something went wrong!');
      });
  };

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handlerSubmit}>
          <h1 className={styles.title}>
            {editTask ? 'Edit you tack' : ' You can add your task'}
          </h1>
          <Input
            type="text"
            placeholder="Enter your task"
            value={task}
            setValue={(e) => setTask(e.target.value)}
          />
          <div>
            {editTask && (
              <>
                <h2 className={styles.checkbox_title}>
                  Task status -{' '}
                  <span>{statusTask ? 'completed' : 'in process'}</span>
                </h2>
                <label className={styles.toggle_switch}>
                  <Input
                    type="checkbox"
                    checked={statusTask}
                    setValue={handleStatusCheckbox}
                  />
                  <div className={styles.toggle_switch_background}>
                    <div className={styles.toggle_switch_handle}></div>
                  </div>
                </label>
              </>
            )}

            <h2 className={styles.checkbox_title}>Task priority</h2>
            <div className={styles.checkbox}>
              {items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handlePriorityCheckbox(item.id)}
                >
                  <Input
                    type="checkbox"
                    id={`checkbox-${item.id}`}
                    value={item.id}
                    checked={selectedItemId === item.id}
                  />

                  <label
                    className={styles.checkbox_Label}
                    htmlFor={`checkbox-${item.id}`}
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          {editTask ? (
            <Button type={'submit'}>Save</Button>
          ) : (
            <Button type={'submit'}>Add</Button>
          )}
        </form>
      </div>
    </>
  );
};

export default AddTask;
