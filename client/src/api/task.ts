import axios from "axios";
import { apiLink } from "./config";
import { FormTypes } from "../types";

const allTasksLink = (limit: number) => {
  return `${apiLink}/tasks?limit=${limit}`;
};

const taskLinkWithID = (id: string) => {
  return `${apiLink}/tasks/${id}`;
};

const createLink = `${apiLink}/tasks`;

export const getAllTasks = async (limit: number) => {
  const tasks = await axios.get(allTasksLink(limit));

  return tasks;
};

export const deleteTask = async (id: string) => {
  return await axios.delete(taskLinkWithID(id));
};

export const createTask = async (data: FormTypes) => {
  return await axios.post(createLink, data);
};

export const getSingleTask = async (id: string) => {
  const task = await axios.get(taskLinkWithID(id));

  return task.data;
};

export const updateTask = async (id: string, data: FormTypes) => {
  return await axios.patch(taskLinkWithID(id), data);
};