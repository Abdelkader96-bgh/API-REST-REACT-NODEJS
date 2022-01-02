import React from 'react'
import { Link } from "react-router-dom";


function Navbar() {
    return (
        <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
        <Link className="navbar-brand" to="/">
         Voir mes cabanes <i className="fas fa-house-user"></i>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/add">
                Ajouter une cabane
              </Link>
            </li>
          
          </ul>
          <ul className="navbar-nav ml-auto"></ul>
        </div>
        </div>
      </nav>
    </div>
    )
}

export default Navbar
