const Spinner = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 bg-gradient-to-br from-teal-100 to-blue-500 p-6">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-600 border-solid rounded-full animate-spin">
            <div className="w-full h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
        </div>
        <p className="mt-4 text-xl text-white font-semibold">Loading...</p>
    </div>
    
            
    );
};

export default Spinner;
