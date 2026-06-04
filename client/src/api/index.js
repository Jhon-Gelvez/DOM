export * from "./config.js";

export {
  createTask,
  deleteTask,
  getUserByDocument,
  getUserTasks,
  handleApiError,
  updateTask,
} from "./api/index.js";

// Se agrega ./api/ porque los archivos ahora están dentro de esa carpeta
export { getUserByDocument } from "./api/getUser.js";
export { getUserTasks } from "./api/getUserTasks.js";
export { createTask } from "./api/createTask.js";
export { updateTask } from "./api/updateTask.js";
export { deleteTask } from "./api/deleteTask.js";
export { handleApiError } from "./api/handleApiError.js";
// Estos se quedan igual porque están afuera con index.js
export { isValidInput } from "./validateInput.js";
export { setTextContent } from "./setTextContent.js";