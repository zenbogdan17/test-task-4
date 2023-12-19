import React, { useState } from 'react';
import styles from './../../styles/addTask.module.css';
import Input from './Input';
import Button from './Button';
import { url } from './../constants';
import toast from 'react-hot-toast';

const items = [
  { id: 1, label: 'Low' },
  { id: 2, label: 'Medium' },
  { id: 3, label: 'High' },
];

const AddTask = ({ setNewTask }) => {
  const [task, setTask] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleCheckboxChange = (itemId) => {
    setSelectedItemId(itemId);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    if (!task || !selectedItemId) {
      return toast.error('Fill out the form completely!');
    }

    const priority = items[selectedItemId - 1].label;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task, priority }),
    })
      .then((response) => response.json())
      .then((data) => {
        setNewTask(data);

        toast.success('Successfully added task!');

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
          <h1 className={styles.title}>You can add your task</h1>
          <Input
            type="text"
            placeholder="Enter your task"
            value={task}
            setValue={(e) => setTask(e.target.value)}
          />
          <div>
            <h2 className={styles.checkbox_title}>Task priority</h2>
            <div className={styles.checkbox}>
              {items.map((item) => (
                <div key={item.id}>
                  <input
                    type="checkbox"
                    id={`checkbox-${item.id}`}
                    value={item.id}
                    checked={selectedItemId === item.id}
                    onChange={() => handleCheckboxChange(item.id)}
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

          <Button type={'submit'}>Add</Button>
        </form>
      </div>
    </>
  );
};

export default AddTask;
