import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

type SideDishCombination ={
  mainDish: {
    id: number,
    name: string,
    price: number,
    typeId: number
  },
  mostPopularSideDish: {
    name: string,
    totalQuantity: number
  }
}


const TableRoundedCornerDemo = ({ data = [] }: SideDishCombination[]) => {
  return (
    <div className='w-full'>
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-1/2'>Main Dish</TableHead>
              <TableHead className='w-1/2 text-right'>Most Popular Side Dish</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map(match => (
                <TableRow key={match.mainDish.id}>
                  <TableCell className='font-medium'>{match.mainDish.name}</TableCell>
                  <TableCell className='text-right'>{match.mostPopularSideDish.name}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className='text-center text-muted-foreground'>
                  No data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <p className='text-muted-foreground mt-4 text-center text-sm'>Main Dish & Side Dish Combinations</p>
    </div>
  )
}

export default TableRoundedCornerDemo
