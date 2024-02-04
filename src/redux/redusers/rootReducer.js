
import { createStore } from 'redux';
import { LOGIN_USER, FETCH_TASKS, UPDATE_TASK_STATUS, LOGIN_ALL_USERS, CREATE_TASK, UPDATE_USER, DELETE_TASK, DELETE_USER, CREATE_USER} from '../actions/actions';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const initialState = {
    users: [],
    user: [],
    tasks: [],
};

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
        return {
            ...state,
            user: action.payload,
        };
        case LOGIN_ALL_USERS:
        return {
            ...state,
            users: action.payload,
        };
        case FETCH_TASKS:
        return {
            ...state,
            tasks: action.payload,
        };
        case UPDATE_TASK_STATUS:
        return {
            ...state,
            tasks: state.tasks.map(task =>
            task.id === action.payload.id ? { ...task, status: 'fullfield' } : task
            ),
        };
        case CREATE_TASK:
        return {
            ...state,
            tasks: [...state.tasks, action.payload],
        };
        case UPDATE_USER:
        return {
            ...state,
            users: state.users.map((user) =>
            user.id === action.payload.id ? { ...user, ...action.payload } : user
            ),
        };
        case DELETE_TASK:
        return {
            ...state,
            tasks: state.tasks.filter(task => task.id !== action.payload),
        };
        case DELETE_USER:
        return {
            ...state,
            users: state.users.filter(user => user.login !== action.payload),
        };
        case CREATE_USER:
        return {
            ...state,
            users: [...state.users, action.payload],
        };
        default:
        return state;
    }
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);