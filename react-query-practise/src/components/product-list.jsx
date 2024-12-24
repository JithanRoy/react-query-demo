import {useQuery} from "@tanstack/react-query";
import api from "../api/api";

const fetchProducts = async ({queryKey}) => {
  console.log(queryKey);
   try {
     const res = await api.get(`/${queryKey[0]}`);
     return res.data;
   } catch (error) {
     return error.message;
   }
}

const ProductList=()=> {
 const {data: products, error, isLoading} = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  if (isLoading) return <p>Loading...</p>
  if(error) return <p>Error: {error.message}</p>

  return (
    <div className='flex flex-col justify-center items-center w-3/5'>
      <h2 className='text-3xl my-2'>Product List</h2>
      <ul className='flex flex-wrap justify-center items-center'>
        {products && products.map((product) => (
          <li className='flex flex-col items-center m-2 border rounded-sm' key={product.key}>
            <img src={product.thumbnail} alt={product.title} className='object-cover h-64 w-64 rounded-sm'/>
            <p className='text-xl my-3'>{product.title}</p>
          </li>
        ),)}
      </ul>
    </div>
  )
}

export default ProductList;