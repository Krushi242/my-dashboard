import "./Login.css";

const Login = () => {
  return (
    <div className="login">
      <div className="login-card">
        
        {/* Logo */}
        <div className="logo">
          <h1>REVA</h1>
          <span>TECHNO</span>
        </div>

        {/* Subtitle */}
        <p className="subtitle">
          Please sign-in to your account and start
          <br />
          the adventure
        </p>

        {/* Email */}
        <label>Email or Username</label>
        <input type="text" placeholder="" />

        {/* Password */}
        <div className="password-row">
          <label>Password</label>
          <span className="forgot">Forgot Password?</span>
        </div>

        <input type="password" />

        {/* Remember */}
        <div className="remember">
          <input type="checkbox" />
          <span>Remember Me</span>
        </div>

        {/* Button */}
        <button className="login-btn">Sign in</button>

        {/* Register */}
        <p className="register">
          New on our platform? <span>Create an account</span>
        </p>

        {/* Divider */}
        <div className="divider">
          <span></span>
          <p>or</p>
          <span></span>
        </div>

        {/* Social */}
        <div className="social">
          <div>in</div>
          <div>📷</div>
          <div>X</div>
        </div>

      </div>
    </div>
  );
};

export default Login;