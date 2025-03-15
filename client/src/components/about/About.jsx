export default function About() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-200 to-indigo-500 flex items-center justify-center p-6">
        <div className="max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl duration-300 m-10">
          <div className="p-10 space-y-10">
            <h1 className="text-5xl font-extrabold text-indigo-700 tracking-tight mb-6 animate__animated animate__fadeInUp">
              Welcome to <span className="text-blue-600">BookEase</span>
            </h1>
            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              Discover seamless and efficient bookings for every occasion. Whether it's a vacation, dinner reservation, or event tickets, BookEase brings you the convenience you deserve.
            </p>
  
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-blue-600 mb-2 tracking-wide">Why Choose Us?</h2>
              <ul className="space-y-4 text-gray-700 text-lg">
                <li className="flex items-center space-x-3">
                  <span className="text-green-600">✔</span>
                  <span>Simple, intuitive booking experience</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-600">✔</span>
                  <span>Secure and trusted payment system</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-600">✔</span>
                  <span>24/7 customer support available</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-600">✔</span>
                  <span>Exclusive deals and special discounts</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-600">✔</span>
                  <span>Thousands of happy and loyal users</span>
                </li>
              </ul>
            </div>
  
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-blue-600 mb-2 tracking-wide">Our Mission</h2>
              <p className="text-lg text-gray-800 leading-relaxed">
                At BookEase, we aim to make your booking process as simple and pleasant as possible. We prioritize user experience, offering a secure platform with innovative features to ensure your journey with us is smooth and hassle-free.
              </p>
            </div>
  
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-blue-600 mb-2 tracking-wide">Get in Touch</h2>
              <p className="text-lg text-gray-800">
                Have questions or need assistance? Feel free to reach out to us at <span className="font-semibold text-indigo-600">support@bookease.com</span> and we’ll be happy to help!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  