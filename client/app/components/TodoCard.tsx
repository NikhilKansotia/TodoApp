import { createTodo } from "@/utils/APIs";
import { APIRequest } from "@/utils/networkCalls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface FormData {
  title: string;
  description?: string;
  priority: string;
}

function TodoCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: { priority: "Low" },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      APIRequest({
        url: `${createTodo}`,
        data: { ...data },
        additionalInfo: { credentials: "include" },
      }),
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  function onSubmit(data: FormData) {
    mutation.mutate(data);
    reset();
  }

  return (
    <div className="mt-10 flex justify-center">
      <form
        className="border border-gray-300 shadow-2xl rounded-md p-5 w-[500px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="w-full sm:w-1/2">
            <label>Title</label>
            <div>
              <input
                {...register("title", { required: "Title is required" })}
                className="mt-1 border rounded-sm placeholder:text-sm p-2 w-full"
                placeholder="Write your todo"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full sm:w-1/2">
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
        <button
          type="submit"
          className="w-full bg-blue-500 mt-5 rounded-md p-2 text-lg text-white cursor-pointer hover:bg-blue-700"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Wait" : "Add todo"}
        </button>
      </form>
    </div>
  );
}
export default TodoCard;
