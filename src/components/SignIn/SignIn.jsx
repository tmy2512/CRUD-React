import { useState } from "react";
import style from "./signin.module.scss";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formLogin, setFormLogin] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngăn chặn reload trang khi submit form
    try {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();
      const user = users.find(
        (user) =>
          user.email === formLogin.email && formLogin.password == "1234567"
      );
      console.log(user.email);
      console.log("dfjdfgd");
      if (user) {
        // Đăng nhập thành công
        navigate("/");
      } else {
        // Đăng nhập thất bại
        setErrorMsg("Invalid email or password");
      }
    } catch (errorMsg) {
      setErrorMsg("An error occurred while logging in");
    }
  };
  return (
    <div className={style["sign-in"]}>
      <div className={style["sign-in__container"]}>
        <div className={style["sign-in__heading"]}>Welcome</div>
        <form>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formLogin.email}
            onChange={handleChange}
            className={style["sign-in__textfield"]}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formLogin.password}
            onChange={handleChange}
            className={style["sign-in__textfield"]}
          />
          <button type="button" onClick={handleSubmit}>
            Login
          </button>
          {errorMsg && <p>{errorMsg}</p>}
        </form>
      </div>
    </div>
  );
}
