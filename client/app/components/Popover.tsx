import { deleteTodo, updateTodo } from "@/utils/APIs";
import { APIRequest } from "@/utils/networkCalls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface PopoverProps {
  isPopoverOpen: boolean;
  setIsPopoverOpen: (val: boolean) => void;
  task: {
    _id: string;
    title: string;
    description?: string;
    priority?: string;
    done?: boolean;
    createdAt?: Date;
  };
}
interface FormData {
  description?: string;
  priority?: string;
  done?: boolean;
}
function Popover({ isPopoverOpen, setIsPopoverOpen, task }: PopoverProps) {
  console.log("task:", task);
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      description: task.description,
      priority: task.priority,
      done: task.done,
    },
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () =>
      APIRequest({
        url: `${deleteTodo}/${task._id}`,
        method: "DELETE",
        additionalInfo: { credentials: "include" },
      }),
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (err) => toast.error(err.message),
  });
  const updateMutation = useMutation({
    mutationFn: (data: FormData) =>
      APIRequest({
        url: `${updateTodo}/${task._id}`,
        method: "PUT",
        data,
        additionalInfo: { credentials: "include" },
      }),
    onSuccess: (res) => {
      toast.success(res.message);
      setIsPopoverOpen(false);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (err) => toast.error(err.message),
  });
  function handleDelete() {
    deleteMutation.mutate();
  }
  function handleUpdate(data: FormData) {
    updateMutation.mutate(data);
  }
  function handleClose() {
    setIsPopoverOpen(false);
    reset();
  }
  return (
    <div>
      {isPopoverOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50"
          onClick={() => setIsPopoverOpen(false)}
        >
          <form
            className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg m-5"
            onSubmit={handleSubmit(handleUpdate)}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h2 className="text-xl font-bold mb-2">{task.title}</h2>
            <div className="w-full">
              <label>Priority</label>
              <div>
                <select
                  {...register("priority")}
                  className="mt-1 border rounded-sm placeholder:text-sm p-2 w-full text-sm"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
            <div className="mt-5">
              <label>Description</label>
              <div>
                <textarea
                  {...register("description")}
                  className="mt-1 border rounded-sm w-full p-2 placeholder:text-sm"
                  placeholder="Add details to your todo"
                />
              </div>
            </div>
            <div className="my-1">
              <label className="text-xl">Done</label>
              <input type="checkbox" {...register("done")} className="ml-1" />
            </div>
            <div className="flex flex-col sm:flex-row gap-1">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-600 w-full text-white rounded hover:bg-gray-700 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-red-600 w-full text-white rounded hover:bg-red-700 cursor-pointer"
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </button>
              <button
                className="px-4 py-2 bg-blue-600 w-full text-white rounded hover:bg-blue-700 cursor-pointer"
                type="submit"
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
export default Popover;
