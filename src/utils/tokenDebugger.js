export const decodeJWT = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decodificando JWT:", error);
    return null;
  }
};

export const debugToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("❌ No hay token en localStorage");
    return;
  }

  const decoded = decodeJWT(token);
  console.log("🔐 Token decodificado:", decoded);

  // Buscar el claim del rol
  const roleClaimKey = Object.keys(decoded).find(
    (key) => key.includes("role") || key.includes("roles"),
  );

  if (roleClaimKey) {
    console.log(
      `📋 Claim del rol encontrado: "${roleClaimKey}"`,
      decoded[roleClaimKey],
    );
  } else {
    console.warn("⚠️ No se encontró claim de rol en el token");
  }
};
