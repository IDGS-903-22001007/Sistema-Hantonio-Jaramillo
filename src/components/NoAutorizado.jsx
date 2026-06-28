import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NoAutorizado = () => {
  const { user } = useAuth();

  // Determinamos a dónde enviarlo de regreso dependiendo de su rol
  const rutaSegura = user?.rol?.toLowerCase().includes("admin")
    ? "/"
    : "/clientes";

  return (
    <div
      style={{
        height: "100vh",
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
          padding: "60px 40px",
          borderRadius: 20,
          border: "1px solid #222",
          boxShadow: "0 0 40px rgba(255, 77, 77, 0.05)",
          textAlign: "center",
          maxWidth: 400,
        }}
      >
        <h1
          style={{
            fontSize: "70px",
            margin: 0,
            color: "#ff4d4d",
            lineHeight: 1,
          }}
        >
          403
        </h1>
        <h2
          style={{
            fontSize: "16px",
            color: "#fff",
            letterSpacing: "3px",
            margin: "15px 0",
          }}
        >
          ACCESO DENEGADO
        </h2>
        <p
          style={{
            color: "#666",
            fontSize: "13px",
            marginBottom: "35px",
            lineHeight: 1.5,
          }}
        >
          Parece que intentaste acceder a un módulo restringido o no tienes los
          permisos suficientes.
        </p>
        <Link
          to={rutaSegura}
          style={{
            display: "inline-block",
            padding: "12px 24px",
            background: "#fff",
            color: "#000",
            textDecoration: "none",
            fontWeight: 700,
            borderRadius: 6,
            fontSize: "12px",
            letterSpacing: "1px",
            transition: "all 0.2s ease",
          }}
        >
          REGRESAR A SALVO
        </Link>
      </div>
    </div>
  );
};

export default NoAutorizado;
