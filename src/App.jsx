import {BrowserRouter, Routes, Route} from "react-router-dom";
import SigninPage from "./pages/Signin/SigninPage";
import SignupPage from "./pages/Signup/SignupPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignupPage />}/>
          <Route path='/' element={<SigninPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
