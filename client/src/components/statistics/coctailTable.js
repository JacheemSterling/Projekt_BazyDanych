import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
// eslint-disable-next-line
import Chart from "chart.js/auto";

export default function CoctailTable() {
  const data = React.useRef();
  const [loaded, setIsLoading] = React.useState(false);
  const [commN, setCommN] = React.useState(0);

  const numberOfDrinks = new Promise((resolve, reject) =>
    fetch("http://localhost:5000/drinkscount")
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
  );

  const alcoholicDrinks = new Promise((resolve, reject) =>
    fetch("http://localhost:5000/drinksalcoholic")
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
  );

  const longestRecipe = new Promise((resolve, reject) =>
    fetch("http://localhost:5000/drinksrecipemax")
      .then((res) => res.json())
      .then((data) => {
        resolve(data[0].length);
      })
  );

  const shortestRecipe = new Promise((resolve, reject) =>
    fetch("http://localhost:5000/drinksrecipemin")
      .then((res) => res.json())
      .then((data) => {
        resolve(data[0].length);
      })
  );

  const avgRecipe = new Promise((resolve, reject) =>
    fetch("http://localhost:5000/drinksrecipeavg")
      .then((res) => res.json())
      .then((data) => {
        resolve(data[0].avg);
      })
  );

  const numberOfComments = new Promise((resolve, reject) =>
    fetch("http://localhost:5000/commentscount")
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
  );

  async function getData() {
    try {
      const number = await numberOfDrinks;
      data.number = number;
      const alcohol = await alcoholicDrinks;
      data.alcohol = alcohol;
      const nonalcohol = (await numberOfDrinks) - (await alcoholicDrinks);
      data.nonalcohol = nonalcohol;

      const longest = await longestRecipe;
      data.longest = longest;
      const shortest = await shortestRecipe;
      data.shortest = shortest;
      const avg = await avgRecipe;
      data.avg = avg;
      const numberC = await numberOfComments;
      data.numberC = numberC;
    } catch (err) {
      console.log(err);
    }

    return data;
  }
  useEffect(() => {
    getData().then((data) => {
      setIsLoading(true);
    });
  }, []);

  function updateData(chart) {
    chart.update();
  }

  var chart1data = {
    labels: ["Drinki alkoholowe", "Drinki bezalkoholowe"],
    datasets: [
      {
        label: "Liczba drinków",
        data: [data.alcohol, data.nonalcohol],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverOffset: 4,
      },
    ],
  };

  var chart2data = {
    labels: [
      "Najdłuższy przepis",
      "Najkrótszy przepis",
      "Średnia długość przepisu",
    ],
    datasets: [
      {
        label: "Długośc przepisu",
        data: [data.longest, data.shortest, data.avg],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverOffset: 4,
      },
    ],
  };

  var chart3data = {
    labels: ["Liczba komentarzy", "Liczba drinków"],
    datasets: [
      {
        label: "Liczba komentarzy do liczby drinków",
        data: [data.numberC, data.number],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className=" mt-[125px] flex flex-col items-center">
      <h3>Statystyki</h3>
      <div className="flex flex-col items-center">
        {loaded ? (
          <div>
            <Pie
              key={Math.random()}
              data={chart1data}
              height={300}
              width={500}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        ) : null}
        {loaded ? (
          <div className="mt-[40px]">
            <Bar
              key={Math.random()}
              data={chart2data}
              height={300}
              width={500}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        ) : null}
        {loaded ? (
          <div className="mt-[40px]">
            <Bar
              key={Math.random()}
              data={chart3data}
              height={300}
              width={500}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
