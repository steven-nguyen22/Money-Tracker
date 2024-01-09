import { useEffect, useState } from "react";
import ItemCards from "./ItemCards";

type TItem = {
  name: string;
  _id: string;
  price: string;
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
    <div className="">
      <div>
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
                {items.price}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {items.category}
              </p>
              <button
                onClick={() => handleDeleteItem(items._id)}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green4 rounded-lg hover:bg-green1 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Delete
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleCreateItem}>
        <label htmlFor="user-title">Post your Item</label>
        <input
          id="user-title"
          placeholder="Item Name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
        />
        <input
          id="user-title"
          placeholder="Price"
          value={price}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPrice(e.target.value);
          }}
        />
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
        </select>
        <button>Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
