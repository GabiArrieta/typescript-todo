import React, { useState } from "react";
import './App.css'
import InputFeild from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./components/model";
import { DragDropContext, DropResult } from 'react-beautiful-dnd';


const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const {source, destination} = result;
    if(!destination) return;
    if(destination.droppableId === source.droppableId && 
      destination.index === source.index) return;
    
      let add, 
      active = todos,
      complete = completedTodos;

      if(source.droppableId === 'TodosList'){
        add = active[source.index];
        active.splice(source.index, 1);
      } else {
        add = complete[source.index];
        complete.splice(source.index, 1);
      }

      if(destination.droppableId === 'TodosList'){
        active.splice(destination.index, 0, add);
      } else {
        complete.splice(destination.index, 0, add);
      }

      setCompletedTodos(complete);
      setTodos(active);
  }

  return (
  <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
    <div className="app">
      <a href="https://www.typescriptlang.org/docs/handbook/intro.html" target="_blank" rel="noreferrer">
      <img src="https://static-00.iconduck.com/assets.00/folder-type-typescript-opened-icon-512x428-29ebcwjh.png" alt="typescript" height="150px" width="150x" className="heading"/>
      </a>
      <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos}/>
    </div>
    </DragDropContext>
  );
};

export default App;