
import Music from "./COMPONENT/music";
import Logdlog from "./COMPONENT/Login";
import { BrowserRouter as Router, Route } from "react-router-dom"
import NavBar from "./COMPONENT/NavBar";
import Footer from "./COMPONENT/Footer";

function App() {
  return (
    <Router>
      <NavBar />
      <Router>
        <Route exact path="/" component={<Logdlog />} />
        <Route path="/search" component={<Music />} />
      </Router>
      <Footer />
    </Router>
  );
}
export default App;
