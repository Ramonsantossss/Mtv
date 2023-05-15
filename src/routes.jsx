import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Anime from "./pages/Anime";
import Watch from "./pages/Watch";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/anime/:animeId" component={Anime} />
        <Route exact path="episode/:videoId" component={Watch} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
