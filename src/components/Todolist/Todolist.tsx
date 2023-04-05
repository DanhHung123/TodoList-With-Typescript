import React, { useEffect, useState } from 'react';
import styles from './Todolist.module.scss';
import TaskList from '../TaskList';
import TaskInput from '../TaskInput';

interface Todo {
  id: string
  name: string
  done: boolean
}
const syncLocalData = (data: Todo[]) => {
  localStorage.setItem('todos', JSON.stringify(data || '[]'))
}

const Todolist = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<any>(null);

  useEffect(() => {
    const todoLocal = localStorage.getItem('todos');
    setTodos(JSON.parse(todoLocal || '[]'))
  }, [])

  const doneList = todos.length > 0 ? todos.filter((todo: any) => {
    return todo.done === true
  }) : [];
  const notDoneList = todos.length > 0 ? todos.filter((todo: any) => {
    return todo.done === false
  }) : [];

  const addTodo = (na: string) => {
    const newTodo = {
      id: new Date().toISOString(),
      name: na,
      done: false
    }

    setTodos(prev => [...prev, newTodo])
    syncLocalData([...todos, newTodo])
  }


  const handlerDoneCheck = (id: string, done: boolean) => {
    const changeCheckTodo = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, done }
      }
      return todo
    })

    setTodos(changeCheckTodo)
    syncLocalData(changeCheckTodo);
  }

  const deleteTodo = (id: string) => {
    let afterDelete = todos.filter((todo) => {
      return todo.id !== id;
    })
    setTodos(afterDelete)
    syncLocalData(afterDelete)
  }

  const startEditTodo = (id: string) => {
    let editItem = todos.find(todo => {
      return todo.id === id;
    })
    console.log(editItem);
    setCurrentTodo(editItem);
  }
  const editTodo = (name: string) => {
    let afterEdit = todos.map((todo) => {
      if (todo.id === currentTodo.id) {
        return { ...todo, name }
      }
      return todo;
    })
    setTodos(afterEdit)
    syncLocalData(afterEdit)
    setCurrentTodo(null);

  }

  return (
    <div className={styles.todolist}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} currentTodo={currentTodo} editTodo={editTodo} />
        <TaskList doneTodo={false} todos={notDoneList} handlerDoneCheck={handlerDoneCheck} deleteTodo={deleteTodo} startEditTodo={startEditTodo} />
        <TaskList doneTodo={true} todos={doneList} handlerDoneCheck={handlerDoneCheck} deleteTodo={deleteTodo} startEditTodo={startEditTodo} />
      </div>
    </div>
  )
}

export default Todolist