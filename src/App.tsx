import React from 'react';
import Todolist from './components/Todolist';
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <Todolist />
    </div>
  );
}

export default App;
