import "../LoginPage/Login.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (email && password) {
        const { data } = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/login",
          { email, password }
        );
        Cookies.set("userToken", data.token, { secure: true });
        setToken(data.token);
        if (location.state) {
          navigate(location.state.from);
        } else {
          navigate("/");
        }
        // console.log(response.data);
      } else {
        <p>Tous les champs sont obligatoires</p>;
        setErrorMessage("Tous les champs sont obligatoires");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="mainlog">
      <h2>Se connecter</h2>
      <form className="login" onSubmit={handleSubmit}>
        <input
          className="inputlog"
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(event) => {
            setErrorMessage("");
            setEmail(event.target.value);
          }}
        />
        <input
          className="inputlog"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => {
            setErrorMessage("");
            setPassword(event.target.value);
          }}
        />
        <input className="buttonlog" type="submit" value="Se Connecter" />
        <Link className="logredir" to="/signup">
          Pas encore de compte ? Inscris-toi !
        </Link>
      </form>
    </main>
  );
};

export default Login;
