import React from 'react'
import type { MenuItem } from '@/types/Common'
import ItemCard from './ItemCard'

interface ItemCardListProps {
  items: MenuItem[];
  updateQuantity: (id: number, value: number) => void;
  removeFromOrder: (id: number) => void;
}


const ItemCardList = ({ items, updateQuantity, removeFromOrder }: ItemCardListProps) => {
  return (
    <div className='flex-1 overflow-y-auto space-y-3 mb-4'>
        {items.map(item => (
            <div key={item.id}>
                <ItemCard item={item} updateQuantity={updateQuantity} removeFromOrder={removeFromOrder}/>
            </div>
        ))}
      
    </div>
  )
}

export default ItemCardList
