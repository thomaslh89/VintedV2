import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../HomePage/Homepage.css";
import Hero from "../../components/Hero/Hero";
const HomePage = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );

      // console.log("HomePage - Data>>", response.data);

      setData(response.data.offers);
    } catch (error) {
      console.log("HomePage - catch>>", error.response);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <div>
      <Hero className="hero" />
      <div className="main">
        {data.map((offer) => {
          return (
            <Link
              to={`/offer/${offer._id}`}
              key={offer._id}
              className="offerCard"
            >
              <div className="card">
                <div className="owner">
                  {offer.owner.account.avatar && (
                    <img
                      src={offer.owner.account.avatar.secure_url}
                      alt="avatar account"
                    />
                  )}
                  <span>{offer.owner.account.username}</span>
                </div>
                <img src={offer.product_image.secure_url} alt="image product" />
                <p>
                  {offer.product_price.toFixed(2).toString().replace(".", ",")}€
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
