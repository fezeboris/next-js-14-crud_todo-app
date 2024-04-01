import React from "react";

const Todo = ({ id, mongoId, title, description, isComplete }) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {id + 1}
      </th>
      <td className="px-6 py-4">{title}</td>
      <td className="px-6 py-4">{description}</td>
      <td className="px-6 py-4">{isComplete ? "completed" : "Pending"}</td>{" "}
      <td className="px-6 py-4 flex gap-1">
        {" "}
        <button className="py-2 px-4 bg-red-500 text-white  rounded-md ">
          Delete
        </button>
        <button className="py-2 px-4 bg-green-700 text-white  rounded-md ">
          Done
        </button>
      </td>
    </tr>
  );
};

export default Todo;
