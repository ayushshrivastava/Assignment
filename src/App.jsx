import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter as Router and Routes
import HistoryScores from "./components/HistoryScores";
import Home from "./Page/Home";
import Quize from "./Page/Quize";
import Navbar from "./Page/Navbar";

function App() {
  return (
    
    <Router>
      <Navbar />
      <div className="flex flex-col items-center justify-center">
       
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quize />} />
          <Route path="/history" element={<HistoryScores />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
