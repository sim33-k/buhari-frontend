import { Button } from '../ui/button';
import { ConfirmOrderDialog } from './ConfirmOrderDialog';
import type { OrderItem } from '@/types/Common';

interface SummaryProps {
  createOrder: () => void;
  clearOrder: () => void;
  total: number;
  itemCount: number;
  orderItem: OrderItem[];
  setAlertState: React.Dispatch<React.SetStateAction<{
    show: boolean;
    type: string;
    message: string;
    title: string;
  }>>;
}

const Summary = ({total, createOrder, clearOrder, itemCount, setAlertState, orderItem}: SummaryProps) => {

  const validateOrder = () => {
    if (itemCount === 0) {
      setAlertState({
        show: true,
        type: 'error',
        message: 'Cannot create an empty order!',
        title: 'Empty Order'
      });
      return false;
    }

    const hasMainDish = orderItem.some(item => item.type.name === "Main Dish");
    const hasSideDish = orderItem.some(item => item.type.name === "Side Dish");

    // we do not need checks for quantity because in the frotnend order item logic,
    // item will be deleted from the array if the quantity becomes zero
    // The questions asks for main dish of one type, quantity can be many

    if (!hasMainDish) {
      setAlertState({
        show: true,
        type: 'error',
        message: 'Your order must include at least one main dish.',
        title: 'Missing Main Dish'
      });
      return false;
    }

    // having a side dish of one type is enough because the question states one or more

    if (!hasSideDish) {
      setAlertState({
        show: true,
        type: 'error',
        message: 'Your order must include at least one side dish.',
        title: 'Missing Side Dish'
      });
      return false;
    }

    return true;
  };

  const handleCreateOrderClick = () => {
    validateOrder();
  };

  const handleConfirmOrder = () => {
    if (validateOrder()) {
      createOrder();
    }
  };

  return (

    <div className="border-t border-border pt-4 space-y-3">
      <div className="flex justify-between items-center text-lg font-semibold">
        <span>Total:</span>
        <span>Rs. {total}</span>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={clearOrder}
          className="flex-1"
        >
          Clear Order
        </Button>
        {itemCount === 0 ? (
          <Button
            className="flex-1"
            onClick={handleCreateOrderClick}
          >
            Create Order
          </Button>
        ) : (
          <ConfirmOrderDialog
            onConfirm={handleConfirmOrder}
            total={total}
            itemCount={itemCount}
          />
        )}
      </div>
    </div>
  )
}

export default Summary
