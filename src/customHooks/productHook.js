import { useEffect, useState } from "react";
import axios from "axios";

function useProductList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productCount,setproductCount]=useState(0)

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(
          "https://ecommerce-nac-backend.onrender.com/product/get-product"
        );
        setData(result.data);
        setproductCount(result.data.length)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); 
      }
    };

    getData();
  }, []);

  return {
    data,
    loading,
    setData,
    setLoading,
    productCount
  };
}

export default useProductList;
