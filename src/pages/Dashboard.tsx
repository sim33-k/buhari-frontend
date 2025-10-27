import React, { useEffect, useState } from 'react'
import { SectionCards } from '@/components/section-cards'
import TableRoundedCornerDemo from '@/components/shadcn-studio/table/table-03';
import { ChartAreaInteractive } from '@/components/chart-area-interactive';

const Dashboard = () => {

  // stats for
  // Daily sales revenue
  // Most Famous Main Dish
  // Most Famous Side Dish
  // Most Famous Dessert (it wasnt asked in the question)

  const [stats, setStats] = useState<{
    dailySalesRevenue: number,
    famousMainDish: string,
    famousSideDish: string,
    famousDessert: string,
    sideDishCombinations: Array<{
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
    }>
  }>({
    dailySalesRevenue: 0,
    famousMainDish: '',
    famousSideDish: '',
    famousDessert: '',
    sideDishCombinations: []
  });

  const backendURL = import.meta.env.BACKEND_URL || `http://localhost:3000`;

  useEffect(() => {

    const response = async () => {
      // for daily sales
      const today = new Date().toISOString().split('T')[0];
      // {"success":true,"data":{"_sum":{"total":"1445"}}}
      const salesResponse = await (await fetch(`${backendURL}/reports/daily-sales-revenue?date=${today}`)).json();
      // {"success":true,"data":{"name":"Rotty","totalQuantity":5}}
      const mainDishResponse = await (await fetch(`${backendURL}/reports/famous-main-dish`)).json();
      // {"success":true,"data":{"name":"Wadai","totalQuantity":6}}
      const sideDishResponse = await (await fetch(`${backendURL}/reports/famous-side-dish`)).json();
      // {"success":true,"data":{"name":"Watalappam","totalQuantity":2}}
      const dessertResponse = await (await fetch(`${backendURL}/reports/famous-dessert`)).json();

      const combResponse = await (await fetch(`${backendURL}/reports/side-dish-combinations`)).json();
      console.log(combResponse);

      setStats({
        dailySalesRevenue: salesResponse.data._sum.total,
        famousMainDish: mainDishResponse.data.name,
        famousSideDish: sideDishResponse.data.name,
        famousDessert: dessertResponse.data.name,
        sideDishCombinations: combResponse.data
      })

    }

    response();

  }, []);

  return (
    <>
      <div className='@container/main py-4 md:py-6'>
        <SectionCards stats={stats} />
      </div>
      <div className='@container/main'>
        <ChartAreaInteractive/>
        <div className="mt-4">
          <TableRoundedCornerDemo data={stats.sideDishCombinations} /> 
        </div>
      </div>
    </>
  )
}


export default Dashboard
