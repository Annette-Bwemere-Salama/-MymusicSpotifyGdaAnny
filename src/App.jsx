
import Music from "./COMPONENT/music";
import Logdlog from "./COMPONENT/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from "./COMPONENT/NavBar";
import Footer from "./COMPONENT/Footer";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>


        <Route exact path="/" component={<Logdlog />} />
        <Route path="/search" component={<Music />} />


      </Routes>
      <Footer />
    </BrowserRouter >


  )
}
export default App;
