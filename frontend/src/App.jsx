import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import Landing from "./pages/Landing";
import About from "./pages/About";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import Blog from "./pages/Blog"

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<Team />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;