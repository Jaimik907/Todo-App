import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addTodo,
  deleteTodos,
  fetchTodoList,
  getTaskById,
  IAddTodoResponse,
  IResponse,
  ITodo,
  ITodoData,
  ITodoPayload,
  status,
  updateCompleteTodoStatus,
  updateTask,
} from '../http-service/todo';

export const useTodo = (status: status) => {
  const queryClient = useQueryClient();

  const fetchList = useQuery<IResponse<ITodo>, Error, ITodoData>({
    queryKey: ['todos', status],
    queryFn: fetchTodoList.bind(null, status),
    select: (data) => {
      const todo = data.data.tasks.map((task) => ({
        ...task,
        isComplete: Boolean(task.isComplete),
      }));
      return todo;
    },
  });

  const insertTodo = useMutation<
    IResponse<IAddTodoResponse>,
    Error,
    ITodoPayload
  >({
    mutationFn: (payload: ITodoPayload) => addTodo(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteTodo = useMutation<IResponse<undefined>, Error, any>({
    mutationFn: (data) => deleteTodos(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const updateCompleteStatus = useMutation<IResponse<undefined>, Error, any>({
    mutationFn: (data) => updateCompleteTodoStatus(data.id, data.taskStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const updateTodo = useMutation<IResponse<undefined>, Error, any>({
    mutationFn: (data) => {
      return updateTask(data.id, data.task);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const getTask = (id: number, options: { enabled: boolean }) =>
    useQuery({
      queryKey: ['task'],
      queryFn: () => getTaskById(id),
      enabled: options.enabled ?? true,
      select: (data) => {
        return data.data;
      },
    });

  return {
    fetchList,
    insertTodo,
    deleteTodo,
    updateCompleteStatus,
    updateTodo,
    getTask,
  };
};
