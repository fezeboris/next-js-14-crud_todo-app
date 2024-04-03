import React from "react";

const Todo = ({
  id,
  mongoId,
  title,
  description,
  isCompleted,
  handleDeleteTodo,
  handleTodoComplete,
}) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {id + 1}
      </th>
      <td className={`px-6 py-4 ${isCompleted ? "line-through" : ""}`}>
        {title}
      </td>
      <td className={`px-6 py-4 ${isCompleted ? "line-through" : ""}`}>
        {description}
      </td>
      <td className="px-6 py-4">{isCompleted ? "completed" : "Pending"}</td>{" "}
      <td className="px-6 py-4 flex gap-1">
        {" "}
        <button
          className="py-2 px-4 bg-red-500 text-white  rounded-md "
          onClick={() => {
            handleDeleteTodo(mongoId);
          }}
        >
          Delete
        </button>
        {!isCompleted && (
          <button
            className={`py-2 px-4 bg-green-700 text-white  rounded-md `}
            onClick={() => handleTodoComplete(mongoId)}
          >
            Done
          </button>
        )}
      </td>
    </tr>
  );
};

export default Todo;
