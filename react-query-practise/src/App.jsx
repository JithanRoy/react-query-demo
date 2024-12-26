import './App.css'
import ProductList from "./components/product-list.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import AddProduct from "./components/addProduct.jsx";

function App() {

  return (
    <div className='flex m-2'>
      <AddProduct />
      <ProductList />
      <ProductDetails id={1} />
    </div>
  )
}

export default App
