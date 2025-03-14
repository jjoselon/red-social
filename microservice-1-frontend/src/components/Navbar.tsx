import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Red Social</h1>
      <ul className="flex gap-4">
        <li>
          <Link to="/profile" className="hover:underline">Perfil</Link>
        </li>
        <li>
          <Link to="/posts" className="hover:underline">Publicaciones</Link>
        </li>
        <li>
          <Link to="/login" className="hover:underline">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
