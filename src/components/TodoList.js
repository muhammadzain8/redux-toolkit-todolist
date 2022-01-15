import React, { useCallback } from 'react';
import Todo from './Todo';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { useDispatch } from 'react-redux';
import { editTodo, removeTodo, toggleTodo } from '../store/todos';

function TodoList({ todos }) {
  const dispatch = useDispatch();

  const handleRemove = useCallback(
    (id) => {
      dispatch(removeTodo(id));
    },
    [dispatch, removeTodo]
  );
  const handleToggle = useCallback(
    (id) => {
      dispatch(toggleTodo(id));
    },
    [dispatch, toggleTodo]
  );

  const handleEdit = useCallback(
    (id, value) => {
      dispatch(editTodo({ id, value }));
    },
    [dispatch, editTodo]
  );

  return (
    <Paper>
      <List>
        {todos?.map((todo, i) => (
          // To add a key to a fragment, we have to use the long-hand version
          // rather than <> </>, we have to use <React.Fragment>
          <React.Fragment key={todo.id}>
            <Todo
              todo={todo}
              removeTodo={handleRemove}
              toggleTodo={handleToggle}
              editTodo={handleEdit}
            />
            {i < todos.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
}
export default TodoList;
