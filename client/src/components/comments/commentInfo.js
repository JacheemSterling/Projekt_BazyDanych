import { loggedContext } from "../../App";
import { useContext } from "react";
import CommentEditForm from "./commentEditForm";

export default function CommentInfo({ comment }) {
  const { isLogged, user } = useContext(loggedContext);

  return (
    <div className="relative mb-10 bg-stone-300 flex flex-col items-center p-2 rounded-md shadow-md">
      <p>
        <br />
        <b>{comment.user}</b>: {comment.comment}
      </p>
      <br />
      {(isLogged && user.username === comment.user) ||
      (isLogged && user.type === "admin") ? (
        <div className="commentButtons" class="float-right">
          <button
            className="text-lg bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
            onClick={() =>
              fetch(`http://localhost:5000/comments/delete/${comment._id}`, {
                method: "DELETE",
              })
            }
          >
            Usuń komentarz
          </button>
          <br />
          <br />
          <CommentEditForm comment={comment} key={comment.id} />
        </div>
      ) : null}
    </div>
  );
}
