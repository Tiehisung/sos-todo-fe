import type { ITodo } from "../types/todo";

type Props = {
  todo: ITodo;
  onDelete: (id: string) => void;
};

export default function TodoItem({ todo, onDelete }: Props) {
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "8px 0",
      }}
    >
      <span>{todo.text}</span>

      <button onClick={() => onDelete(todo.id)}>❌</button>
    </li>
  );
}
