import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoriesState, categoryState, toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import CreateCategory from "./CreateCategory";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, _] = useRecoilState(categoriesState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  console.log(categories);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateCategory />
      <hr />
      <select
        value={category}
        onInput={onInput}
      >
        {categories.map((category) => (
          <option
            key={category}
            value={category}
          >
            {category}
          </option>
        ))}
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo
          key={toDo.id}
          {...toDo}
        />
      ))}
    </div>
  );
}

export default ToDoList;
