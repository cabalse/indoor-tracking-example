import { BrowserRouter, Route, Routes } from "react-router";
import Tracking from "./components/tracking";
import CreateRoute from "./components/create-route";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tracking />} />
        <Route path="/create-route" element={<CreateRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
