import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../redux/actions/actions";
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
import { API_URL_USER } from "../../api/api";
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

const CreateUserModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [rank, setRank] = useState("worker");
  const [loading, setLoading] = useState(false);

  const handleCreate = () => {
    if (firstName && lastName && middleName && login && password && rank) {
      setLoading(true);
      try {
        axios
          .post(API_URL_USER, {
            first_name: firstName,
            last_name: lastName,
            middle_name: middleName,
            login,
            password,
            rank,
          })
          .then((response) =>
            dispatch(
              createUser({
                id: response.data.id,
                first_name: firstName,
                last_name: lastName,
                middle_name: middleName,
                login,
                password,
                rank,
              })
            )
          );
        onClose();
      } catch (e) {
        console.log(e);
        console.error("OSHIBKA CREATE USER");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setFirstName("");
    setLastName("");
    setMiddleName("");
    setLogin("");
    setPassword("");
    setRank("worker");
    onClose();
  };

  return (
    <div>
      {loading && <Loader />}
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Create User</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />{" "}
          <br />
          <TextField
            className={classes.textField}
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />{" "}
          <br />
          <TextField
            className={classes.textField}
            label="Middle Name"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />{" "}
          <br />
          <TextField
            className={classes.textField}
            label="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />{" "}
          <br />
          <TextField
            className={classes.textField}
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <br />
          <FormControl className={classes.formControl}>
            <InputLabel shrink htmlFor="rank-select">
              Rank
            </InputLabel>
            <Select
              inputProps={{
                id: "rank-select",
              }}
              InputLabelProps={{
                shrink: true,
              }}
              label="Rank"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
            >
              <MenuItem value="worker">Worker</MenuItem>
              <MenuItem value="boss">Boss</MenuItem>
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

export default CreateUserModal;