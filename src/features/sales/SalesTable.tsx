import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../app/store'
import { fetchSalesData, selectSalesData, selectSalesStatus, selectSalesError } from './salesSlice'
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../../components/ui/table'

export const SalesTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const salesData = useSelector(selectSalesData)
  const status = useSelector(selectSalesStatus)
  const error = useSelector(selectSalesError)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSalesData())
    }
  }, [status, dispatch])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Week Ending</TableHead>
          <TableHead>Retail Sales</TableHead>
          <TableHead>Wholesale Sales</TableHead>
          <TableHead>Units Sold</TableHead>
          <TableHead>Retailer Margin</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {salesData.map((sale) => (
          <TableRow key={sale.weekEnding}>
            <TableCell>{sale.weekEnding}</TableCell>
            <TableCell>${sale.retailSales.toLocaleString()}</TableCell>
            <TableCell>${sale.wholesaleSales.toLocaleString()}</TableCell>
            <TableCell>{sale.unitsSold.toLocaleString()}</TableCell>
            <TableCell>${sale.retailerMargin.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
