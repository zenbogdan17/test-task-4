import React from 'react';
import styles from './../../styles/input.module.css';

const Input = ({ label, type, placeholder, value, setValue }) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export default Input;
