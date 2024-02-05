import "../Header/Header.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
const Header = ({ token, setToken }) => {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
      {token ? (
        <nav className="navlog">
          <button
            className="logout"
            onClick={() => {
              Cookies.remove("userToken");
              setToken("");
            }}
          >
            Se Déconnecter
          </button>
          <Link to="/publish">
            <button className="sellbutton">Vend tes articles</button>
          </Link>
        </nav>
      ) : (
        //
        <nav className="nav">
          <Link to="/SignUp">
            <button>S'inscrire</button>
          </Link>

          <Link to="/login">
            <button>Se Connecter</button>
          </Link>

          <Link to="/publish">
            <button>Vend tes articles</button>
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
