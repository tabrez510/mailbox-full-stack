import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import SendMail from "./pages/sendMail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>HomePage</h1>} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/dashboard/send-mail" element={<SendMail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
