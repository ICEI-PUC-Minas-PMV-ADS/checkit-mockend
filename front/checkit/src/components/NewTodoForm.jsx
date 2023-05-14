import { useState, useEffect } from "react";
import { getTodos } from "../services/Api";

export function NewTodoForm({ onSubmit }) {
  const [newItem, setNewItem] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (newItem === "") return;
    onSubmit(newItem);

    setNewItem("");
  }

  useEffect(() => {
    //TESTE
    getTodos("64443d0709601a8510eb6f5b")
      .then((res) => console.log(res))
      .catch((e) => console.error(e));
  }, []);

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          type="text"
          id="item"
        />
      </div>
      <button className="btn">Add</button>
    </form>
  )
}