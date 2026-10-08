import React from 'react'

const ProductDeitalsPage = async ({params}) => {
  const {productId} = await params
  const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products/${productId}`)
  const data = await res.json()
  console.log(data)
  return (
    <div>
      <h1>ProductDeitalsPage</h1>
    </div>
  )
}

export default ProductDeitalsPage
