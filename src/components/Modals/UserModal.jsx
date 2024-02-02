import React, { useState } from "react";
import { Modal, Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader";
import { API_URL_USER } from "../../api/api";
import axios from "axios";

const UserModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user[0]); // предположим, что пользователь хранится в Redux

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  const [loading, setLoading] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch({ type: "UPDATE_USER", payload: editedUser }); // обновляем данные пользователя в Redux
    setIsEditing(false);
  };

  const handleClose = () => {
    setIsEditing(false);
    onClose();
  };

  const handleChangeUser = async (
    id,
    first_name,
    last_name,
    middle_name,
    login,
    password,
    rank
  ) => {
    setLoading(true);
    try {
      await axios.put(API_URL_USER, {
        id,
        first_name,
        last_name,
        middle_name,
        login,
        password,
        rank,
      });
      //   dispatch(updateTaskStatus(taskId));
    } catch (error) {
      console.error(error);
      console.log("Oshibkaaaa В UPDATE USER");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <Loader />}
      <Modal open={open} onClose={handleClose}>
        <div
          className="modal-content"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Профиль пользователя
          </Typography>
          <div>
            <Typography variant="body1">
              <strong>Имя:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  value={editedUser.first_name}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, first_name: e.target.value })
                  }
                />
              ) : (
                user.first_name
              )}
            </Typography>
            <Typography variant="body1">
              <strong>Фамилия:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  value={editedUser.last_name}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, last_name: e.target.value })
                  }
                />
              ) : (
                user.last_name
              )}
            </Typography>
            <Typography variant="body1">
              <strong>Отчество:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  value={editedUser.middle_name}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      middle_name: e.target.value,
                    })
                  }
                />
              ) : (
                user.middle_name
              )}
            </Typography>
            <Typography variant="body1">
              <strong>Логин:</strong> {user.login}
            </Typography>
            <Typography variant="body1">
              <strong>Пароль:</strong>{" "}
              {isEditing ? (
                <input
                  type="password"
                  value={editedUser.password}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, password: e.target.value })
                  }
                />
              ) : (
                "*****"
              )}
            </Typography>
            <Typography variant="body1">
              <strong>Роль:</strong> {user.rank}
            </Typography>
          </div>
          <div>
            {user.rank === "boss" ? (
              <>
                {isEditing ? (
                  <Button onClick={handleSave}>Сохранить</Button>
                ) : (
                  <Button onClick={handleEdit}>Изменить</Button>
                )}
              </>
            ) : null}
            <Button onClick={handleClose}>Закрыть</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserModal;
