import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Categories, IToDo, categoriesState, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldTodos) => {
      const targetIndex = oldTodos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [...oldTodos.slice(0, targetIndex), newToDo, ...oldTodos.slice(targetIndex + 1)];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {categories.map((c) => {
        return (
          <>
            {category !== c && (
              <button
                name={c}
                onClick={onClick}
              >
                {c}
              </button>
            )}
          </>
        );
      })}
    </li>
  );
}

export default ToDo;
