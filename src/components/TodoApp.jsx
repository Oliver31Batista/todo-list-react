import { useState } from 'react';
import Todo from './Todo';
import './todoApp.css';
import logo from '../imgs/undraw_schedule_meeting_52nu.svg';

export default function TodoApp() {
  const [title, setTitle] = useState('Hola');
  const [todos, setTodos] = useState([]);

  function handleChange(e) {
    const value = e.target.value;

    setTitle(value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      completed: false,
    };

    const temp = [...todos];

    if (title.length === 0) {
      alert(`This field can't be empty`);
    } else {
      temp.unshift(newTodo);

      setTodos(temp);

      setTitle('');
    }
  }

  function handleDelete(id) {
    const temp = todos.filter((item) => item.id !== id); //se filtra para regresar todos los elementos, menos el que queremos eliminar
    setTodos(temp);
  }

  function handleUpdate(id, value) {
    const temp = [...todos]; //sacando la copia de los elementos que hay en el todolist
    const task = temp.find((task) => task.id === id);
    task.title = value;
    setTodos(temp);
  }

  return (
    <div className="todoContainer">
        <h1 className='title'>To do List</h1>
        <img src={logo} className='logo' alt="logo" />
      <form onSubmit={handleSubmit} className="todoCreateForm">
        <input onChange={handleChange} className="todoInput" value={title} />
        <input
          onClick={handleSubmit}
          type="submit"
          value="Create todo"
          className="buttonCreate"
        />
      </form>
      <div className="todosContainer">
        {todos.map((task) => (
          <Todo
            key={task.id}
            task={task}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
