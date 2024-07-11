import OrderSection from "./OrderSection";

interface OrderFormProps {
  orderType: "Limit" | "Market";
}

const OrderForm: React.FC<OrderFormProps> = ({ orderType }) => (
  <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-800 p-4">
    <OrderSection type="Buy" color="bg-green-500" orderType={orderType} />
    <OrderSection type="Sell" color="bg-red-500" orderType={orderType} />
  </div>
);

export default OrderForm;
