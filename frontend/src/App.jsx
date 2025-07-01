import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css"
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer"
import Landing from "./Pages/Landing";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Stats from "./Pages/Stats";
import Contact from "./Pages/Contact";
import Team from "./Pages/Team";
import Blog from "./Pages/Blog"

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