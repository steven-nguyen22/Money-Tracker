import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Smaller budgets need smarter dollars
          </h2>
          <p className="mb-4">
            Sign up, manage, and analyze your current spendings to help keep up
            with your finances.
          </p>
          <p>
            This budgeting app allows for a simple and quick way to remember the
            items you bought throughout the course of a month.
          </p>
          <Link to="/register">
            <button className="mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              Get Started
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <img
            className="w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
            alt="office content 1"
          />
          <img
            className="mt-4 w-full lg:mt-10 rounded-lg"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
            alt="office content 2"
          />
        </div>
      </div>
    </section>
  );
}

export default WelcomePage;

/* 
    <section className="relative w-full h-screen mx-auto">
      <div className="bg-gray1">
        <h1>Smaller budgets need smarter dollars</h1>
        <p>
          Sign up, manage, and analyze your current spendings to help keep up
          with your finances
        </p>
        <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Get Started
        </button>
      </div>
    </section>
*/
