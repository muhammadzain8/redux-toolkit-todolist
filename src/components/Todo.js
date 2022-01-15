import React, { memo, useEffect } from 'react';
import useToggleState from '../hooks/useToggleState';
import EditTodoForm from './EditTodoForm';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

function Todo(props) {
  const { removeTodo, toggleTodo, editTodo, todo } = props;
  const { _id, task, completed } = todo;

  const [isEditing, toggle] = useToggleState(false);

  useEffect(() => {
    console.log('rerendered');
  });

  return (
    <ListItem style={{ height: '64px' }}>
      {isEditing ? (
        <EditTodoForm
          editTodo={editTodo}
          _id={_id}
          task={task}
          toggleEditForm={toggle}
        />
      ) : (
        <>
          <Checkbox
            tabIndex={-1}
            checked={completed}
            onClick={() => toggleTodo(todo)}
          />
          <ListItemText
            style={{ textDecoration: completed ? 'line-through' : 'none' }}
          >
            {task}
          </ListItemText>
          <ListItemSecondaryAction>
            <IconButton aria-label='Delete' onClick={() => removeTodo(_id)}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label='Edit' onClick={toggle}>
              <EditIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </>
      )}
    </ListItem>
  );
}

export default memo(Todo);
