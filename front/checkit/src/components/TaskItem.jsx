import { useState } from "react";
import { Checkbox } from "primereact/checkbox";

export default function DynamicDemo({ tasks }) {
  const [selectedTasks, setSelectedTasks] = useState([]);

  const onTaskChange = (e) => {
    let _selectedTasks = [...selectedTasks];

    if (e.checked) {
      _selectedTasks.push(e.value);
    } else {
      _selectedTasks = _selectedTasks.filter(
        (task) => task.id !== e.value.id
      );
    }

    setSelectedTasks(_selectedTasks);
  };

  return (
    <div className="p-3">
      <div>
        {tasks.map((task) => {
          return (
            <div
              key={task.id}
              className="d-flex justify-content-between border border-light rounded my-2 p-2"
            >
              <label htmlFor={task.id} className="ml-2 text-light">
                {task.title}
              </label>
              <Checkbox
                inputId={task.id}
                name="task"
                value={task}
                onChange={onTaskChange}
                checked={selectedTasks.some((item) => item.id === task.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
