import Nav from "./Nav";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJs.register(ArcElement, Tooltip, Legend);

function AnalyticsPage() {
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
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

      <div className="mt-5 flex flex-row justify-center items-center">
        <div className="">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
