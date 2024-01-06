import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";

function Nav() {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };
  const content = (
    <>
      <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-green4 transition">
        <ul className="text-center text-xl p-20">
          <Link to="/login">
            <li className="my-4 py-4 border-b border-gray1 hover:bg-green1 hover:rounded">
              Login
            </li>
          </Link>
          <Link to="/register">
            <li className="my-4 py-4 border-b border-gray1 hover:bg-green1 hover:rounded">
              Register
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
  return (
    <nav className="bg-green3">
      <div className="h-10vh flex justify-between z-50 text-gray1 lg:py-5 px-20 py-4">
        <div className="flex items-center flex-1">
          <Link className="text-4x1 font-bold" to="/">
            Money Tracker
          </Link>
        </div>
        <div className="lg:flex md:flex lg:flex-1 items center justify-end font-normal hidden">
          <div className="flex-10">
            <ul className="flex gap-8 mr-16 text-[18px]">
              <Link to="/login">
                <li className="hover:text-green1 transition border-b-2 border-gray1 hover:border-green1 cursor-pointer">
                  Login
                </li>
              </Link>
              <Link to="/register">
                <li className="hover:text-green1 transition border-b-2 border-gray1 hover:border-green1 cursor-pointer">
                  Register
                </li>
              </Link>
            </ul>
          </div>
        </div>

        <div>{click && content}</div>

        <button className="block sm:hidden transition" onClick={handleClick}>
          {click ? <FaTimes /> : <CiMenuFries />}
        </button>
      </div>
    </nav>
  );
}

export default Nav;
