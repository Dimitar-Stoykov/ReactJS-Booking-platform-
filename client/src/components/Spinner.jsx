const Spinner = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800 bg-opacity-50">
            <div className="w-16 h-16 border-4 border-t-4 border-blue-600 border-solid rounded-full animate-spin">
                <div className="w-full h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
        </div>
    );
};

export default Spinner;
