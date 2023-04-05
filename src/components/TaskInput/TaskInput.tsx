import React, { useEffect, useState } from 'react';
import styles from './TaskInput.module.scss';

const TaskInput = (props: any) => {
  const [value, setValue] = useState<string>('');
  const { addTodo, currentTodo, editTodo } = props;

  useEffect(() => {
    if (currentTodo) {
      setValue(currentTodo.name)
    }
  }, [currentTodo])

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const hanlderSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (currentTodo) {
      editTodo(value)
      setValue('')
    } else {
      addTodo(value);
      setValue('');
    }
  }
  return (
    <div>
      <h1 className={styles.title}>TodoList with Typescript</h1>
      <div className={styles.form}>
        <input type="text" placeholder='Cation here ...' value={value} onChange={handleChangeInput} />
        <button onClick={hanlderSubmit}>{currentTodo ? '✔️' : '➕'}</button>
      </div>
    </div>
  )
}

export default TaskInput;