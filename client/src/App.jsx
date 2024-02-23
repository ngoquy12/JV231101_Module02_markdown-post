import { Route, Routes } from "react-router-dom";
import "./App.css";
import ListPost from "./pages/ListPost";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Header from "./layouts/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list-post" element={<ListPost />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </>
  );
}

export default App;
