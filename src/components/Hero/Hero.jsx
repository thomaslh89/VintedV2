import heroimg from "../../assets/hero.jpg";
import { Link } from "react-router-dom";
import "../../components/Hero/Hero.css";
const Hero = () => {
  return (
    <main>
      <div className="hero">
        <img src={heroimg} alt="" />
        <div className="calltoaction">
          <p>Prêts à faire du tri dans vos placards ? </p>
          <Link to="/publish">
            <button>Commencer à vendre</button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Hero;
