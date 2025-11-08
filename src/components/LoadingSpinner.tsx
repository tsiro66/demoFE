const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center w-full min-h-[60vh]">
            <div 
                className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"
                role="status"
                aria-label="Loading..."
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
      );
}
 
export default LoadingSpinner;