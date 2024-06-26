"use client";
import Todo from "@/components/Todo";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api", formData);

      toast.success(res.data.message);
      setFormData({ title: "", description: "" });
      await handleFetchTodo();
    } catch (error) {
      console.log(error);
      toast.error("Failed to add Todo");
    }
  };
  const [todoData, setTodoData] = useState([]);
  const reversedTodoArray = todoData.slice().reverse();
  const handleFetchTodo = async () => {
    const res = await axios("/api");
    setTodoData(res.data.todos);
  };
  const handleDeleteTodo = async (id) => {
    const res = await axios.delete("/api", {
      params: { mongoId: id },
    });
    toast.success(res.data.message);
    handleFetchTodo();
  };
  const handleTodoComplete = async (id) => {
    const res = await axios.put(
      "/api",
      {},
      {
        params: { mongoId: id },
      }
    );
    toast.success(res.data.message);
    handleFetchTodo();
  };
  useEffect(() => {
    handleFetchTodo();
  }, []);
  console.log(todoData);
  return (
    <div className="max-w-[800px] mx-auto">
      <ToastContainer />
      <form
        className="flex items-start flex-col gap-2 w-[90%] mx-auto  mt-24 px-2 "
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={formData.title}
          onChange={handleChange}
          className="px-3 py-2 border-2 w-full rounded-md"
          name="title"
          placeholder="Enter Title"
        />

        <textarea
          type="text"
          value={formData.description}
          onChange={handleChange}
          className="px-3 py-2 border-2 w-full h-40 my-4 rounded-md"
          name="description"
          placeholder="Enter description"
        />
        <button
          type="submit"
          className="bg-purple-900 py-3 px-11 text-white mx-auto rounded-md"
        >
          {" "}
          Add Todo
        </button>
      </form>

      <div className="relative overflow-x-auto mt-24 w-full mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {reversedTodoArray &&
              reversedTodoArray.map((todo, index) => (
                <Todo
                  key={todo}
                  title={todo.title}
                  id={index}
                  description={todo.description}
                  isCompleted={todo.isCompleted}
                  mongoId={todo._id}
                  handleDeleteTodo={handleDeleteTodo}
                  handleTodoComplete={handleTodoComplete}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
