import "../styles/Home.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    // Optionally, verify token with backend here
  }, [navigate]);

  return (
    <div className="home-container">
      <h1 className="h-heading">
        Welcome to <span className="headi">Transfer File.</span>
      </h1>

      <div className="files">
        <div className="request-container">
          <button>Send files</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
