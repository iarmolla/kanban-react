import "./App.css";
import Home from "./views/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './views/Login'
import Error from './views/Error'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={''} element={<Login></Login>}></Route>
          <Route path={'/home'} element={<Home></Home>}></Route>
          <Route path="*" element={<Error/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
