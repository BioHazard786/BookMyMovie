import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import HomeScreen from "./components/HomeScreen";
import TicketBooking from "./components/TicketBooking";
import { AnimatePresence } from "framer-motion";
import MovieDetail from "./components/MovieDetail";

function App() {
  const location = useLocation();

  // Wrapping with AnimatedPresence for animating exit animations of routes
  // Wrapping with Routes for routing support
  return (
    <AnimatePresence initial={false}>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/movie/:movieID" element={<MovieDetail />} />
        <Route
          path="/movie/:movieID/book-tickets"
          element={<TicketBooking />}
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
