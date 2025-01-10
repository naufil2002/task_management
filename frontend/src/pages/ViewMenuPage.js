import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewMenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("/menu_data.json");
        setMenu(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu", error);
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10">
      <div className="container mx-auto p-6 max-w-4xl">
        <h1 className="text-3xl font-extrabold text-center text-blue-800 mb-8">
          🍔 Restaurant Menu
        </h1>
        {loading ? (
          <p className="text-center text-lg text-gray-600">Loading...</p>
        ) : menu.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No menu available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menu.map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transform transition hover:-translate-y-1"
              >
                <h2 className="text-xl font-bold text-blue-700 mb-2">
                  {item.name}
                </h2>
                {item.description && (
                  <p className="text-gray-600 text-sm mb-4">
                    {item.description}
                  </p>
                )}
                <p className="text-lg font-semibold text-blue-800">
                  Price: ₹{item.price}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewMenuPage;
