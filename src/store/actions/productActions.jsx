import axios from "axios";
import { toast } from "react-toastify";
import { addProduct } from "../reducers/productSlice";

export const asyncAddProduct = () => async (dispatch) => {
  try {
    const data = localStorage.getItem("products");
    if (data) {
      dispatch(addProduct(JSON.parse(data)));
    } else {
      const response = await axios.get("https://fakestoreapi.com/products");
      const fetchedData = response.data;

      dispatch(addProduct(fetchedData));
      localStorage.setItem("products", JSON.stringify(fetchedData));
    }
  } catch (error) {
    toast.error("Failed to fetch data");
    console.error("Failed to fetch data:", error);
  }
};
