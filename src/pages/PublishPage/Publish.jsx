import "../PublishPage/Publish.css";
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Publish = ({ token }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState();

  // const [sharecheckbox, setSharecheckbox] = useState(false);
  const handleUpload = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("picture", picture);
    formData.append("preview", preview);

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  return token ? (
    <main className="mainpublish">
      <h2>Vends ton article</h2>
      <form className="publish" onSubmit={handleUpload}>
        <input
          type="file"
          placeholder="Ajoutez une photo"
          onChange={(event) => {
            const objectUrl = URL.createObjectURL(event.target.files[0]);
            setPreview(objectUrl);
            setPicture(event.target.files[0]);
          }}
        />
        {preview && <img src={preview} alt="preview-before-upload" />}

        <div className="div1">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <br /> <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>
        <div></div>
        <div>
          <label htmlFor="brand">Marque</label>
          <input
            type="text"
            id="brand"
            value={brand}
            onChange={(event) => {
              setBrand(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="size">Taille</label>
          <input
            type="text"
            id="size"
            value={size}
            onChange={(event) => {
              setSize(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="color">Couleur</label>
          <input
            type="text"
            id="color"
            value={color}
            onChange={(event) => {
              setColor(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="condition">État</label>
          <input
            type="text"
            id="condition"
            value={condition}
            onChange={(event) => {
              setCondition(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="city">Lieu</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="price">Prix</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
        </div>

        <button>Ajouter</button>
      </form>
    </main>
  ) : (
    <Navigate to="/login" state={{ from: "/publish" }} />
  );
};

export default Publish;
