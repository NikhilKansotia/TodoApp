import { useState } from "react";
import Popover from "./Popover";
import { Task } from "./Todos";

function Card({ task }: { task: Task }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const togglePopOver = () => setIsPopoverOpen(!isPopoverOpen);
  return (
    <div
      className="border rounded-md mt-2 p-2 cursor-pointer"
      onClick={togglePopOver}
    >
      <div className="flex justify-between">
        <h3 className="text-md font-bold">{task.title}</h3>
        <div className="flex text-sm text-gray-900 gap-1">
          <p>
            {new Date(task.createdAt).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>
      </div>
      <div className="text-sm text-gray-900 mt-1">{task.description}</div>
      <Popover
        isPopoverOpen={isPopoverOpen}
        setIsPopoverOpen={setIsPopoverOpen}
        task={task}
      />
    </div>
  );
}
export default Card;
