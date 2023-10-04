import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { categoriesState } from "../atoms";

interface IForm {
  category: string;
}

function CreateCategory() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setCategories = useSetRecoilState(categoriesState);
  const handleValid = ({ category }: IForm) => {
    setCategories((oldCategories) => [category, ...oldCategories]);
    setValue("category", "");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("category", { required: true })}
          placeholder="Write a category"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default CreateCategory;
