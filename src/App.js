import React, { useState, useEffect } from "react";
import PostsList from "./Pages/PostsList";
import Post from "./Pages/Post";
import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";
import "./styles/output.css";

import "./style.css";

export default function App() {
  const [direction, setDirection] = useState("ltr");

  return (
    <Router>
      <div
        className={
          direction == "ltr"
            ? "bg-gray-200 min-h-screen main-container ltr"
            : "bg-gray-200 min-h-screen main-container rtl"
        }
      >
        <nav className="h-16 	shadow-lg">
          <ul className="container mx-auto px-4 flex flex-row items-center h-full">
            <li className="mx-2">
              {" "}
              <span
                className="cursor-pointer"
                onClick={() => setDirection("ltr")}
              >
                {" "}
                EN{" "}
              </span>{" "}
            </li>
            <li className="mx-2">
              {" "}
              <span
                className="cursor-pointer"
                onClick={() => setDirection("rtl")}
              >
                {" "}
                عربي{" "}
              </span>{" "}
            </li>
          </ul>
        </nav>
        <div className="container mx-auto px-4">
          <Switch>
            <Route path="/" exact component={PostsList} />
            <Route path="/post/:id" component={Post} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
