import { useEffect, useState } from "react";
import ItemCards from "./ItemCards";

function CreatePost() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Food");

  async function handleCreateUser(e: React.FormEvent) {
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
    if (response.status === 200) {
      alert("Item posted successful");
    } else {
      alert("Please enter all fields");
    }
  }

  return (
    <div className="">
      <div>
        <ItemCards />
      </div>
      <form onSubmit={handleCreateUser}>
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
