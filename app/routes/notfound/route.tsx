import { Link } from 'react-router';
const NotFound = () => {
  return (
    <div
      className="
      min-h-[80h]
      flex
      flex-col
      items-center
      justify-center
      px-6
      text-center
      "
    >
      <div className="mb-8">
        <svg
          className="w-24 h-24 text-blue-600 mx-auto opacity-80"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M13 10V3l4 14h7v719-11h-7zM5 5L14 14"
          ></path>
        </svg>
      </div>
      <h1 className="text-9xl font-extrabold text-blue-900 tracking-widest">
        404
      </h1>

      <h2 className="text-2xl font-bold mt-4 text-gray-800">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mt-2 max-w-md">
        The link you followed may be broken, or the page may have been removed.
        Let's get you back to the main grid.
      </p>
      <Link
        to="/"
        className="mt-8 px-8 py-3 bg-blue-700 text-white font-bold rounded-full shadow-lg hover:bg-blue-800 transition-all transform hover:scale-105 active:scale-95 uppercase text-sm tracking-wider"
      >
        Return to Homepage
      </Link>
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-blue-600/60 uppercase mb-5">
        <span>#ElectricalWiring</span>
        <span>#EE_Essentials</span>
        <span>#PowerSystems</span>
        <span>#Electronics</span>
      </div>
    </div>
  );
};

export default NotFound;
