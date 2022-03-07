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
import {
  globalTodosReducers,
  simpleTodosReducers,
} from '../store/todos';
import { store } from '../store';

function TodoApp() {
  // * 1st way is like this
  // * ---------------------------- * //
  // const { loading } = useSelector((state) => state.todos);
  // const todos = globalTodosReducers.selectAll(store.getState());
  //*  --------------------------- * //

  // * 2nd way is like this
  // * ---------------------------- * //
  const dispatch = useDispatch();
  const { loading, todos } = useSelector((state) => ({
    loading: state.todos.loading,
    todos: globalTodosReducers.selectAll(state),
  }));
  //*  --------------------------- * //

  // const todos = useSelector();

  // * Error in this line
  // const todos = globalTodosReducers.selectAll();
  // const todos = simpleTodosReducers.selectAll();

  console.log(`TODOS`, todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

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
      <AppBar
        color='primary'
        position='static'
        style={{ height: '64px' }}
      >
        <Toolbar>
          <Typography color='inherit'>TODOS WITH HOOKS</Typography>
        </Toolbar>
      </AppBar>
      <Grid
        container
        justifyContent='center'
        style={{ marginTop: '1rem' }}
      >
        <Grid item xs={11} md={8} lg={4}>
          <TodoForm />
          <TodoList todos={todos} loading={loading} />
        </Grid>
      </Grid>
    </Paper>
  );
}
export default TodoApp;
