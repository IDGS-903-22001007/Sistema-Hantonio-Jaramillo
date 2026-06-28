import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logoNegro from "../assets/logo-negro.png";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login: loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      // Esperamos a que la función del contexto haga todo el proceso (llamar a la API y guardar en localStorage)
      await loginUser(login, password);

      // Una vez que terminó, leemos el usuario guardado para saber su rol
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const userData = JSON.parse(storedUser);

        // Comprobamos el rol. (Ajusta la validación según cómo venga tu JSON: "Administrador", "Admin", etc.)
        const rol = userData.rol || userData.nombreRol || "";

        if (rol.toLowerCase().includes("admin")) {
          navigate("/"); // El admin va al Dashboard
        } else {
          navigate("/clientes"); // El empleado va a Clientes
        }
      } else {
        // Fallback por si acaso
        navigate("/");
      }
    } catch (err) {
      console.error("Error capturado:", err);
      setError("No se pudo iniciar sesión. Verifique sus datos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ... (Toda tu estructura de estilos y JSX se queda exactamente igual) ... */}
      <style>
        {`
          input[type="password"]::-ms-reveal,
          input[type="password"]::-ms-clear { display: none; }
          
          input:focus {
            border-color: #444 !important;
            background: #1a1a1a !important;
          }

          .login-button:hover:not(:disabled) {
            background: #eee !important;
            transform: translateY(-1px);
          }

          .login-button:disabled {
            background: #333 !important;
            color: #666 !important;
            cursor: not-allowed;
          }
          
          .error-fade {
            animation: fadeIn 0.3s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <div
        style={{
          minHeight: "100vh",
          background: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div
          style={{
            background: "#0d0d0d",
            padding: "50px 40px",
            borderRadius: 20,
            border: "1px solid #222",
            boxShadow: "0 0 40px rgba(255, 255, 255, 0.06)",
            width: "100%",
            maxWidth: 360,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={logoNegro}
            alt="Logo"
            style={{
              height: 180,
              width: "auto",
              marginBottom: 10,
              objectFit: "contain",
            }}
          />

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <div style={{ marginBottom: 15 }}>
              <label
                style={{
                  color: "#666",
                  fontSize: "11px",
                  marginBottom: 5,
                  display: "block",
                  fontWeight: 600,
                  letterSpacing: "0.8px",
                }}
              >
                USUARIO
              </label>
              <input
                type="text"
                value={login}
                onChange={(e) => {
                  setLogin(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Usuario"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 6,
                  border: error ? "1px solid #ff4d4d" : "1px solid #222",
                  background: "#121212",
                  color: "#fff",
                  fontSize: "14px",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                required
              />
            </div>

            <div style={{ marginBottom: 5 }}>
              <label
                style={{
                  color: "#666",
                  fontSize: "11px",
                  marginBottom: 6,
                  display: "block",
                  fontWeight: 600,
                  letterSpacing: "0.8px",
                }}
              >
                CONTRASEÑA
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="••••••••"
                  style={{
                    width: "100%",
                    padding: "10px 40px 10px 14px",
                    borderRadius: 6,
                    border: error ? "1px solid #ff4d4d" : "1px solid #222",
                    background: "#121212",
                    color: "#fff",
                    fontSize: "14px",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#444",
                  }}
                >
                  {showPassword ? (
                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-7-11-7a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 7 11 7a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div
              style={{
                minHeight: "45px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 5,
              }}
            >
              {error && (
                <span
                  className="error-fade"
                  style={{
                    color: "#ff4d4d",
                    fontSize: "13px",
                    textAlign: "center",
                    fontWeight: 500,
                    display: "block",
                    background: "rgba(255, 77, 77, 0.1)",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    width: "100%",
                  }}
                >
                  ⚠️ {error}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                background: "#fff",
                color: "#000",
                fontWeight: 700,
                border: "none",
                borderRadius: 6,
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {loading ? "PROCESANDO..." : "ENTRAR"}
            </button>
          </form>

          <footer
            style={{
              marginTop: 40,
              color: "#222",
              fontSize: "9px",
              letterSpacing: "1px",
            }}
          >
            © {new Date().getFullYear()} HANTONIO JARAMILLO
          </footer>
        </div>
      </div>
    </>
  );
};

export default Login;
