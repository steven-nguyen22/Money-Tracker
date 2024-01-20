import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

type TItem = {
  name: string;
  _id: string;
  price: number;
  category: string;
  author: string;
  authorName: string;
  date: string;
};

function LineChart() {
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

  var today = new Date();
  var firstJan = new Date(today.getFullYear(), 0, 1);
  var firstFeb = new Date(today.getFullYear(), 1, 0);
  var firstMarch = new Date(today.getFullYear(), 2, 0);
  var firstApril = new Date(today.getFullYear(), 3, 0);
  var firstMay = new Date(today.getFullYear(), 4, 0);
  var firstJune = new Date(today.getFullYear(), 5, 0);
  var firstJuly = new Date(today.getFullYear(), 6, 0);
  var firstAug = new Date(today.getFullYear(), 7, 0);
  var firstSept = new Date(today.getFullYear(), 8, 0);
  var firstOct = new Date(today.getFullYear(), 9, 0);
  var firstNov = new Date(today.getFullYear(), 10, 0);
  var firstDec = new Date(today.getFullYear(), 11, 0);
  var lastDayOfYear = new Date(today.getFullYear(), 12, 0);

  firstFeb.setUTCHours(14, 0, 0, 0);
  firstMarch.setUTCHours(14, 0, 0, 0);
  firstApril.setUTCHours(14, 0, 0, 0);
  firstMay.setUTCHours(14, 0, 0, 0);
  firstJune.setUTCHours(14, 0, 0, 0);
  firstJuly.setUTCHours(14, 0, 0, 0);
  firstAug.setUTCHours(14, 0, 0, 0);
  firstSept.setUTCHours(14, 0, 0, 0);
  firstOct.setUTCHours(14, 0, 0, 0);
  firstNov.setUTCHours(14, 0, 0, 0);
  firstDec.setUTCHours(14, 0, 0, 0);
  lastDayOfYear.setUTCHours(14, 0, 0, 0);

  let janTotal = 0;
  let febTotal = 0;
  let marchTotal = 0;
  let aprilTotal = 0;
  let mayTotal = 0;
  let juneTotal = 0;
  let julyTotal = 0;
  let augTotal = 0;
  let septTotal = 0;
  let octTotal = 0;
  let novTotal = 0;
  let decTotal = 0;

  items.map((items) => {
    let itemDate = new Date(items.date);

    if (itemDate > firstJan && itemDate < firstFeb) {
      if (items.category == "Money Earned") {
        janTotal += items.price;
      } else janTotal -= items.price;
    }
    if (itemDate > firstFeb && itemDate < firstMarch) {
      if (items.category == "Money Earned") {
        febTotal += items.price;
      } else febTotal -= items.price;
    }
    if (itemDate > firstMarch && itemDate < firstApril) {
      if (items.category == "Money Earned") {
        marchTotal += items.price;
      } else marchTotal -= items.price;
    }
    if (itemDate > firstApril && itemDate < firstMay) {
      if (items.category == "Money Earned") {
        aprilTotal += items.price;
      } else aprilTotal -= items.price;
    }
    if (itemDate > firstMay && itemDate < firstJune) {
      if (items.category == "Money Earned") {
        mayTotal += items.price;
      } else mayTotal -= items.price;
    }
    if (itemDate > firstJune && itemDate < firstJuly) {
      if (items.category == "Money Earned") {
        juneTotal += items.price;
      } else juneTotal -= items.price;
    }
    if (itemDate > firstJuly && itemDate < firstAug) {
      if (items.category == "Money Earned") {
        julyTotal += items.price;
      } else julyTotal -= items.price;
    }
    if (itemDate > firstAug && itemDate < firstSept) {
      if (items.category == "Money Earned") {
        augTotal += items.price;
      } else augTotal -= items.price;
    }
    if (itemDate > firstSept && itemDate < firstOct) {
      if (items.category == "Money Earned") {
        septTotal += items.price;
      } else septTotal -= items.price;
    }
    if (itemDate > firstOct && itemDate < firstNov) {
      if (items.category == "Money Earned") {
        octTotal += items.price;
      } else octTotal -= items.price;
    }
    if (itemDate > firstNov && itemDate < firstDec) {
      if (items.category == "Money Earned") {
        novTotal += items.price;
      } else novTotal -= items.price;
    }
    if (itemDate > firstDec && itemDate < lastDayOfYear) {
      if (items.category == "Money Earned") {
        decTotal += items.price;
      } else decTotal -= items.price;
    }
  });

  const dataLine = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Earnings by month",
        data: [
          janTotal,
          febTotal,
          marchTotal,
          aprilTotal,
          mayTotal,
          juneTotal,
          julyTotal,
          augTotal,
          septTotal,
          octTotal,
          novTotal,
          decTotal,
        ],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  return (
    <div className="max-w-lg max-h-md bg-white border border-gray-200 rounded-lg shadow">
      <Line data={dataLine} />
    </div>
  );
}

export default LineChart;
