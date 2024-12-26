import {useQuery} from "@tanstack/react-query";
import api from "../api/api.js";


const fetchProductDetails = async ({queryKey}) => {
  const productDetails = await api.get(`/${queryKey[0]}/${queryKey[1]}`);
  return productDetails.data
}

const ProductDetails = ({id}) => {
  const {data: product, error, isLoading} =useQuery({
    queryKey: ['products', id],
    queryFn: fetchProductDetails,
  })

  console.log(product);
  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className='w-1/5'>
      <h1 className="text-3xl my-2">Product Details</h1>
      <div className='border bg-gray-100 p-1 text-md rounded flex flex-col'>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="object-cover h-24 w-24 border rounded-full m-auto"/>
        <p>{product.title}</p>
        <p>{product.description}</p>
        <p>USD {product.price}</p>
        <p>{product.rating}/5</p>
      </div>
    </div>
  )
}

export default ProductDetails;