import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import React from "react";
import { useSelector } from "react-redux";

export default function DrinkForm() {
  const drinks = useSelector((state) => state.drinks);

  const dispatch = useDispatch();

  const id = () => {
    if (drinks.length === 0) {
      return 1;
    } else {
      return drinks[drinks.length - 1].id + 1;
    }
  };

  const formik = useFormik({
    initialValues: {
      id: id(),
      name: "",
      type: "",
      image: "",
      glass: "",
      ingredients: "",
      recipe: "",
      grades: [],
    },
    onSubmit: (values) => {
      if(values.name !== "" || values.type !== "" || values.image !== "" || values.glass !== "" || values.ingredients !== "" || values.recipe !== "")
      {
      dispatch({ type: "ADD_DRINK", payload: values });
      formik.resetForm();
    }else{
      alert("Wypełnij wszystkie pola!")
    }
    },
  });

  return (
    <div className="flex flex-col mb-10 leading-10">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col w-[300px] bg-gray-600 p-5 pl:pr-7 rounded-lg"
      >
        <input
          className="rounded-md mb-1"
          value={formik.values.name}
          name="name"
          id="name"
          placeholder="Nazwa drinka"
          onChange={formik.handleChange}
        />
        <input
          className="rounded-md mb-1"
          value={formik.values.type}
          name="type"
          id="type"
          placeholder="Typ drinka"
          onChange={formik.handleChange}
        />
        <input
          className="rounded-md  mb-1"
          value={formik.values.image}
          name="image"
          id="image"
          placeholder="Zdjęcie drinka"
          onChange={formik.handleChange}
        />
        <input
          className="rounded-md mb-1"
          value={formik.values.glass}
          name="glass"
          id="glass"
          placeholder="Szklanka do drinka"
          onChange={formik.handleChange}
        />
        <input
          className="rounded-md mb-1"
          value={formik.values.ingredients}
          name="ingredients"
          id="ingredients"
          placeholder="Składniki drinka"
          onChange={formik.handleChange}
        />
        <input
          className="rounded-md mb-1"
          value={formik.values.recipe}
          name="recipe"
          id="recipe"
          placeholder="Przepis drinka"
          onChange={formik.handleChange}
        />
        <button
          className="text-lg bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
          type="submit"
        >
          Dodaj drink
        </button>
      </form>
    </div>
  );
}
