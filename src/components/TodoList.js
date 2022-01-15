import React, { useCallback } from 'react';
import Todo from './Todo';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTodo,
  editTodo,
  removeTodo,
  toggleTodo,
  updateTodo,
} from '../store/todos';
import { CircularProgress, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

function TodoList({ todos, loading }) {
  const dispatch = useDispatch();
  const { addingNew } = useSelector((state) => state.todos);

  const handleRemove = useCallback(
    (id) => {
      dispatch(deleteTodo(id));
    },
    [dispatch, deleteTodo]
  );
  const handleToggle =
    useCallback();
    // (todo) => {
    // dispatch(toggleTodo({ id: todo._id, completed: !todo.completed }));
    // },
    // [dispatch, updateTodo]

  const handleEdit = useCallback(
    (id, value) => {
      dispatch(updateTodo({ id, task: value }));
    },
    [dispatch, updateTodo]
  );

  return (
    <Paper style={{ minHeight: '50vh', padding: 20 }}>
      <Typography variant='h5' align='center'>
        Todos
      </Typography>
      <List>
        {loading
          ? Array(10)
              .fill()
              .map((_, idx) => (
                <Skeleton
                  variant='rect'
                  style={{ marginBottom: '1rem' }}
                  width='100%'
                  height='20px'
                  key={idx}
                />
              ))
          : todos.map((todo, i) => (
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
      {addingNew && <CircularProgress />}
    </Paper>
  );
}
export default TodoList;
