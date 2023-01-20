import React, { useEffect, useState } from "react";
import CommentInfo from "./commentInfo";

export default function CommentList() {
  const [comments, setCommentList] = useState();
  const [loaded, finishLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/comments")
      .then((res) => res.json())
      .then(
        (data) => {
          setCommentList(data);
          finishLoading(true);
        },
        (error) => {
          console.log(error);
        }
      );
  });

  return (
    <div className="flex flex-col items-center">
      <div className="w-[600px] text-center p-10 bg-stone-200 rounded-md">
        <b>Komentarze: </b>
        <br />
        <br />
        {loaded ? (
          comments.length === 0 ? (
            <p>Brak komentarzy</p>
          ) : (
            comments.map((comment) => (
              <CommentInfo comment={comment} key={comment._id} />
            ))
          )
        ) : (
          <p>Ladowanie</p>
        )}
      </div>
    </div>
  );
}
