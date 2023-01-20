import { useFormik } from "formik";
import React, { useContext } from "react";
import { loggedContext } from "../../App";

export default function CommentForm({ user }) {
  const isLogged = useContext(loggedContext);

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    onSubmit: (values) => {
      if (values.comment === "") {
        alert("Kommentarz nie może być pusty");
        return;
      }
      fetch("http://localhost:5000/comments/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: values.comment,
          user: user,
        }),
      });
      formik.resetForm();
    },
  });

  return isLogged.isLogged ? (
    <div className="text-center mt-10 bg-stone-200 p-10">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Dodaj komentarz</h2>
        <form onSubmit={formik.handleSubmit}>
          <input
            className="px-2 py-1 rounded-md mr-2"
            value={formik.values.comment}
            name="comment"
            id="comment"
            placeholder="Komentarz"
            onChange={formik.handleChange}
          />
          <button
            type="submit"
            className="text-lg bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Dodaj komentarz
          </button>
        </form>
      </div>
    </div>
  ) : (
    <div className="text-center mt-10 bg-stone-200 p-10">
      <p>
        <b>Musisz być zalogowany aby dodać komentarz</b>
      </p>
    </div>
  );
}
