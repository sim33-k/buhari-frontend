import type { OrderItem } from "@/types/Common";
import ItemCardList from "./Order Panel/ItemCardList";
import Summary from "./Order Panel/Summary";

interface OrderPanelProps {
  orderItem: OrderItem[];
  updateQuantity: (id: number, value: number) => void;
  removeFromOrder: (id: number) => void;
  clearOrder: () => void;
  setAlertState: React.Dispatch<React.SetStateAction<{
    show: boolean;
    type: string;
    message: string;
    title: string;
  }>>;
}

  const backendURL = import.meta.env.BACKEND_URL || `http://localhost:3000`;

const OrderPanel = ({orderItem, updateQuantity, removeFromOrder, clearOrder, setAlertState }:OrderPanelProps) =>{

  const getTotal = () => {
    const total = orderItem.reduce((acc, item) => {
      return acc + (parseFloat(item.price) * item.quantity);
    }, 0)

    return total;
  }

  // console.log(getTotal);

  const createOrder = async () => {
    // console.log("test ordr");
    // the backend endpoint is for localhost:3000/orders
    // it expects the menu card id and the quantity
    // the format we created is like this

      // {
      //   "menuId": 4,
      //   "quantity": 1
      // }

    // so we have to map the data from the item object
    // i made a mistake naming it as orderItem instead of orderItems

    try {
      const data = {
        // backend expects the data with item
        items: orderItem.map(item => ({
          menuId: item.id,
          quantity: item.quantity
        }))
      }

      // console.log(data);
      const response = await fetch(`${backendURL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if(response.ok) {
        const result = await response.json();
        console.log(result);

        setAlertState({
          show: true,
          type: 'success',
          message: 'Order created successfully!',
          title: 'Order Created'
        });

        clearOrder();
      } else {
        // failed state we trigger the catch
        throw new Error('Order not made!');
      }

    } catch(error) {
      // console.error(error);
      setAlertState({
        show: true,
        type: 'error',
        message: 'Order not created, please try again later.',
        title: 'Order Failed'
      });
    }
  }



  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-semibold border-b border-border pb-2 mb-4">
        Current Order
      </h2>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        <ItemCardList items={orderItem} updateQuantity={updateQuantity} removeFromOrder={removeFromOrder} />
      </div>

      <div>
        <Summary total={getTotal()} clearOrder={clearOrder} createOrder={createOrder} itemCount={orderItem.length} setAlertState={setAlertState} orderItem={orderItem} />
      </div>
    </div>
  );
};

export default OrderPanel;
