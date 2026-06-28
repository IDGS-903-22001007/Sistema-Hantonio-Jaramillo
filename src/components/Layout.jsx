import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logoNegro from "../assets/logo-negro.png";

const Layout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuSections = [
    {
      title: "Principal",
      requiresAdmin: true, // <--- ¡Solo agrega esta línea aquí!
      items: [{ name: "Dashboard", to: "/" }],
    },
    {
      title: "Finanzas",
      requiresAdmin: true,
      items: [{ name: "Costo Beneficio", to: "/finanzas" }],
    },
    {
      title: "Operación",
      items: [
        { name: "Clientes", to: "/clientes" },
        { name: "Órdenes", to: "/ordenes" },
      ],
    },
    {
      title: "Administración",
      requiresAdmin: true,
      items: [
        { name: "Usuarios", to: "/usuarios" },
        { name: "Sucursales", to: "/sucursales" },
      ],
    },
  ];

  const linkStyles = ({ isActive }) =>
    `flex items-center px-8 py-3 transition-all duration-200 text-[11px] font-bold tracking-[1.5px] uppercase ${
      isActive
        ? "bg-[#0d0d0d] text-white border-r-4 border-white"
        : "text-[#555] hover:text-[#bbb] hover:bg-[#050505]"
    }`;

  const sectionTitleStyles =
    "px-8 pt-6 pb-2 text-[9px] font-extrabold text-[#333] uppercase tracking-[2px]";

  return (
    <div
      className="flex h-screen bg-black overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <aside className="w-64 bg-black flex flex-col flex-shrink-0 border-r border-[#1a1a1a]">
        <div className="pt-10 pb-8 px-6 flex flex-col items-center border-b border-[#111]">
          <img
            src={logoNegro}
            alt="Logo"
            className="w-48 h-auto object-contain mb-4"
          />
          <p className="text-[9px] text-[#333] tracking-[4px] font-bold uppercase">
            Gestión Integral
          </p>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {menuSections.map((section, index) => {
            if (section.requiresAdmin) {
              const rol = user?.rol || user?.nombreRol || "";
              if (!rol.toLowerCase().includes("admin")) return null;
            }

            return (
              <div key={index} className="mb-2">
                <p className={sectionTitleStyles}>{section.title}</p>
                {section.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    className={linkStyles}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            );
          })}
        </nav>

        <div className="p-6 border-t border-[#111] bg-black">
          {user && (
            <div className="mb-6 text-center">
              <p className="text-[11px] font-bold text-white uppercase tracking-[1px]">
                {user.nombreCompleto || user.login}
              </p>
              <span className="inline-block mt-2 px-2 py-0.5 rounded bg-[#1a1a1a] border border-[#222] text-[8px] text-[#666] uppercase tracking-[1px] font-medium">
                {user.rol || "Usuario"}
              </span>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full py-3 text-[10px] font-bold tracking-[2px] uppercase border border-[#222] text-[#666] hover:text-[#ff4d4d] hover:border-[#ff4d4d] hover:bg-[#ff4d4d10] transition-all duration-300 rounded-sm"
          >
            Cerrar Sesión
          </button>

          <p className="text-[8px] text-[#222] text-center mt-6 tracking-[1px]">
            © {new Date().getFullYear()} HANTONIO JARAMILLO
          </p>
        </div>
      </aside>

      <main className="flex-1 overflow-hidden bg-black p-4">
        <div className="w-full h-full bg-[#0d0d0d] rounded-xl border border-[#1a1a1a] shadow-2xl overflow-y-auto relative">
          <div className="p-8 md:p-12 text-white min-h-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
