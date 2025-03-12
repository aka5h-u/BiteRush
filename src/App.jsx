import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
