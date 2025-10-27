import MenuPanel from '@/components/MenuPanel'
import OrderPanel from '@/components/OrderPanel'
import type { MenuItem, OrderItem } from '@/types/Common'
import { useState } from 'react'
import { AlertComponent } from '@/components/AlertComponent'
import { useEffect } from 'react'

const MenuOrder = () => {

  const [orderItem, setOrderItem] = useState<OrderItem[]>([]);
  const [alertState, setAlertState] = useState({show:false, type: 'success', message: 'test msg', title: 'simaak'});


  const addToOrder = (item: MenuItem) => {
    // even though the backend implements the logic expected in the question
    // it is better to avoid the mistakes to happen in the frontend in the first place
    // so Ill be having checks to prevent unwanted behavior

    // check 1: we need to restrict 2 different main dishes to be added because the 
    // questions mentions 'a main dish', but the quantity can be many

    const isMainDish = item.type.name === "Main Dish";
    if (isMainDish) {
      // we need to check if there are any other main dishes in the order
      const mainDishCheck = orderItem.find(x => x.type.name == "Main Dish" && x.id != item.id);

      // if it exists, we need to issue and alert and not proceed further
      if (mainDishCheck) {
        setAlertState({show: true, type: 'error', title: 'Cannot add this main dish', message: 'Please order main dish of the same type!'});
        return;
      }
    }

    // this is like our cart page, therefore whenever we add new items, if it already exists,
    // we need to increment it

    setOrderItem(prev => {
      const itemIndex = prev.findIndex(orderItem => orderItem.id === item.id);

      // showing the sucess alert

      setAlertState({ show: true, type: 'success', title: 'Added item successfully', message: `The item ${item.name} is added to the order!` });

      // it will be -1 if it doesnt exist
      if (itemIndex > -1) {
        const newItems = [...prev];
        newItems[itemIndex].quantity++;
        return newItems;
      } else {
        // if it doesnt exist, then its a brand new entry

        return [...prev, { ...item, quantity: 1 }];
      }
    })

  }

  const updateQuantity = (id: number, value: number) => {
    if (value <= 0) {
      removeFromOrder(id);
    } else {
      setOrderItem(prev => (
        prev.map(item => {
          if (item.id === id) {
            return { ...item, quantity: value }
          } else {
            return item;
          }
        })
      ))
    }
  }

  const removeFromOrder = (id: number) => {
    setOrderItem(prev => prev.filter(item => item.id !== id));
  };

  const clearOrder = () => {
    setOrderItem([]);
  };


  // clean up logic for the alert

  useEffect(() => {
    if (alertState.show) {
      const timer = setTimeout(() => {
        setAlertState(prev => ({ ...prev, show: false }))
      }, 2000);
      // clean up
      return () => clearTimeout(timer);
    }
  })


  return (
    <div>
      {/* alert logic */}
      <div>
        {alertState.show ? <AlertComponent type={alertState.type} message={alertState.message} title={alertState.title} /> : null}
      </div>
      <div className='flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-8rem)]'>
        <div className='lg:w-2/3 border border-border p-4 bg-background  rounded-lg'>
          <MenuPanel addToOrder={addToOrder} />
        </div>
        <div className='lg:w-1/3 border border-border p-4 bg-background  rounded-lg'>
          <OrderPanel orderItem={orderItem} updateQuantity={updateQuantity} removeFromOrder={removeFromOrder} clearOrder={clearOrder} setAlertState={setAlertState} />
        </div>
      </div>
    </div>
  )
}

export default MenuOrder
