import { Button } from '../ui/button'
import { Plus, Trash2, Minus } from 'lucide-react'
import type { MenuItem } from '@/types/Common'

interface ItemCardListProps {
  items: MenuItem[];
  updateQuantity: (id: number, value: number) => void;
  removeFromOrder: (id: number) => void;
}

const ItemCard = ({item, updateQuantity, removeFromOrder}) => {
  return (
    <div className='border border-border rounded-lg p-3 bg-background'>
        <div className='flex justify-between items-start mb-2'>
            <div>
                <h3 className="font-medium">{item.name}</h3>
            </div>
            <div>
                <Button onClick={() => removeFromOrder(item.id)} variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
        <div className='flex items-center gap-2'>
            <div>
                <Button onClick={() => updateQuantity(item.id, item.quantity + 1)} variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive">
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
            <div className='w-12 text-center font-medium'>
                {item.quantity}
            </div>
            <div>
                <Button onClick={() => updateQuantity(item.id, item.quantity - 1)} variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive">
                    <Minus className="h-4 w-4" />
                </Button>
            </div>
            <div className='ml-auto font-medium'>
                Rs. {item.price * item.quantity}
            </div>

        </div>
      
    </div>
  )
}

export default ItemCard
