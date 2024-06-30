import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { asyncAddProduct } from "../store/actions/productActions";
import { toast } from "react-toastify";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
  const product = products && products.find((p) => p.id == id);

  const [image, setimage] = useState(product.image);
  const [title, settitle] = useState(product.title);
  const [category, setcategory] = useState(product.category);
  const [price, setprice] = useState(product.price);
  const [description, setdescription] = useState(product.description);

  const updateHandler = (e) => {
    e.preventDefault();

    if (
      product.title.trim().length < 5 ||
      product.image.trim().length < 5 ||
      product.category.trim().length < 5 ||
      product.price.trim().length < 1 ||
      product.description.trim().length < 5
    ) {
      alert("Each and every input must have atleast 4 characters");
      return;
    }

    const updateproduct = {
      id: product.id,
      image,
      title,
      category,
      price,
      description,
    };

    const copyProduct = [...products];
    const productIndex = products.findIndex((p) => p.id == id);
    copyProduct[productIndex] = updateproduct;

    localStorage.setItem("products", JSON.stringify(copyProduct));
    dispatch(asyncAddProduct());
    toast.success("Product Updated Successfully!");
    navigate("/");
  };

  return product ? (
    <form
      onSubmit={updateHandler}
      className="flex flex-col items-center p-[5%] w-screen h-screen"
    >
      <h1 className="mb-5 w-1/2 text-3xl">Edit Product</h1>
      <input
        type="url"
        placeholder="image link"
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        name="image"
        onChange={(e) => setimage(e.target.value)}
        value={image}
      />
      <input
        type="text"
        placeholder="title"
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        name="title"
        onChange={(e) => settitle(e.target.value)}
        value={title}
      />
      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          placeholder="category"
          className="text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          name="category"
          onChange={(e) => setcategory(e.target.value)}
          value={category}
        />
        <input
          type="number"
          placeholder="price"
          className="text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          name="price"
          onChange={(e) => setprice(e.target.value)}
          value={price}
        />
      </div>
      <textarea
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        placeholder="Enter product description here.."
        name="description"
        rows="10"
        onChange={(e) => setdescription(e.target.value)}
        value={description}
      ></textarea>

      <div className="w-1/2">
        <button className="py-2 px-5 border rounded border-blue-200 text-blue-300">
          Edit Product
        </button>
      </div>
    </form>
  ) : (
    <Loading />
  );
};

export default Edit;
