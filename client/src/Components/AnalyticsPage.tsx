import Nav from "./Nav";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { motion, Variants } from "framer-motion";
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

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

function AnalyticsPage() {
  const [items, setItems] = useState<TItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

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
  }

  async function handleTimeWeek(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/getItemWeek", {
      credentials: "include",
    });
    const newItems = await response.json();
    console.log(newItems);
    setItems(newItems);
  }

  async function handleTimeMonth(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/getItemMonth", {
      credentials: "include",
    });
    const newItems = await response.json();
    console.log(newItems);
    setItems(newItems);
  }

  async function handleTimeYear(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/getItemYear", {
      credentials: "include",
    });
    const newItems = await response.json();
    console.log(newItems);
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
      "Money Earned",
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
          moneyEarnedTotal,
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
          "black",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {};

  return (
    <section className="relative w-full h-screen mx-auto">
      <div className="bg-background1 bg-cover bg-no-repeat bg-center">
        <Nav />
        <div className="w-full h-screen grid grid-cols-2">
          <div>
            <motion.nav
              initial={false}
              animate={isOpen ? "open" : "closed"}
              className="w-80"
            >
              <motion.button
                className="bg-purple-500 rounded-xl p-8 text-left w-80 mb-2.5 flex justify-between items-center"
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
                className="bg-purple-500 flex flex-col gap-2.5"
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
                <li className="bg-purple-500 block m-0 padding-2.5 ml-2.5">
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
                  <motion.button variants={itemVariants}>
                    Interval
                  </motion.button>
                </li>
              </motion.ul>
            </motion.nav>
          </div>
          <div className="col-span-1">
            <Doughnut
              data={data}
              options={options}
              className="max-w-lg max-h-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AnalyticsPage;

/*
  <section className="relative w-full h-screen mx-auto">
      <div className="bg-background1 bg-cover bg-no-repeat bg-center">
        <Nav />

        <div>
          {items.map((items) => (
            <div>
              <label>{items.category}</label>
              <label> {items.name}</label>
              <label> {items.price}</label>
            </div>
          ))}
        </div>

        <div className="mt-40">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            testttt
          </h1>
        </div>

        <div className="mt-5 flex flex-row justify-center items-center">
          <div className="">
            <Doughnut data={data} options={options} />
          </div>
        </div>
      </div>
    </section>
*/
