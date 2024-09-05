import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import SendMailPage from "./pages/sendMailPage";
import SentMailPage from "./pages/sentMailPage";
import ReceivedMailPage from "./pages/receivedMailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>HomePage</h1>} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/send-mail" element={<SendMailPage />} />
        <Route path="/sent-mail" element={<SentMailPage />} />
        <Route path="/received-mail" element={<ReceivedMailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
