import { useFormik } from "formik";

export default function CommentEditForm({ comment }) {
  const formik = useFormik({
    initialValues: {
      user: comment.user,
      comment: comment.comment,
    },
    onSubmit: (values) => {
      if (values.comment === "") {
        alert("Komentarz nie może być pusty");
        return;
      }
      fetch(`http://localhost:5000/comments/update/${comment._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: values.comment,
          user: values.user,
        }),
      });
      formik.resetForm();
    },
  });

  return (
    <div className="commentEditForm">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="comment">Edytuj komentarz: </label>
        <input
          className="px-2 py-0.5 rounded-md mr-2"
          type="text"
          id="comment"
          comment="comment"
          placeholder="Edycja komentarza"
          onChange={formik.handleChange}
          value={formik.values.comment}
        />
        <button
          type="submit"
          className="text-lg bg-gray-900 text-white px-3 py-1.5 rounded-md text-sm font-medium"
        >
          Zapisz
        </button>
      </form>
    </div>
  );
}
