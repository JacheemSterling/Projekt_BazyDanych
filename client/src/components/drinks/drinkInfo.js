import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { loggedContext } from "../../App";
import SimpleRating from "./ratingStars";

export default function DrinkInfo({ drink }) {
  const isLogged = useContext(loggedContext);

  return (
    <div className="relative flex flex-col items-center mb-10 bg-stone-300 p-7 rounded-md shadow-md w-[600px] text-lg">
      <img src={drink.image} alt={drink.name} className="drinkImage" />
      <br />
      <h2 className="flex flex-col items-center">
        <b>Nazwa: </b>
        {drink.name}
      </h2>
      <b>Typ: </b>
      <p>{drink.type}</p>
      <div>
        <SimpleRating drink={drink} key={drink._id} />
      </div>
      <button className="text-lg bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
        <Link className="w-[350px]" to={`/${drink._id}`}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          Szczegóły
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Link>
      </button>
      <br />
      {isLogged.user.type === "admin" ? (
        <button
          className="text-lg bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
          onClick={() =>
            fetch(`http://localhost:5000/drinks/delete/${drink._id}`, {
              method: "DELETE",
            })
          }
        >
          Usuń
        </button>
      ) : null}
    </div>
  );
}
