import "../OfferPage/OfferPage.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const OfferPage = () => {
  const [offer, setOffer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const navigateToPayment = () => {
    navigate("/payment", { state: { offer } });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        // console.log("Offerpage - datat>>", data);

        setOffer(data);
      } catch (error) {
        console.log("OfferPAge - catch >>", error.response);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main>
      <div className="mainoffer">
        <img
          className="offerImage"
          src={offer.product_image.secure_url}
          alt=""
        />

        <div className="fiche">
          <p>{offer.product_price} €</p>
          <div>
            {offer.product_details.map((detail) => {
              const keyTab = Object.keys(detail);
              console.log(keyTab[0]);
              return (
                <div className="productdetail">
                  <p>
                    {keyTab[0]} : {detail[keyTab[0]]}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="titleproduct">
            <h3>{offer.product_name}</h3>
            <p>{offer.product_description}</p>
            <div className="ownerAvatar">
              {offer.owner.account.avatar && (
                <img
                  src={offer.owner.account.avatar.secure_url}
                  alt="avatar account"
                />
              )}
              <p>{offer.owner.account.username}</p>
            </div>
          </div>

          <button onClick={navigateToPayment} className="buy">
            Acheter cet article
          </button>
        </div>
      </div>
    </main>
  );
};
export default OfferPage;
