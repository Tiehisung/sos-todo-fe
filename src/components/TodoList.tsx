 
import type { ITodo } from "../types/todo";
import TodoItem from "./TodoItem";

type Props = {
  todos: ITodo[];
  onDelete: (id: string) => void;
};

export default function TodoList({ todos, onDelete }: Props) {
  if (!todos.length) {
    return <p>No todos yet 👀</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
      ))}
    </ul>
  );
}
