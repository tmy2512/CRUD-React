import { Link, useNavigate } from "react-router-dom";
import Logo from "../Icons/Logo";
import style from "./header.module.scss";
import ArrowRight from "../Icons/ArrowRight";

const Header = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/sign-in");
  };
  const classes = {
    headerContainer: `${style.header__container}`,
    headerContent: `${style.header__content}`,
    headerIcon: `${style.header__icon}`,
    headerBtn: `${style.header__btn}`,
  };
  return (
    <div className={classes.headerContainer}>
      <div className={classes.headerContent}>
        <Link to="/sign-in" className={classes.headerIcon}>
          <Logo />
        </Link>
        <div>
          <button className={classes.headerBtn} onClick={handleLoginClick}>
            <span>Login</span>
            <span>
              <ArrowRight />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Header;
