import classes from "./ProfileForm.module.css";
import { useContext, useRef } from "react";
import AuthContext from "../../store/auht-context";
import { useHistory } from "react-router-dom";
const url =
  "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCM9iaw2b8Iy8COzaQPE_ab1vRMbHpe4ks";

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const enteredPasswordInputRef = useRef();
  const history = useHistory();

  function submitHandler(event) {
    event.preventDefault();

    const enteredNewPassword = enteredPasswordInputRef.current.value;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      history.replace("/");
    });
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={enteredPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
