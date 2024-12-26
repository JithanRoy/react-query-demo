import {useQuery} from "@tanstack/react-query";
import api from "../api/api";
import {useState} from "react";

const fetchProducts = async ({queryKey}) => {
   try {
     const res = await api.get(`/products?_page=${queryKey[1].page}&_per_page=6}`);
     return res.data;
   } catch (error) {
     return error.message;
   }
}

const ProductList=()=> {
  const [page, setPage] = useState(1);
 const {data: products, error, isLoading} = useQuery({
    queryKey: ['products', {page}],
    queryFn: fetchProducts,
  })

  if (isLoading) return <p>Loading...</p>
  if(error) return <p>Error: {error.message}</p>

  return (
    <div className='flex flex-col justify-center items-center w-3/5'>
      <h2 className='text-3xl my-2'>Product List</h2>
      <ul className='flex flex-wrap justify-center items-center'>
        {products.data && products.data.map((product) => (
          <li className='flex flex-col items-center m-2 border rounded-sm' key={product.id}>
            <img src={product.thumbnail} alt={product.title} className='object-cover h-64 w-64 rounded-sm'/>
            <p className='text-xl my-3'>{product.title}</p>
          </li>
        ),)}
      </ul>
      <div className='flex'>
        {
          products.prev && (
            <button
              className='p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm'
              onClick={() => setPage(products.prev)}> Prev </button>
          )
        }
        {
          products.next && (
            <button
              className='p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm'
              onClick={() => setPage(products.next)}> Next </button>
          )
        }

      </div>
    </div>
  )
}

export default ProductList;