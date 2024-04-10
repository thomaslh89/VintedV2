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
  const [preview, setPreview] = useState();
  const [file, setFile] = useState({});

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
    formData.append("picture", file);
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
      if (response.data._id) {
        // redirectoin vers l'offre
        navigate(`/offer/${response.data._id}`);
      } else {
        alert("Une erreur est survenue, veuillez réssayer");
      }
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Une erreur est survenue, veuillez réssayer"
      );
    }
  };

  return token ? (
    <div className="mainpublish">
      <div className="publish-container">
        <h2>Vends ton article</h2>
        <form className="publish" onSubmit={handleUpload}>
          {/* {preview && <img src={preview} alt="preview-before-upload" />} */}
          <div className="file-select">
            {preview ? (
              <div className="dashed-preview-image">
                <img src={preview} alt="pré-visualisation" />
                <div
                  className="remove-img-button"
                  onClick={() => {
                    setPreview("");
                  }}
                >
                  X
                </div>
              </div>
            ) : (
              <div className="dashed-preview-without">
                <div className="input-design-default">
                  <label htmlFor="file" className="label-file">
                    <span className="input-sign">+</span>
                    <span>Ajoute une photo</span>
                  </label>
                  <input
                    id="file"
                    type="file"
                    className="input-file"
                    onChange={(event) => {
                      setFile(event.target.files[0]);
                      setPreview(URL.createObjectURL(event.target.files[0]));
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="text-input-section">
            <div className="text-input">
              <h4>Title</h4>
              <input
                placeholder="ex: Tshirt Nike vert"
                type="text"
                id="title"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="text-input">
              <h4>Description</h4>
              <textarea
                name="description"
                placeholder="ex: porté quelquefois, taille correctement"
                rows="5"
                type="text"
                id="description"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="text-input-section">
            <div>
              <div className="text-input">
                <h4>Marque</h4>
                <input
                  type="text"
                  id="brand"
                  placeholder="Nike"
                  value={brand}
                  onChange={(event) => {
                    setBrand(event.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <div className="text-input">
                <h4>Taille</h4>
                <input
                  type="text"
                  id="size"
                  placeholder="XS"
                  value={size}
                  onChange={(event) => {
                    setSize(event.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <div className="text-input">
                <h4>Couleur</h4>
                <input
                  placeholder="ex: Blue"
                  type="text"
                  id="color"
                  value={color}
                  onChange={(event) => {
                    setColor(event.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <div className="text-input">
                <h4>État</h4>
                <input
                  type="text"
                  id="condition"
                  placeholder="Neuf avec étiquette"
                  value={condition}
                  onChange={(event) => {
                    setCondition(event.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <div className="text-input">
                <h4>Lieu</h4>
                <input
                  type="text"
                  id="city"
                  placeholder="Nantes"
                  value={city}
                  onChange={(event) => {
                    setCity(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="text-input-section">
            <div className="text-input">
              <h4>Prix</h4>

              <input
                type="text"
                id="price"
                placeholder="ex : 10€"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </div>
          </div>

          <button className="form-validation">Ajouter</button>
        </form>
      </div>
    </div>
  ) : (
    <Navigate to="/login" state={{ from: "/publish" }} />
  );
};

export default Publish;
