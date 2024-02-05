import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../PaymentPage/Payment.css";

const Payment = () => {
  const location = useLocation();
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);
  const { offer } = location.state || null;
  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);

    const stripeResponse = await stripe.createToken(cardElement, {
      name: "L'id de l'acheteur",
    });
    console.log(stripeResponse);
    const stripeToken = stripeResponse.token.id;

    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/payment",
      {
        token: stripeToken,
        title: offer.product_name,
        amount: offer.product_price,
      }
    );
    console.log(response.data);
    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };

  return (
    <main className="payment">
      <div className="cardtopay">
        <p>{offer.product_price}€</p>
        <p>{offer.product_name}</p>

        {!completed ? (
          <form onSubmit={handleSubmit}>
            <p></p>
            <CardElement />
            <button type="submit">Valider</button>
          </form>
        ) : (
          <span>Paiement effectué ! </span>
        )}
      </div>
    </main>
  );
};

export default Payment;
