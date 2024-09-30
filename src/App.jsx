import { Routes, Route } from "react-router-dom";
import {
  NotFound,
  Login,
  SignUp,
  Starter,
  DevDeakin,
  PostType,
  FindQuestion,
  Plans,
  Payment,
  Chat,
} from "./constants";

function App() {
  return (
    <div className="bg-[#f5f5dc]">
      <Routes>
        <Route path="/" element={<Starter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/homepage" element={<DevDeakin />} />
        <Route path="/post" element={<PostType />} />
        <Route path="/find-questions" element={<FindQuestion />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/chat-gpt" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
