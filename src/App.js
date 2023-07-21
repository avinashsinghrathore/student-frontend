import "./App.css";
import Navbar from "./components/Navbar";
import AddUsers from "./components/AddUsers";
import AllUsers from "./components/AllUsers";
import Update from "./components/Update";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/add" element={ <AddUsers /> } />
          <Route path="/all" element={ <AllUsers /> } />
          <Route path="/:id" element={ <Update /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
