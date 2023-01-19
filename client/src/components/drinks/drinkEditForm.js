import { useDispatch } from "react-redux";
import { loggedContext } from "../../App";
import { useFormik } from "formik";
import { useContext } from "react";

export default function DrinkEdit({ drink }) {
  const isLogged = useContext(loggedContext);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      id: drink.id,
      name: drink.name,
      type: drink.type,
      type_of_glass: drink.type_of_glass,
      recipe: drink.recipe,
      ingredients: drink.ingredients,
      image: drink.image,
      grades: drink.grades,
    },
    onSubmit: (values) => {
      dispatch({ type: "UPDATE_DRINK", payload: values });
    },
  });

  return (
    <div className="flex flex-col mb-10 leading-10">
      {isLogged.user.type === "admin" ? (
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col w-[600px] bg-gray-600 p-5 pl:pr-7 rounded-lg"
        >
          <label htmlFor="name">Nazwa drinka</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <label htmlFor="type">Rodzaj drinka</label>
          <input
            type="text"
            id="type"
            name="type"
            onChange={formik.handleChange}
            value={formik.values.type}
          />
          <label htmlFor="type_of_glass">Rodzaj szklanki</label>
          <input
            type="text"
            id="type_of_glass"
            name="type_of_glass"
            onChange={formik.handleChange}
            value={formik.values.type_of_glass}
          />
          <label htmlFor="recipe">Przepis</label>
          <textarea
            id="recipe"
            name="recipe"
            onChange={formik.handleChange}
            value={formik.values.recipe}
          />
          <label htmlFor="ingredients">Składniki</label>
          <textarea
            id="ingredients"
            name="ingredients"
            onChange={formik.handleChange}
            value={formik.values.ingredients}
          />
          <label htmlFor="image">Link do zdjęcia</label>
          <input
            type="text"
            id="image"
            name="image"
            onChange={formik.handleChange}
            value={formik.values.image}
          />
          <br />
          <button
            className="text-lg bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
            type="submit"
          >
            Zapisz zmiany
          </button>
        </form>
      ) : null}
    </div>
  );
}
