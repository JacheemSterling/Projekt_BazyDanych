import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Bar, Pie } from "react-chartjs-2";
// eslint-disable-next-line
import Chart from "chart.js/auto";

export default function CoctailTable() {
  const drinks = useSelector((state) => state.drinks);
  const comments = useSelector((state) => state.comments);
  return (
    <div className="flex flex-col items-center">
      <h3>Statystyki</h3>

      <div className="mt-20 mb-20 w-[600px]">
        <Pie
          data={{
            labels: ["Alkoholowe", "Bezalkoholowe"],
            datasets: [
              {
                label: "Liczba drinków",
                data: [
                  drinks.filter((drink) => drink.type === "alkoholowy").length,
                  drinks.filter((drink) => drink.type === "bezalkoholowy")
                    .length,
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                ],
                borderColor: ["rgba(0, 0, 0, 0.6)"],
                borderWidth: 1,
              },
            ],
          }}
          height={200}
          width={200}
          options={{ maintainAspectRatio: false }}
        />
      </div>
      <div className="mb-20 w-[600px]">
        <Bar
          data={{
            labels: [
              "Średnia dlugość przepisu",
              "Najdluzszy przepis",
              "Najkrotszy przepis",
            ],
            datasets: [
              {
                label: "Liczba słów",
                data: [
                  drinks.reduce(
                    (acc, drink) => acc + drink.recipe.split(" ").length,
                    0
                  ) / drinks.length,
                  drinks.reduce(
                    (acc, drink) =>
                      acc > drink.recipe.split(" ").length
                        ? acc
                        : drink.recipe.split(" ").length,
                    0
                  ),
                  drinks.reduce(
                    (acc, drink) =>
                      acc < drink.recipe.split(" ").length
                        ? acc
                        : drink.recipe.split(" ").length,
                    1000
                  ),
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                ],
                borderColor: ["rgba(0, 0, 0, 0.6)"],
                borderWidth: 1,
              },
            ],
          }}
          height={200}
          width={10}
          options={{ maintainAspectRatio: false }}
        />
      </div>
      <div className="mb-20 w-[600px]">
        <Bar
          data={{
            labels: ["Ilość komentarzy", "Ilość drinkow"],
            datasets: [
              {
                label: "Liczba",
                data: [comments.length, drinks.length],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                ],
                borderColor: ["rgba(0, 0, 0, 0.6)"],
                borderWidth: 1,
              },
            ],
          }}
          height={200}
          width={10}
          options={{ maintainAspectRatio: false }}
        />
      </div>

      <Table className="tabelaStat">
        <thead>
          <tr>
            <th>#</th>
            <th>Statystyki</th>
            <th>Wartość</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Liczba drinków</td>
            <td>{drinks.length}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Liczba drinków z alkoholem</td>
            <td>
              {drinks.filter((drink) => drink.type === "alkoholowy").length}
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Liczba drinków bez alkoholu</td>
            <td>
              {drinks.filter((drink) => drink.type === "bezalkoholowy").length}
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Najczesciej oceniany drink</td>
            <td>
              {drinks.reduce(
                (acc, x) => (x.grades.length > acc ? (acc = x.name) : acc),
                ""
              )}
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>Średnia dlugosc przepisu</td>
            <td>
              {" "}
              {drinks.reduce(
                (acc, drink) => acc + drink.recipe.split(" ").length,
                0
              ) / drinks.length}
              {" słów "}
            </td>
          </tr>
          <tr>
            <td>6</td>
            <td>Najdluższy przepis</td>
            <td>
              {" "}
              {drinks.reduce(
                (acc, drink) =>
                  acc > drink.recipe.split(" ").length
                    ? acc
                    : drink.recipe.split(" ").length,
                0
              )}
              {" słów "}
            </td>
          </tr>
          <tr>
            <td>7</td>
            <td>Ilość komentarzy</td>
            <td>{comments.length}</td>
          </tr>
        </tbody>
      </Table>
      <br />
    </div>
  );
}
