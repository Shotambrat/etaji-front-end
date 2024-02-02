import React, { useState, useEffect } from "react";
import Brightness1OutlinedIcon from "@mui/icons-material/Brightness1Outlined";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Modal from "./Modals/Modal";
import { useSelector, useDispatch } from "react-redux";
import { updateTaskStatus, createTask, deleteTask } from "../redux/actions/actions";
import { API_URL_TASK } from "../api/api";
import axios from "axios";
import Loader from "./Loader";
import AddIcon from "@mui/icons-material/Add";
import TaskModal from "./Modals/TaskModal";

export default function Tasks({ full, filter, setCount, setDay }) {
  const [createTaskModalIsOpen, setCreateTaskModalIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isId, setIsId] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const tasks = useSelector((state) => state.tasks);
  console.log(tasks);


  useEffect(() => {
    console.log("Tasks have been updated:", tasks);
  }, [tasks]);

  const handleCreateTask = (newTask) => {
    dispatch(createTask(newTask));
  };
  const handleDeleteTask = async (taskId) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL_TASK}/${taskId}`);
      dispatch(deleteTask(taskId));
    } catch (error) {
      console.error(error);
      console.log("Oshibkaaaa");
    } finally {
      setLoading(false);
    }
  };
  const handleOpenModal = () => setCreateTaskModalIsOpen(true);
  const handleCloseModal = () => setCreateTaskModalIsOpen(false);

  function ogranichenniyText(text) {
    if (text.length > 90) {
      text = text.substr(0, 85) + "...";
    }
    return text;
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "today" && full === "pending") {
      setDay("Сегодня");
      let result =
        task.deadline === new Date().toISOString().substring(0, 10) &&
        task.status === full;
      return result;
    } else if (
      filter === "today" ||
      (task.deadline === new Date().toISOString().substring(0, 10) &&
        full === "fullfield")
    ) {
      setDay("Сегодня");
      let result =
        task.deadline === new Date().toISOString().substring(0, 10) &&
        task.status === full;
      return result;
    } else if (filter === "week" && full === "pending") {
      setDay("На неделю");
      const today = new Date();
      const weekFromToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 7
      );
      return (
        task.deadline >= today.toISOString().substring(0, 10) &&
        task.deadline <= weekFromToday.toISOString().substring(0, 10) &&
        task.status === full
      );
    } else if (filter === "week" && full === "fullfield") {
      setDay("На неделю");
      const today = new Date();
      const weekFromToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 7
      );
      return (
        task.deadline >= today.toISOString().substring(0, 10) &&
        task.deadline <= weekFromToday.toISOString().substring(0, 10) &&
        task.status === full
      );
    } else if (filter === "month" && full === "pending") {
      setDay("На месяц");
      const today = new Date();
      const monthFromToday = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate()
      );
      return (
        task.deadline >= today.toISOString().substring(0, 10) &&
        task.deadline <= monthFromToday.toISOString().substring(0, 10) &&
        task.status === full
      );
    } else if (filter === "month" && full === "fullfield") {
      setDay("На месяц");
      const today = new Date();
      const monthFromToday = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate()
      );
      return (
        task.deadline >= today.toISOString().substring(0, 10) &&
        task.deadline <= monthFromToday.toISOString().substring(0, 10) &&
        task.status === full
      );
    } else {
      setDay("Сегодня");
      return (
        task.deadline === new Date().toISOString().substring(0, 10) &&
        task.status === full
      );
    }
  });

  const handleCheckboxChange = async (taskId) => {
    setLoading(true);
    try {
      await axios.put(API_URL_TASK, {
        id: taskId,
        status: "fullfield",
      });
      dispatch(updateTaskStatus(taskId));
    } catch (error) {
      console.error(error);
      console.log("Oshibkaaaa");
    } finally {
      setLoading(false);
    }
  };

  setCount(filteredTasks.length);

  console.log("USER", user[0].rank);
  console.log("USERRR", user);

  return (
    <div>
      {loading && <Loader />}
      <h1 className="font-bold ml-[50px] my-3 pt-2">Задачи</h1>
      <hr />
      <div>
        {user[0].rank === "boss" ? (
          <div>
            <Button variant="text" onClick={handleOpenModal} className="my-2">
              <AddIcon /> Добавить задачу
            </Button>
            <TaskModal
              open={createTaskModalIsOpen}
              onClose={handleCloseModal}
            />
          </div>
        ) : null}
      </div>
      <div>
        {filteredTasks.map((task) => (
          <div>
            <div
              key={task.id}
              className={`p-2 my-1 auto w-auto p-1 my-1 auto w-auto ${
                task.status == "fullfield"
                  ? "bg-green-500"
                  : new Date(task.deadline).toLocaleDateString() ===
                    new Date().toLocaleDateString()
                  ? "bg-red-600"
                  : "bg-gray-200"
              }`}
            >
              <div className="flex">
                <h1 className="flex items-center text-xl font-bold ml-2 text-center">
                  {task.title}
                </h1>
              </div>
              <p className="my-3 ml-4">{ogranichenniyText(task.description)}</p>
              <div className="flex justify-between ml-3 w-full">
                <div className="flex flex-col">
                  <p>Срок: {task.deadline}</p>
                  <p>
                    Приоритет:{" "}
                    {task.prioritet == "high" ? (
                      <Tooltip title={task.prioritet}>
                        <Brightness1OutlinedIcon
                          className="rounded-full bg-yellow-300"
                          sx={{ color: "yellow" }}
                        />
                      </Tooltip>
                    ) : task.prioritet == "medium" ? (
                      <Tooltip title={task.prioritet}>
                        <Brightness1OutlinedIcon
                          className="rounded-full bg-orange-500"
                          sx={{ color: "orange" }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title={task.prioritet}>
                        <Brightness1OutlinedIcon
                          className="rounded-full bg-blue-500"
                          sx={{ color: "blue" }}
                        />
                      </Tooltip>
                    )}
                  </p>

                  {user[0].rank === "boss" ? (
                    <p>Ответственный: {task.respons}</p>
                  ) : null}
                </div>
                <div className="flex-flex-wrap w-auto mr-3 max-sm:w-[100px]">
                  {user[0].rank === "boss" ? (
                    <Button
                      onClick={() => handleDeleteTask(task.id)}
                      variant="contained"
                      className="p-1 mr-4 h-[40px] rounded bg-red-600"
                    >
                      Удалить
                    </Button>
                  ) : null}
                  {task.status === "fullfield" ? null : (
                    <Button
                      onClick={() => handleCheckboxChange(task.id)}
                      variant="contained"
                      className="p-1 mr-4 h-[40px] rounded bg-green-600"
                    >
                      {" "}
                      Завершить{" "}
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      setIsId(task.id);
                      setModalIsOpen(true);
                    }}
                    variant="contained"
                    className="p-1 h-[40px] rounded bg-blue-500"
                  >
                    Развернуть
                  </Button>
                </div>
              </div>
              <Modal
                isOpen={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                taskId={isId}
              />
            </div>
            <hr className="mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
