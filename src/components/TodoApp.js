import React, { useEffect } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../store/todos/extraReducers';
import { globalTodosReducers, simpleTodosReducers } from '../store/todos';
import { store } from '../store';
import { useGetAllTodosQuery } from '../store/todos/services';

function TodoApp() {
  const { data: todos, error, isLoading } = useGetAllTodosQuery();

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchTodos());
  // }, []);

  return (
    <Paper
      style={{
        padding: 0,
        margin: 0,
        height: '100vh',
        backgroundColor: '#fafafa',
      }}
      elevation={0}
    >
      <AppBar color='primary' position='static' style={{ height: '64px' }}>
        <Toolbar>
          <Typography color='inherit'>TODOS WITH HOOKS</Typography>
        </Toolbar>
      </AppBar>
      <Grid container justifyContent='center' style={{ marginTop: '1rem' }}>
        <Grid item xs={11} md={8} lg={4}>
          <TodoForm />
          <TodoList todos={todos} loading={isLoading} />
        </Grid>
      </Grid>
    </Paper>
  );
}
export default TodoApp;
