import React, { useState } from 'react';
import styles from './TaskList.module.scss';

const TaskList = (props: any) => {
  const { doneTodo, todos, handlerDoneCheck, deleteTodo, startEditTodo } = props;

  const handlerChangeCheck = (id: string) => {
    return (e: any) => {
      handlerDoneCheck(id, e.target.checked)
    }
  }

  return (
    <div>
      <h2 className={styles.title}>{doneTodo ? 'Hoàn thành' : 'Chưa hoàn thành'}</h2>
      {
        todos.map((todo: any) => {
          return (
            <div className={styles.taskCheckItem}>
              <div>
                <input type="checkbox" checked={todo.done} onChange={handlerChangeCheck(todo.id)} />
                <span>{todo.name}</span>
              </div>
              <div>
                <button onClick={() => startEditTodo(todo.id)}> 🖊️</button>
                <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
              </div>
            </div>
          )
        })
      }

    </div>
  )
}

export default TaskList