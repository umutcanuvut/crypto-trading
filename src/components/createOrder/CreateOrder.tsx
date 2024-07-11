import React, { useState } from "react";
import OrderForm from "./OrderForm";

const CreateOrder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Limit" | "Market">("Limit");

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-md">
      <div className="mb-4 flex">
        <button
          className={`mr-2 px-4 py-2 ${
            activeTab === "Limit"
              ? "bg-blue-500 text-white"
              : "bg-gray-700 text-gray-400"
          } rounded`}
          onClick={() => setActiveTab("Limit")}
        >
          Limit
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "Market"
              ? "bg-blue-500 text-white"
              : "bg-gray-700 text-gray-400"
          } rounded`}
          onClick={() => setActiveTab("Market")}
        >
          Market
        </button>
      </div>
      <div className="rounded-lg bg-gray-700 p-4">
        <OrderForm orderType={activeTab} />
      </div>
    </div>
  );
};

export default CreateOrder;
