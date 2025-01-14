import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router";
import './App.css'
import Footer from './components/Footer'
import Home from './components/Home'
import NavigatorBar from './components/Navigator/NavigatorBar.tsx'
import Movie from './components/Movie/Movie.tsx';
import MovieList from "./components/Movie/MovieList.tsx";
import Account from "./components/Account.tsx";

const App = () => {

  return (
    <>

      <Router>
        <NavigatorBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/movie/movieList" element={<MovieList />} />
          <Route path="/account" element={<Account />} />
        </Routes>
        <Footer />
      </Router>

    </>
  )
}

export default App
