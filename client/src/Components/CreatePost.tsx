import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import ItemCards from "./ItemCards";

type TItem = {
  name: string;
  _id: string;
  price: number;
  category: string;
};

function CreatePost() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Food");
  const [items, setItems] = useState<TItem[]>([]);

  async function handleCreateItem(e: React.FormEvent) {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/postItem", {
      method: "POST",
      body: JSON.stringify({
        name,
        price,
        category,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    //allows items to refresh on screen after adding without having to reload page
    const item = await response.json();
    setItems([...items, item]);
    setName("");
    setPrice("");
    setCategory("Food");
  }

  useEffect(() => {
    async function fetchItems() {
      const response = await fetch("http://localhost:5000/getItem");
      const newItems = await response.json();
      setItems(newItems);
    }
    fetchItems();
  }, []);

  async function handleDeleteItem(itemId: string) {
    await fetch(`http://localhost:5000/deleteItem/${itemId}`, {
      method: "DELETE",
    });
    //allows items to refresh on screen after deleting without having to reload page
    setItems(items.filter((item) => item._id !== itemId));
  }

  return (
    <div className="relative w-full h-screen mx-auto">
      <div className="mt-8 ml-10 grid lg:grid-cols-4 gap-10">
        {items.map((items) => (
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                className="rounded-t-lg"
                src="/docs/images/blog/image-1.jpg"
                alt=""
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {items.name}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                ${items.price}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {items.category}
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
          </div>
        ))}
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

            <div className="px-10">
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
              </select>
            </div>

            <div className="pb-5 flex flex-row justify-center items-center">
              <button className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
