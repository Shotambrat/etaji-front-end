
import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, fetchTasks, loginAllUsers } from '../../redux/actions/actions';
import Loader from '../Loader';
import {API_URL_USER, API_URL_TASKS, API_URL_ALL_USERS} from '../../api/api';
import toast, {Toaster} from 'react-hot-toast';
import { ConstructionOutlined } from '@mui/icons-material';


export default function LoginForm({ onLoginSuccess }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const tasks = useSelector((state) => state.tasks);

    const notify = () => {
        toast.error('Пользователь не существует или неправильный пароль', {
            duration: 2000,
            position: 'top-center',
          
            // Aria
            ariaProps: {
              role: 'status',
              'aria-live': 'polite',
            },
          })
    }
    console.log(username, password)

    const handleLogin = async () => {
        setLoading(true);
        try {
          //auth
            const user = await axios.get(`${API_URL_USER}?login=${username}&password=${password}`);
            console.log(user.data);
            dispatch(loginUser(user.data));
            if (user.data[0].rank === 'boss') {
                const users = await axios.get(`${API_URL_ALL_USERS}?login=${username}`)
                dispatch(loginAllUsers(users.data))
                console.log(users.data);
                const allTasks = [];
                for (const user of users.data) {
                    try {
                        const tasks = await axios.get(`${API_URL_TASKS}?respons=${user.login}`);
                        allTasks.push(...tasks.data);
                    } catch (error) {
                        console.error(`Error fetching tasks for user ${user.login}: `, error);
                    }
                }
                dispatch(fetchTasks(allTasks));
                console.log("STATE", tasks)
                onLoginSuccess();
            } else {
          // tasks
            const tasks = await axios.get(`${API_URL_TASKS}?respons=${username}`);
                
            //     API_URL_TASKS, JSON.stringify({
            //     "respons": "worker1"
            // }));
            console.log(tasks);
            dispatch(fetchTasks(tasks.data));
          // Home
            onLoginSuccess();
            }
        } catch (error) {
            notify();
            console.error('Ошибка аутентификации', error);
            console.log("Oshibkaaaa");
        } finally {
            setLoading(false);
        }
    };

    return (

        <div>
            {loading && <Loader />}
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
            <Avatar className='bg-amber-500' sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="login"
                    label="Login"
                    name="login"
                    autoComplete="login"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleLogin}
                >
                Sign In
                </Button>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </Box>
            </Box>
        </Container>
        </div>
    );
}
