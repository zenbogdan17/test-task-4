import React from 'react';
import styles from './../../styles/button.module.css';

const Button = ({ type, children, onClick, danger, finished }) => {
  return (
    <button
      className={`${danger ? styles.danger : ''}  
      ${finished ? styles.finished : ''} 
      `}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
