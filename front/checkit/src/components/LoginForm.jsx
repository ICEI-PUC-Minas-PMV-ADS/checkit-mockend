import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Services/Api";

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await login(email, password);
          localStorage.setItem('token', response.token);
          navigate('/');
        } catch (error) {
            console.error(err);
            setError("Invalid email or password");
        }
      };


    return (
        <>
            <form onSubmit={handleSubmit} className="new-item-form">
                <div className="form-row">
                    <h2>Login</h2>
                    {error && <div className="error">{error}</div>}
                    <label htmlFor="item">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="youremail@gmail.com"
                        id="item"
                        name="email"
                    />
                    <label htmlFor="item">Password</label>
                    <input
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        type="password"
                        placeholder="**************"
                        id="item"
                        name="password"
                    />
                </div>
                <button className="btn" type="submit">Login</button>
            </form>
            <Link to="/register">
                <button className="btn">Don't have an account? Register here.</button>
            </Link>
        </>
    )
}