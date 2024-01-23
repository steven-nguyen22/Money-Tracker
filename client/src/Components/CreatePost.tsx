import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import Pagination from "./Pagination";
import { format } from "date-fns";
import { IoFastFoodOutline } from "react-icons/io5";
import { GiClothes } from "react-icons/gi";
import { FaTheaterMasks } from "react-icons/fa";
import { GiHouse } from "react-icons/gi";
import { GiCommercialAirplane } from "react-icons/gi";
import { FaBriefcaseMedical } from "react-icons/fa6";
import { RiNetflixFill } from "react-icons/ri";
import { MdMiscellaneousServices } from "react-icons/md";
import { FcMoneyTransfer } from "react-icons/fc";
import Nav from "./Nav";
import { motion } from "framer-motion";

type TItem = {
  name: string;
  _id: string;
  price: number;
  category: string;
  author: string;
  authorName: string;
  createdAt: string;
  date: string;
};

function CreatePost() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Food");
  let [date, setDate] = useState("");
  const [items, setItems] = useState<TItem[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  async function handleCreateItem(e: React.FormEvent) {
    e.preventDefault();
    date = date + "T12:00:00.000+00:00";
    await fetch("https://budgetfy.onrender.com/postItem", {
      method: "POST",
      body: JSON.stringify({
        name,
        price,
        category,
        date,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    //allows items to refresh on screen with pagination
    async function fetchItems() {
      const response = await fetch("https://budgetfy.onrender.com/getItem", {
        credentials: "include",
      });
      const newItems = await response.json();
      setItems(newItems);
    }
    fetchItems();
    //allows items to refresh on screen after adding without having to reload page
    //const item = await response.json();
    //setItems([...items, item]);
    setName("");
    setPrice("");
    setCategory("Food");
  }

  useEffect(() => {
    async function fetchItems() {
      const response = await fetch("https://budgetfy.onrender.com/getItem", {
        credentials: "include",
      });
      const newItems = await response.json();
      setItems(newItems);
    }
    fetchItems();
  }, []);

  async function handleDeleteItem(itemId: string) {
    await fetch(`https://budgetfy.onrender.com/deleteItem/${itemId}`, {
      method: "DELETE",
    });
    //refreshing items after delete to work with pagination (refetching items)
    async function fetchItems() {
      const response = await fetch("https://budgetfy.onrender.com/getItem", {
        credentials: "include",
      });
      const newItems = await response.json();
      setItems(newItems);
    }
    fetchItems();

    //allows items to refresh on screen after deleting without having to reload page (called optimistic updates)
    //items.filter((item) => item._id !== itemId);
  }

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentItems = items.slice(firstPostIndex, lastPostIndex);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-screen mx-auto"
    >
      <Nav />
      <div className="mt-8 ml-10 grid lg:grid-cols-4 gap-10">
        {currentItems.map((items) => (
          <div className="max-w-sm grid grid-cols-2 gap-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {items.name}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                ${items.price}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {items.category}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {format(new Date(items.date), "MMM d, yyyy")}
              </p>
              <button
                onClick={() => handleDeleteItem(items._id)}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 hover:bg-green-800 rounded-lg focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Delete
                <div className="ml-2">
                  <FaRegTrashCan />
                </div>
              </button>
            </div>
            <div className="col-span-1 h-30 flex items-center justify-center">
              {items.category == "Food" ? (
                <IoFastFoodOutline className="h-24 w-24" />
              ) : null}
              {items.category == "Clothing" ? (
                <GiClothes className="h-24 w-24" />
              ) : null}
              {items.category == "Entertainment" ? (
                <FaTheaterMasks className="h-24 w-24" />
              ) : null}
              {items.category == "Housing" ? (
                <GiHouse className="h-24 w-24" />
              ) : null}
              {items.category == "Travel" ? (
                <GiCommercialAirplane className="h-24 w-24" />
              ) : null}
              {items.category == "Medical" ? (
                <FaBriefcaseMedical className="h-24 w-24" />
              ) : null}
              {items.category == "Subscriptions" ? (
                <RiNetflixFill className="h-24 w-24" />
              ) : null}
              {items.category == "Miscellaneous" ? (
                <MdMiscellaneousServices className="h-24 w-24" />
              ) : null}
              {items.category == "Money Earned" ? (
                <FcMoneyTransfer className="h-24 w-24" />
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <div>
        <Pagination
          totalPosts={items.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>

      <div className="mt-10 flex justify-center items-center">
        <div className="w-50 pt-5 rounded-xl bg-gray-300 bg-clip-border text-gray-700 shadow-xl">
          <form className="max-w-sm mx-auto" onSubmit={handleCreateItem}>
            <div className="flex flex-row justify-center items-center">
              <h5 className="text-2xl font-bold text-gray-900">
                Record your item
              </h5>
            </div>

            <div className="mt-3 mb-5 px-10">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Item Name
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="user-title"
                placeholder="Item Name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div className="mb-5 px-10">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Item Price
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="user-title"
                type="number"
                placeholder="$1,000.00"
                value={price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPrice(e.target.value);
                }}
              />
            </div>

            <div className="mb-5 px-10">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Select a category
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option value="Food">Food</option>
                <option value="Clothing">Clothing</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Housing">Housing</option>
                <option value="Travel">Travel</option>
                <option value="Medical">Medical</option>
                <option value="Subscriptions">Subscriptions</option>
                <option value="Miscellaneous">Miscellaneous</option>
                <option value="Money Earned">Money Earned</option>
              </select>
            </div>

            <div className="px-10">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Date
              </label>
              <input
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setDate(e.target.value);
                }}
              ></input>
            </div>

            <div className="pb-5 flex flex-row justify-center items-center">
              <button className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default CreatePost;
