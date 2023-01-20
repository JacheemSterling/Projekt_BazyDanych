import { useFormik } from "formik";
import React from "react";

export default function DrinkForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      image: "",
      glass: "",
      ingredients: "",
      recipe: "",
      grades: [],
    },
    onSubmit: (values) => {
      if (
        values.name !== "" ||
        values.type !== "" ||
        values.image !== "" ||
        values.glass !== "" ||
        values.ingredients !== "" ||
        values.recipe !== ""
      ) {
        fetch("http://localhost:5000/drinks/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            type: values.type,
            image: values.image,
            glass: values.glass,
            ingredients: values.ingredients,
            recipe: values.recipe,
            grades: values.grades,
          }),
        });
        formik.resetForm();
      } else {
        alert("Wypełnij wszystkie pola!");
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
