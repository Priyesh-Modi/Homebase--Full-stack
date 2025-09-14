import { useContext, useState, FormEvent } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

// Define the types for the AuthContext updateUser function
interface AuthContextType {
  updateUser: (user: any) => void;
}

const Login: React.FC = () => {
  const [error, setError] = useState<string>(""); // Type the error state
  const [isLoading, setIsLoading] = useState<boolean>(false); // Type the isLoading state

  const { updateUser } = useContext<AuthContextType>(AuthContext); // Type the context

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { // Type the event as FormEvent
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target as HTMLFormElement); // Cast the target to HTMLFormElement

    const username = formData.get("username") as string; // Type the FormData values
    const password = formData.get("password") as string; // Type the FormData values

    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });

      updateUser(res.data);

      navigate("/");
    } catch (err: any) { // Type the error parameter
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="login">
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <h1>Welcome back</h1>
            <input
                name="username"
                required
                minLength={3}
                maxLength={20}
                type="text"
                placeholder="Username"
            />
            <input
                name="password"
                type="password"
                required
                placeholder="Password"
            />
            <button disabled={isLoading}>Login</button>
            {error && <span>{error}</span>}
            <Link to="/register">{"Don't"} you have an account?</Link>
          </form>
        </div>
        <div className="imgContainer">
          <img src="/realestate.png" alt="" />
        </div>
      </div>
  );
};

export default Login;
