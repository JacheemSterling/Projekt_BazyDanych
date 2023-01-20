import React from "react";
import { Link } from "react-router-dom";
import saveJSON from "../drinks/downloadDrink";

export default function NavBar() {
  const [data, setData] = React.useState();
  const [loaded, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    fetch("http://localhost:5000/drinks")
      .then((res) => res.json())
      .then((data) => {
        setData(
          data.map(
            (drink) =>
              `Nazwa: ${drink.name} \nSkładniki: ${drink.ingredients} \nPrzepis: ${drink.recipe} \n\n`
          )
        );
        setIsLoading(true);
      });
  }, [data]);

  return (
    <div>
      <div className="flex space-x-4 p-3 pl-5 bg-gray-600">
        <Link
          className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
          to="/"
        >
          Strona główna
        </Link>
        <Link
          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          to="statistics"
        >
          Statystyki
        </Link>
        <button
          type="submit"
          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          id="user-menu-button"
          aria-expanded="false"
          onClick={() => (loaded ? saveJSON({ data }) : null)}
        >
          Pobierz wszystkie przepisy
        </button>
      </div>
    </div>
  );
}
