import { Link, useNavigate } from "react-router";
import { useUserStore } from "../../stores/UserStore";
// tu componente reutilizable
import { MenuIcon } from "lucide-react"; // para el icono en móvil
import { useMediaQuery } from "react-responsive";
import { Button } from "../../components/ui/button";

const NavBar = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const auth = useUserStore();
  const navigate = useNavigate();

  if (auth.user) return null; // solo mostrar si no está logueado

  return (
    <nav className="bg-background border-b shadow-sm">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        {/* Logo e ícono de menú */}
        <div className="flex items-center gap-4">
          {isMobile ? (
            <button className="p-2">
              <MenuIcon className="h-6 w-6" />
            </button>
          ) : (
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <img src="/logo.png" alt="Logo" className="h-8" />
            </Link>
          )}
        </div>

        {/* Links de navegación (centrados) */}
        {!isMobile && (
          <div className="flex gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-primary transition">
              Dashboard
            </Link>
            <Link to="/transactions" className="hover:text-primary transition">
              Transactions
            </Link>
            <Link to="/analysis" className="hover:text-primary transition">
              Analysis
            </Link>
            <Link to="/support" className="hover:text-primary transition">
              Support
            </Link>
            <Link to="/settings" className="hover:text-primary transition">
              Settings
            </Link>
          </div>
        )}

        {/* Botón de acceso */}
        <div>
          <Button
            onClick={() => navigate("/login")}
            className="bg-[#075D99] text-white rounded-md px-4 py-2 text-sm font-medium"
          >
            Acceder
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
