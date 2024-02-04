import React, { useState } from "react";
import CustomDrawer from "./CustomDrawer";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateUser, deleteUser } from "../redux/actions/actions";
import Loader from "../components/Loader";
import { API_URL_USER } from "../api/api";
import CreateUserModal from "../components/Modals/CreateUserModal";

export default function UsersPage() {
  const users = useSelector((state) => state.users);
  console.log("Users", users);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [createUserModalIsOpen, setCreateUserModalIsOpen] = useState(false);

  const handleOpenModal = () => setCreateUserModalIsOpen(true);
  const handleCloseModal = () => setCreateUserModalIsOpen(false);

  const handleEdit = (user) => {
    setIsEditing(true);
    setEditedUser({ ...user });
  };

  const handleSave = async (id) => {
    try {
      setLoading(true);
      await axios.put(API_URL_USER, { id, ...editedUser });
      dispatch(updateUser(editedUser));
      setIsEditing(false);
    } catch (error) {
      console.error("Ошибка при сохранении данных:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (login) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL_USER}?login=${login}`);
      dispatch(deleteUser(login));
    } catch (error) {
      console.error("Ошибка при удалении пользователя:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="absolute top-0 left-0 w-screen min-h-screen flex justify-center bg-yellow-100">
        <div className="fixed top-6 left-12 h-[20px] w-[30px] max-md:left-6 max-md:top-3">
          <CustomDrawer />
        </div>
        <div className="h-[auto] w-[800px] mt-12">
          <h1 className="font-bold text-[2em] mt-12">ПОЛЬЗОВАТЕЛИ</h1>
            <div>
            <Button variant="text" onClick={handleOpenModal} className="my-2">
                <PersonAddIcon className="mr-3" />  Добавить пользователя
            </Button>
            <CreateUserModal
                open={createUserModalIsOpen}
                onClose={handleCloseModal}
            />
            </div>
          <div className="w-[auto] h-[100px] flex flex-col justify-between"></div>
          {users.map((user) => (
            <div key={user.id} className="mb-3">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography>{user.first_name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
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
                            setEditedUser({
                              ...editedUser,
                              first_name: e.target.value,
                            })
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
                            setEditedUser({
                              ...editedUser,
                              last_name: e.target.value,
                            })
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
                            setEditedUser({
                              ...editedUser,
                              password: e.target.value,
                            })
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
                  <div className="w-full flex justify-end">
                    {isEditing ? (
                      <Button
                        onClick={() => handleSave(user.id)}
                        disabled={loading}
                      >
                        {loading ? "Сохранение..." : "Сохранить"}
                      </Button>
                    ) : (
                      <>
                        <Button onClick={() => handleEdit(user)}>
                          Изменить
                        </Button>
                        <Button onClick={() => handleDelete(user.login)}>
                          Удалить
                        </Button>
                      </>
                    )}
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
