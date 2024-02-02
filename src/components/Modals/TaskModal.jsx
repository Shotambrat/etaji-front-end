import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../redux/actions/actions";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { API_URL_TASK } from "../../api/api";
import Loader from "../Loader";

const useStyles = makeStyles((theme) => ({
  dialog: {
    [theme.breakpoints.up("sm")]: {
      width: "80%",
      maxWidth: "600px",
      margin: "0 auto",
    },
    [theme.breakpoints.up("md")]: {
      width: "60%",
      maxWidth: "800px",
    },
  },
  formControl: {
    marginLeft: theme.spacing(2),
    width: "fit-content",
    marginTop: "1rem",
  },
  textField: {
    marginTop: "1rem",
  },
}));

const CreateTaskModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [prioritet, setPriority] = useState("");
  const [respons, setResponsible] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = () => {
    if (title && description && deadline && prioritet && respons) {
      setLoading(true);
      try {
        axios
          .post(API_URL_TASK, {
            title,
            description,
            deadline,
            prioritet,
            status: "pending",
            respons,
          })
          .then((response) =>
            dispatch(
              createTask({
                id: response.data.id,
                title,
                description,
                deadline,
                prioritet,
                status: "pending",
                respons,
              })
            )
          )
        onClose();
      } catch (e) {
        console.log(e);
        console.error("OSHIBKA CREATE TASK");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setDeadline("");
    setPriority("");
    setResponsible("");
    onClose();
  };

  return (
    <div>
      {loading && <Loader />}
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Создать задачу</DialogTitle>
        <DialogContent>
          <TextField
            label="Загаловок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />{" "}
          <br />
          <TextField
            className={classes.textField}
            label="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />{" "}
          <br />
          <TextField
            className={classes.textField}
            label="Срок"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />{" "}
          <br />
          <FormControl className={classes.formControl}>
            <InputLabel shrink htmlFor="my-select">
              Приоритет
            </InputLabel>
            <Select
              inputProps={{
                id: "my-select",
              }}
              InputLabelProps={{
                shrink: true,
              }}
              label="Deadline"
              value={prioritet}
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel shrink htmlFor="my-select">
              Ответственный
            </InputLabel>
            <Select
              inputProps={{
                id: "my-select",
              }}
              InputLabelProps={{
                shrink: true,
              }}
              label="Responsible"
              value={respons}
              onChange={(e) => setResponsible(e.target.value)}
            >
              {users.map((user) => (
                <MenuItem key={user.login} value={user.login}>
                  {user.login}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateTaskModal;
