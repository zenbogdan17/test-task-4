import styles from './../../styles/input.module.css';

const Input = ({ label, type, placeholder, value, setValue, checked }) => {
  return (
    <>
      <label>{label}</label>
      <input
        type={type}
        checked={checked}
        placeholder={placeholder}
        value={value}
        onChange={setValue}
      />
    </>
  );
};

export default Input;
