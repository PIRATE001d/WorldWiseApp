import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
//import Home from "./pages/Home";
//import About from "./pages/About";
//import WorldWise from "./pages/worldWise";
//import Login from "./pages/Login";

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const WorldWise = lazy(() => import('./pages/worldWise'));
const Login = lazy(() => import('./pages/Login'));
import Loading from "./components/Loading";





import NavBar from "./components/NavBar";
import Countries from "./components/Countries";
import Cities from "./components/Cities";
import CityDetails from "./components/cityDetails";
import Form from "./components/form";
import { Navigate } from "react-router-dom";
import { CitiesProvider } from "./contexts/citiesContext";
import 'flowbite';


function App() {
  return (
    <BrowserRouter>
      
      <CitiesProvider>
      <Suspense fallback={<Loading />}>
      <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />

          {/* WorldWise with nested routes */}
          <Route path="worldWise" element={<WorldWise />}>
            <Route index element={<Navigate to="cities" />} /> {/* Default redirection */}
            <Route path="cities" element={<Cities />} />
            <Route path="countries" element={<Countries />} />
            <Route path="form" element={<Form />} />
            <Route path="cities/:cityId" element={<CityDetails />} />
            {/* 404 route inside WorldWise */}
            <Route path="*" element={<h1>Not Found</h1>} />
          </Route>

          <Route path="login" element={<Login />} />
          {/* Catch-all 404 route */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
        </Suspense>
      </CitiesProvider>
     
    </BrowserRouter>
  );
}

export default App;
