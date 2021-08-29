
import './App.css';
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import { DeleteStorage, ReadStorage } from "./utils/AsyncStorage";
import SearchSuperHero from "./screens/SearchSuperHero";
import Login from "./screens/Login";
import Home from "./screens/Home";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    ReadStorage("token")
      .then((token) => {
        setUser(token);
      })
      .catch(() => console.log("error token"));
  }, []);

  const LogOut = async () => {
    await DeleteStorage("token");
    await DeleteStorage("Team");
    setUser(null);
  };
  return (
    <>
      {user && user !== "null" ? (
        <Router>
          <div className="d-flex justify-content-center mt-5">
            <div className="btn-group">
              <NavLink to="/" className="btn btn-danger">
                Inicio
              </NavLink>
              <NavLink to="/SearchSuperHero" className="btn btn-danger">
                Buscar Heroe
              </NavLink>
              <NavLink to="" onClick={LogOut} className="btn btn-danger">
                Cerrar Sesion{" "}
              </NavLink>
            </div>
          </div>
          <hr />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/SearchSuperHero">
              <SearchSuperHero />
            </Route>
          </Switch>
        </Router>
      ) : (
        <Login setUser={setUser} />
      )}
    </>
  );
};
export default App;
