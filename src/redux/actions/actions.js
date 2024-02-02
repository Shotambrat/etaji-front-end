export const LOGIN_USER = 'LOGIN_USER';
export const FETCH_TASKS = 'FETCH_TASKS';
export const UPDATE_TASK_STATUS = 'UPDATE_TASK_STATUS';
export const LOGIN_ALL_USERS = 'LOGIN_ALL_USERS';
export const CREATE_TASK= 'CREATE_TASK';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_TASK = 'DELETE_TASK';
export const DELETE_USER = "DELETE_USER";
export const CREATE_USER = 'CREATE_USER';

export const loginUser = (user) => {
  return {
    type: LOGIN_USER,
    payload: user,
  };
};

export const fetchTasks = (tasks) => {
  return {
    type: FETCH_TASKS,
    payload: tasks,
  };
};

export const updateTaskStatus = (taskId) => ({
  type: UPDATE_TASK_STATUS,
  payload: { id: taskId },
});

export const loginAllUsers = (users) => {
  return {
    type: LOGIN_ALL_USERS,
    payload: users,
  }
}

export const createTask = (newTask) => ({
  type: CREATE_TASK,
  payload: newTask,
});

export const updateUser = (updatedUser) => ({
  type: UPDATE_USER,
  payload: updatedUser,
});

export const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  payload: taskId,
});

export const deleteUser = (userId) => ({
  type: DELETE_USER,
  payload: userId,
});

export const createUser = (user) => ({
  type: CREATE_USER,
  payload: user,
});