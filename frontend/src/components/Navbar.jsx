import { Link } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "SpaceNetraAiBot", path: "/home" },
    { name: "Stats", path: "/stats" },
    { name: "Team", path: "/team" },
    { name: "Blog", path: "/blog"},
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="bg-black text-white shadow px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-blue-400">🚀 SpaceNetra</h1>
      <ul className="flex gap-4 text-sm sm:text-base">
        {navItems.map(({ name, path }) => (
          <li key={name}>
            <Link to={path} className="hover:text-blue-400 transition">
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
