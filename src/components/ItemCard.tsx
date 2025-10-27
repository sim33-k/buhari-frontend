import type { MenuItem } from '@/types/Common'

const ItemCard = ({ item, onClick} : {item: MenuItem, onClick: any}) => {
  return (
    <div onClick={onClick} className="border border-border p-4 bg-background  rounded-lg shadow-sm cursor-pointer
      transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
      <h3 className="font-medium text-lg mb-1">{item.name}</h3>
      <p className=" text-sm mb-3">{item.price}</p>
      <p className="text-xs text-muted-foreground">{item.type.name}</p>
    </div>
  )
}

export default ItemCard
