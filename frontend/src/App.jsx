import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import MovieContainer from "./components/MovieContainer";
import TicketBooking from "./components/TicketBooking";
import { AnimatePresence } from "framer-motion";
import MovieDetail from "./components/MovieDetail";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence initial={false}>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<MovieContainer />} />
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
