import Nav from "./Nav";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import LineChart from "./LineChart";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import { format } from "date-fns";
import MyModal from "./MyModal";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

ChartJs.register(ArcElement, Tooltip, Legend);

type TItem = {
  name: string;
  _id: string;
  price: number;
  category: string;
  author: string;
  authorName: string;
};

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

//allows for multiple charts on one page
Chart.register(CategoryScale);

function AnalyticsPage() {
  const [items, setItems] = useState<TItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState();
  const [showModal, setShowModal] = useState(false);
  const handleOnClose = () => setShowModal(false);
  let [dayOne, setDayOne] = useState("All");
  let [dayTwo, setDayTwo] = useState("All");
  var today = new Date();

  console.log("date range", dateRange);

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

  async function handleTimeDay(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/getItemDay", {
      credentials: "include",
    });
    const newItems = await response.json();
    console.log(newItems);
    setItems(newItems);
    setDayOne(newItems[newItems.length - 1]);
    setDayTwo(newItems[newItems.length - 1]);
  }

  async function handleTimeWeek(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/getItemWeek", {
      credentials: "include",
    });
    const newItems = await response.json();
    console.log(newItems);
    setItems(newItems);
    setDayOne(newItems[newItems.length - 2]);
    setDayTwo(newItems[newItems.length - 1]);
  }

  async function handleTimeMonth(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/getItemMonth", {
      credentials: "include",
    });
    const newItems = await response.json();
    console.log(newItems);
    setDayOne(newItems[newItems.length - 2]);
    setDayTwo(newItems[newItems.length - 1]);
    setItems(newItems);
  }

  async function handleTimeYear(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/getItemYear", {
      credentials: "include",
    });
    const newItems = await response.json();
    console.log(newItems);
    setDayOne(newItems[newItems.length - 2]);
    setDayTwo(newItems[newItems.length - 1]);
    setItems(newItems);
  }

  async function handleTimeAll(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/getItem", {
      credentials: "include",
    });
    const newItems = await response.json();
    console.log(newItems);
    setItems(newItems);
    setDayOne("All");
    setDayTwo("All");
  }

  async function handleTimeInterval(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    let start = dateRange[0];
    let end = dateRange[1];

    const response = await fetch("http://localhost:5000/getItemInterval", {
      method: "POST",
      body: JSON.stringify({
        start,
        end,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const newItems = await response.json();
    console.log(newItems);
    setDayOne(newItems[newItems.length - 2]);
    setDayTwo(newItems[newItems.length - 1]);
    setItems(newItems);
  }

  let foodTotal = 0;
  let clothingTotal = 0;
  let entertainmentTotal = 0;
  let housingTotal = 0;
  let travelTotal = 0;
  let medicalTotal = 0;
  let subTotal = 0;
  let miscTotal = 0;
  let moneyEarnedTotal = 0;
  let totalSpent = 0;
  let totalBalance = 0;
  let negative = "";
  let color = "";

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
    if (items.category == "Money Earned") {
      moneyEarnedTotal += items.price;
    }

    totalSpent =
      foodTotal +
      clothingTotal +
      entertainmentTotal +
      housingTotal +
      travelTotal +
      medicalTotal +
      subTotal +
      miscTotal;
    totalBalance = moneyEarnedTotal - totalSpent;
  });

  if (totalBalance < 0) {
    totalBalance = totalBalance * -1;
    negative = "-";
  }

  if (negative == "") {
    color = "text-[color:green]";
  } else {
    color = "text-[color:red]";
  }

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
      "Money Earned",
    ],
    datasets: [
      {
        label: "Distrubution by category",
        data: [
          foodTotal,
          clothingTotal,
          entertainmentTotal,
          housingTotal,
          travelTotal,
          medicalTotal,
          subTotal,
          miscTotal,
          moneyEarnedTotal,
        ],
        backgroundColor: [
          "#ad1457",
          "#f44336",
          "#ff9800",
          "#ffc107",
          "#8bc34a",
          "#009688",
          "#1565c0",
          "#448aff",
          "#004b23",
        ],
        hoverOffset: 4,
      },
    ],
  };

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
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  if (dayOne != "All") {
    dayOne = format(new Date(dayOne), "MMM d, yyyy");
    dayTwo = format(new Date(dayTwo), "MMM d, yyyy");
  }

  return (
    <section className="relative w-full h-screen mx-auto">
      <div className="bg-background1 bg-cover bg-no-repeat bg-center">
        <Nav />
        <div className="w-full h-screen grid grid-rows-4 grid-flow-col gap-4">
          <div className="row-span-2 ml-12">
            <motion.nav
              initial={false}
              animate={isOpen ? "open" : "closed"}
              className="h-full w-80 font-semibold"
            >
              <motion.button
                className="bg-test rounded-xl p-8 text-left w-80 mb-2.5 mt-2.5 flex justify-between items-center"
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsOpen(!isOpen)}
              >
                Menu
                <motion.div
                  className="inline"
                  variants={{
                    open: { rotate: 180 },
                    closed: { rotate: 0 },
                  }}
                  transition={{ duration: 0.2 }}
                  style={{ originY: 0.55 }}
                >
                  <svg width="15" height="15" viewBox="0 0 20 20">
                    <path d="M0 7 L 20 7 L 10 16" />
                  </svg>
                </motion.div>
              </motion.button>
              <motion.ul
                className="h-menuHeight bg-gradient-to-b from-test1 via-test2 to-test3 flex flex-col gap-5"
                variants={{
                  open: {
                    clipPath: "inset(0% 0% 0% 0% round 10px)",
                    transition: {
                      type: "spring",
                      bounce: 0,
                      duration: 0.7,
                      delayChildren: 0.3,
                      staggerChildren: 0.05,
                    },
                  },
                  closed: {
                    clipPath: "inset(10% 50% 90% 50% round 10px)",
                    transition: {
                      type: "spring",
                      bounce: 0,
                      duration: 0.3,
                    },
                  },
                }}
                style={{ pointerEvents: isOpen ? "auto" : "none" }}
              >
                <li className="block ml-2.5 mt-4">
                  <motion.button
                    onClick={handleTimeDay}
                    variants={itemVariants}
                  >
                    Day
                  </motion.button>
                </li>
                <li className="block ml-2.5">
                  <motion.button
                    onClick={handleTimeWeek}
                    variants={itemVariants}
                  >
                    Week
                  </motion.button>
                </li>
                <li className="block ml-2.5">
                  <motion.button
                    onClick={handleTimeMonth}
                    variants={itemVariants}
                  >
                    Month
                  </motion.button>
                </li>
                <li className="block ml-2.5">
                  <motion.button
                    onClick={handleTimeYear}
                    variants={itemVariants}
                  >
                    Year
                  </motion.button>
                </li>
                <li className="block ml-2.5">
                  <motion.button
                    onClick={handleTimeAll}
                    variants={itemVariants}
                  >
                    All
                  </motion.button>
                </li>
                <li className="block ml-2.5">
                  <motion.button
                    onClick={() => {
                      setShowModal(true);
                    }}
                    variants={itemVariants}
                  >
                    Interval
                  </motion.button>
                </li>
              </motion.ul>
            </motion.nav>
          </div>
          <div className="row-span-2">
            <div className="ml-12 py-2 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <p className="ml-2 mb-3 pt-2 font-normal ">
                <label>Total Money Earned: </label>{" "}
                <label className="text-[color:green]">
                  ${moneyEarnedTotal}
                </label>
              </p>
              <p className="ml-2 font-normal mb-2">
                <label>Total Money Spent: </label>{" "}
                <label className="text-[color:red]">${totalSpent}</label>
              </p>
              <hr className="mb-2 bg-black" />
              <p className="ml-2 mb-3 font-normal ">
                <label>Total Money Balance: </label>{" "}
                <label className={color}>
                  {negative}${totalBalance}
                </label>
              </p>
            </div>
          </div>

          <div className="row-span-2 col-span-2 mt-2.5 mb-2.5">
            <div className="mb-2.5">
              <h4 className="text-2xl font-bold">
                {dayOne} - {dayTwo}
              </h4>
            </div>

            <Doughnut data={data} />
          </div>

          <div className="row-span-2 col-span-2 mt-4">
            <h4 className="text-2xl font-bold mb-2.5">
              Monthly earnings for {today.getFullYear()}
            </h4>
            <LineChart />
          </div>
        </div>
      </div>

      <AnimatePresence initial={false} mode="wait">
        {showModal && (
          <MyModal onClose={handleOnClose} visible={showModal}>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Dates
              </label>
              <DateRangePicker
                format="MM/dd/yyyy"
                character=" – "
                value={dateRange}
                onChange={setDateRange}
              />
            </div>
            <div className="mt-5 flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={handleTimeInterval}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
          </MyModal>
        )}
      </AnimatePresence>
    </section>
  );
}

export default AnalyticsPage;

/*
  <div className="w-full h-screen grid grid-rows-4 grid-flow-col gap-4">
          <div className="row-span-2 ml-12">
            <motion.nav
              initial={false}
              animate={isOpen ? "open" : "closed"}
              className="h-100 w-80" //check the h-100 to try to make menu height bigger
            >
              <motion.button
                className="bg-purple-500 rounded-xl p-8 text-left w-80 mb-2.5 mt-2.5 flex justify-between items-center"
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsOpen(!isOpen)}
              >
                Menu
                <motion.div
                  className="inline"
                  variants={{
                    open: { rotate: 180 },
                    closed: { rotate: 0 },
                  }}
                  transition={{ duration: 0.2 }}
                  style={{ originY: 0.55 }}
                >
                  <svg width="15" height="15" viewBox="0 0 20 20">
                    <path d="M0 7 L 20 7 L 10 16" />
                  </svg>
                </motion.div>
              </motion.button>
              <motion.ul
                className="h-100 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 flex flex-col gap-2.5"
                variants={{
                  open: {
                    clipPath: "inset(0% 0% 0% 0% round 10px)",
                    transition: {
                      type: "spring",
                      bounce: 0,
                      duration: 0.7,
                      delayChildren: 0.3,
                      staggerChildren: 0.05,
                    },
                  },
                  closed: {
                    clipPath: "inset(10% 50% 90% 50% round 10px)",
                    transition: {
                      type: "spring",
                      bounce: 0,
                      duration: 0.3,
                    },
                  },
                }}
                style={{ pointerEvents: isOpen ? "auto" : "none" }}
              >
                <li className="block m-0 padding-2.5 ml-2.5">
                  <motion.button
                    onClick={handleTimeDay}
                    variants={itemVariants}
                  >
                    Day
                  </motion.button>
                </li>
                <li className="block m-0 padding-2.5 ml-2.5">
                  <motion.button
                    onClick={handleTimeWeek}
                    variants={itemVariants}
                  >
                    Week
                  </motion.button>
                </li>
                <li className="block m-0 padding-2.5 ml-2.5">
                  <motion.button
                    onClick={handleTimeMonth}
                    variants={itemVariants}
                  >
                    Month
                  </motion.button>
                </li>
                <li className="block m-0 padding-2.5 ml-2.5">
                  <motion.button
                    onClick={handleTimeYear}
                    variants={itemVariants}
                  >
                    Year
                  </motion.button>
                </li>
                <li className="block m-0 padding-2.5 ml-2.5">
                  <motion.button
                    onClick={handleTimeAll}
                    variants={itemVariants}
                  >
                    All
                  </motion.button>
                </li>
                <li className="block m-0 padding-2.5 ml-2.5">
                  <motion.button
                    onClick={() => {
                      setShowModal(true);
                    }}
                    variants={itemVariants}
                  >
                    Interval
                  </motion.button>
                </li>
              </motion.ul>
            </motion.nav>
          </div>
          <div className="row-span-2">
            <div className="ml-12 py-2 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <p className="ml-2 mb-3 pt-2 font-normal ">
                <label>Total Money Earned: </label>{" "}
                <label className="text-[color:green]">
                  ${moneyEarnedTotal}
                </label>
              </p>
              <p className="ml-2 font-normal mb-2">
                <label>Total Money Spent: </label>{" "}
                <label className="text-[color:red]">${totalSpent}</label>
              </p>
              <hr className="mb-2 bg-black" />
              <p className="ml-2 mb-3 font-normal ">
                <label>Total Money Balance: </label>{" "}
                <label className={color}>
                  {negative}${totalBalance}
                </label>
              </p>
            </div>
          </div>

          <div className="row-span-2 col-span-2">
            <div className="flex items-center justify-center mt-2.5">
              <h4 className="text-2xl font-bold">
                {dayOne} - {dayTwo}
              </h4>
            </div>
            <div className="flex items-center justify-center h-full">
              <Doughnut data={data} />
            </div>
          </div>
          <div className="row-span-2 col-span-2">
            <div className="flex items-center justify-center mt-10">
              <h4 className="text-2xl font-bold">Earnings for the year</h4>
            </div>
            <div className="flex items-center justify-center h-full">
              <LineChart />
            </div>
          </div>
        </div>
*/

/*
<div className="w-full h-screen grid grid-rows-3 grid-flow-col gap-4">
          <div className="row-span-2">01</div>
          <div className="row-span-1">temp</div>
          <div className="row-span-2 col-span-2">02</div>
          <div className="col-span-2">03</div>
        </div>
*/

/*
<DateRangePicker
              format="MM/dd/yyyy"
              character=" – "
              value={dateRange}
              onChange={setDateRange}
            />



<div className="flex items-center justify-center relative max-h-md max-w-md">
              <Doughnut data={data} />
            </div>
*/
