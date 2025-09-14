import React, { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";

interface PostData {
  title: string;
  price: number;
  address: string;
  city: string;
  bedroom: number;
  bathroom: number;
  type: string;
  property: string;
  latitude: string;
  longitude: string;
  images: string[];
}

interface PostDetail {
  desc: string;
  utilities: string;
  pet: string;
  income: string;
  size: number;
  school: number;
  bus: number;
  restaurant: number;
}

function NewPostPage() {
  const [value, setValue] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Create a plain object from FormData
    const formObject: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    try {
      const res = await apiRequest.post("/posts", {
        postData: {
          title: formObject.title as string,
          price: parseInt(formObject.price as string),
          address: formObject.address as string,
          city: formObject.city as string,
          bedroom: parseInt(formObject.bedroom as string),
          bathroom: parseInt(formObject.bathroom as string),
          type: formObject.type as string,
          property: formObject.property as string,
          latitude: formObject.latitude as string,
          longitude: formObject.longitude as string,
          images: images,
        } as PostData,
        postDetail: {
          desc: value,
          utilities: formObject.utilities as string,
          pet: formObject.pet as string,
          income: formObject.income as string,
          size: parseInt(formObject.size as string),
          school: parseInt(formObject.school as string),
          bus: parseInt(formObject.bus as string),
          restaurant: parseInt(formObject.restaurant as string),
        } as PostDetail,
      });
      navigate("/" + res.data.id);
    } catch (err) {
      console.log(err);
      setError("An error occurred while submitting the form");
    }
  };

  return (
      <div className="newPostPage">
        <div className="formContainer">
          <h1>Add New Post</h1>
          <div className="wrapper">
            <form onSubmit={handleSubmit}>
              <div className="item">
                <label htmlFor="title">Title</label>
                <input id="title" name="title" type="text" />
              </div>
              <div className="item">
                <label htmlFor="price">Price</label>
                <input id="price" name="price" type="number" />
              </div>
              <div className="item">
                <label htmlFor="address">Address</label>
                <input id="address" name="address" type="text" />
              </div>
              <div className="item description">
                <label htmlFor="desc">Description</label>
                <ReactQuill theme="snow" onChange={setValue} value={value} />
              </div>
              <div className="item">
                <label htmlFor="city">City</label>
                <input id="city" name="city" type="text" />
              </div>
              <div className="item">
                <label htmlFor="bedroom">Bedroom Number</label>
                <input min={1} id="bedroom" name="bedroom" type="number" />
              </div>
              <div className="item">
                <label htmlFor="bathroom">Bathroom Number</label>
                <input min={1} id="bathroom" name="bathroom" type="number" />
              </div>
              <div className="item">
                <label htmlFor="latitude">Latitude</label>
                <input id="latitude" name="latitude" type="text" />
              </div>
              <div className="item">
                <label htmlFor="longitude">Longitude</label>
                <input id="longitude" name="longitude" type="text" />
              </div>
              <div className="item">
                <label htmlFor="type">Type</label>
                <select name="type">
                  <option value="rent" defaultChecked>
                    Rent
                  </option>
                  <option value="buy">Buy</option>
                </select>
              </div>
              <div className="item">
                <label htmlFor="property">Property</label>
                <select name="property">
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                  <option value="land">Land</option>
                </select>
              </div>
              <div className="item">
                <label htmlFor="utilities">Utilities Policy</label>
                <select name="utilities">
                  <option value="owner">Owner is responsible</option>
                  <option value="tenant">Tenant is responsible</option>
                  <option value="shared">Shared</option>
                </select>
              </div>
              <div className="item">
                <label htmlFor="pet">Pet Policy</label>
                <select name="pet">
                  <option value="allowed">Allowed</option>
                  <option value="not-allowed">Not Allowed</option>
                </select>
              </div>
              <div className="item">
                <label htmlFor="income">Income Policy</label>
                <input id="income" name="income" type="text" placeholder="Income Policy" />
              </div>
              <div className="item">
                <label htmlFor="size">Total Size (sqft)</label>
                <input min={0} id="size" name="size" type="number" />
              </div>
              <div className="item">
                <label htmlFor="school">School</label>
                <input min={0} id="school" name="school" type="number" />
              </div>
              <div className="item">
                <label htmlFor="bus">Bus</label>
                <input min={0} id="bus" name="bus" type="number" />
              </div>
              <div className="item">
                <label htmlFor="restaurant">Restaurant</label>
                <input min={0} id="restaurant" name="restaurant" type="number" />
              </div>
              <button className="sendButton">Add</button>
              {error && <span>{error}</span>}
            </form>
          </div>
        </div>
        <div className="sideContainer">
          {images.map((image, index) => (
              <img src={image} key={index} alt="" />
          ))}
          <UploadWidget
              uwConfig={{
                multiple: true,
                cloudName: "HomeBase",
                uploadPreset: "estate",
                folder: "posts",
              }}
              setState={setImages}
              setPublicId={() => {}}
          />
        </div>
      </div>
  );
}

export default NewPostPage;
