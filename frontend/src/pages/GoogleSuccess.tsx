// frontend/src/pages/GoogleSuccess.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GoogleSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard"); // or notes page
    }
  }, [navigate]);

  return <div>Logging you in…</div>;
}
