import { useLocation } from "react-router-dom";

const BackendErrorPage = () => {
  const location = useLocation();

  const errorMessage = location.state?.message || "An unexpected error occurred.";

  return (
    <div className="container mx-auto px-6 min-h-screen flex items-center justify-center">
      <div className="p-8 bg-red-100 text-red-700 shadow-lg rounded-lg text-center">
        <h2 className="text-2xl font-bold">Connection Error!</h2>
        <p className="mb-4">{errorMessage}</p>
        <a
          href="/"
          className="inline-block px-8 py-2 bg-red-600 text-white text-lg font-bold rounded-lg hover:bg-red-700 transition"
        >
          Try Again
        </a>
      </div>
    </div>
  );
};

export default BackendErrorPage;
