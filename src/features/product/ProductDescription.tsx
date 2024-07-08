import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../app/store'
import { fetchProductData, selectProductData, selectProductStatus, selectProductError } from './productSlice'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card'

export const ProductDescription: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const productData = useSelector(selectProductData)
  const status = useSelector(selectProductStatus)
  const error = useSelector(selectProductError)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProductData())
    }
  }, [status, dispatch])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>
  }

  if (!productData) {
    return null
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <img src={productData.image} alt={productData.title} className="w-full h-auto mb-4" />
        <CardTitle>{productData.title}</CardTitle>
        <CardDescription>{productData.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-bold mb-2">Brand: {productData.brand}</p>
        <div className="flex flex-wrap gap-2">
          {productData.tags.map((tag, index) => (
            <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
