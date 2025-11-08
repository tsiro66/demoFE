import { Link } from "react-router-dom";

const NotFound = () => {
    return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 text-center px-6">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg mx-auto">
        
        <span className="text-6xl font-extrabold text-indigo-600">404</span>
        
        <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
  
        <Link
          to="/"
          className="w-full inline-block px-8 py-3 bg-indigo-600 text-white text-lg font-bold rounded-4xl hover:bg-indigo-700 transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
 
export default NotFound;