import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";
import apiRequest from "../../lib/apiRequest";

const Register: React.FC = () => {
  const [error, setError] = useState<string>(""); // Type the error state as string
  const [isLoading, setIsLoading] = useState<boolean>(false); // Type the loading state as boolean

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { // Type the event as FormEvent
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const formData = new FormData(e.target as HTMLFormElement); // Cast the target as HTMLFormElement

    const username = formData.get("username") as string; // Type formData values as string
    const email = formData.get("email") as string; // Type formData values as string
    const password = formData.get("password") as string; // Type formData values as string

    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });

      navigate("/login");
    } catch (err: any) { // Type the error object as any
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="registerPage">
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <h1>Create an Account</h1>
            <input name="username" type="text" placeholder="Username" />
            <input name="email" type="text" placeholder="Email" />
            <input name="password" type="password" placeholder="Password" />
            <button disabled={isLoading}>Register</button>
            {error && <span>{error}</span>}
            <Link to="/login">Do you have an account?</Link>
          </form>
        </div>
        <div className="imgContainer">
          <img src="/realestate.png" alt="" />
        </div>
      </div>
  );
};

export default Register;
