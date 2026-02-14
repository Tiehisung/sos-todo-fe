import { useState } from "react";

type Props = {
  onAdd: (text: string) => void;
};

export default function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <div style={{ display: "flex", gap: 10 }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a todo..."
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}
