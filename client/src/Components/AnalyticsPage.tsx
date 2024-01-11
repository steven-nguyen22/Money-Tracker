import Nav from "./Nav";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJs.register(ArcElement, Tooltip, Legend);

type TItem = {
  name: string;
  _id: string;
  price: number;
  category: string;
  author: string;
  authorName: string;
};

function AnalyticsPage() {
  const [items, setItems] = useState<TItem[]>([]);

  useEffect(() => {
    async function fetchItems() {
      const response = await fetch("http://localhost:5000/getItem", {
        credentials: "include",
      });
      const newItems = await response.json();
      setItems(newItems);
    }
    fetchItems();
  }, []);

  let foodTotal = 0;
  let clothingTotal = 0;
  let entertainmentTotal = 0;
  let housingTotal = 0;
  let travelTotal = 0;
  let medicalTotal = 0;
  let subTotal = 0;
  let miscTotal = 0;

  items.map((items) => {
    if (items.category == "Food") {
      foodTotal += items.price;
    }
    if (items.category == "Clothing") {
      clothingTotal += items.price;
    }
    if (items.category == "Entertainment") {
      entertainmentTotal += items.price;
    }
    if (items.category == "Housing") {
      housingTotal += items.price;
    }
    if (items.category == "Travel") {
      travelTotal += items.price;
    }
    if (items.category == "Medical") {
      medicalTotal += items.price;
    }
    if (items.category == "Subscriptions") {
      subTotal += items.price;
    }
    if (items.category == "Miscellaneous") {
      miscTotal += items.price;
    }
  });

  const data = {
    labels: [
      "Food",
      "Clothing",
      "Entertainment",
      "Housing",
      "Travel",
      "Medical",
      "Subscriptions",
      "Miscellaneous",
    ],
    datasets: [
      {
        label: "My First Dataset",
        data: [
          foodTotal,
          clothingTotal,
          entertainmentTotal,
          housingTotal,
          travelTotal,
          medicalTotal,
          subTotal,
          miscTotal,
        ],
        backgroundColor: [
          "#14281D",
          "green",
          "blue",
          "red",
          "orange",
          "yellow",
          "purple",
          "#adb5bd",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {};

  return (
    <div>
      <div>
        <Nav />
      </div>

      <div>
        {items.map((items) => (
          <div>
            <label>{items.category}</label>
            <label> {items.name}</label>
            <label> {items.price}</label>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-row justify-center items-center">
        <div className="">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;