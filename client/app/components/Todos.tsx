"use client";

import { getTodos } from "@/utils/APIs";
import { APIRequest } from "@/utils/networkCalls";
import { useQuery } from "@tanstack/react-query";
import Card from "./Card";

export interface Task {
  _id: string;
  title: string;
  description: string;
  priority: string;
  done: boolean;
  createdAt: Date;
}

function Todos() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      APIRequest({
        url: `${getTodos}`,
        method: "GET",
        additionalInfo: { credentials: "include" },
      }),
  });
  const todos = data?.todos || [];
  const highPriorityTasks = todos.filter(
    (el: Task) => el.priority === "High" && el.done === false
  );
  const mediumPriorityTasks = todos.filter(
    (el: Task) => el.priority === "Medium" && el.done === false
  );
  const lowPriorityTasks = todos.filter(
    (el: Task) => el.priority === "Low" && el.done === false
  );
  const completedTasks = todos.filter((el: Task) => el.done === true);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="mt-10">
      <h1 className="text-sm text-gray-700">
        Click on the Todo you want to update
      </h1>
      <div className="flex flex-col md:flex-row gap-5 mt-2">
        <div className="flex-1 p-4 rounded-lg bg-red-100 shadow">
          <div className="flex items-baseline">
            <h3 className="text-2xl font-bold">High Priority</h3>
            <p className="ml-1 text-sm">({highPriorityTasks.length})</p>
          </div>
          {highPriorityTasks.map((task: Task, id: number) => (
            <Card task={task} key={id} />
          ))}
        </div>
        <div className="flex-1 p-4 rounded-lg bg-blue-100 shadow">
          <div className="flex items-baseline">
            <h3 className="text-2xl font-bold">Medium Priority</h3>
            <p className="ml-1 text-sm">({mediumPriorityTasks.length})</p>
          </div>
          {mediumPriorityTasks.map((task: Task, id: number) => (
            <Card task={task} key={id} />
          ))}
        </div>
        <div className="flex-1 p-4 rounded-lg bg-yellow-100 shadow">
          <div className="flex items-baseline">
            <h3 className="text-2xl font-bold">Low Priority</h3>
            <p className="ml-1 text-sm">({lowPriorityTasks.length})</p>
          </div>
          {lowPriorityTasks.map((task: Task, id: number) => (
            <Card task={task} key={id} />
          ))}
        </div>
      </div>
      <div className="mt-5">
        <h1>Keep Track of your completed tasks</h1>
        {completedTasks.map((task: Task, id: number) => (
          <Card task={task} key={id} />
        ))}
      </div>
    </div>
  );
}
export default Todos;
