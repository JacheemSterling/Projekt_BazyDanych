import React, { useEffect, useContext, useState } from "react";
import DrinkInfo from "./drinkInfo";
import { loggedContext } from "../../App";
import DrinkForm from "./drinkForm";

export default function DrinkList() {
  const isLogged = useContext(loggedContext);

  const [search, setSearch] = useState("");
  const [filteredDrinks, setFilteredDrinks] = useState([]);
  const [searchErr, setSearchErr] = useState("");

  const [drinks, setDrinkList] = useState();
  const [loaded, finishLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/drinks")
      .then((res) => res.json())
      .then(
        (data) => {
          setDrinkList(data);
          finishLoading(true);
        },
        (error) => {
          console.log(error);
        }
      );

    if (loaded === true) {
      setFilteredDrinks(
        drinks.filter((drink) => {
          return drink.name.toLowerCase().includes(search.toLowerCase());
        })
      );

      if (filteredDrinks.length === 0 && search !== "") {
        setSearchErr("Nie znaleziono drinka");
      } else {
        setSearchErr("");
      }
    }
  }, [search, loaded, drinks, filteredDrinks.length]);

  return (
    <div key="drinkList" className="mt-[100px] flex flex-col items-center">
      {isLogged.user.type === "admin" ? (
        <div className="drinkAdminForm">
          <DrinkForm />
        </div>
      ) : null}
      <input
        className="searchBar"
        type="text"
        placeholder="Wyszukaj drinka"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      {loaded ? (
        drinks.length === 0 ? (
          <p>
            <br />
            Brak drinków
            <br />
            <br />
          </p>
        ) : (
          filteredDrinks.map((drink) => (
            <DrinkInfo drink={drink} key={drink._id} />
          ))
        )
      ) : (
        <p>Ladowanie</p>
      )}
      {searchErr ? (
        <p>
          <br />
          {searchErr}
          <br />
          <br />
        </p>
      ) : null}
    </div>
  );
}
