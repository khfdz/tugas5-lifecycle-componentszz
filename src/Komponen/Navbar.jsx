import React, { Component } from "react";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
    };
  }

  handleInputChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSearch = () => {
    this.props.handleSearch(this.state.searchQuery);
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#" onClick={() => this.props.handleCategoryClick("bitcoin")}>NewsAPP</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#" onClick={() => this.props.handleCategoryClick("business")}>Business</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#" onClick={() => this.props.handleCategoryClick("technology")}>Technology</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#" onClick={() => this.props.handleCategoryClick("entertainment")}>Entertainment</a>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="text" id="searchText" placeholder="Search News..."
                aria-label="Search" onChange={this.handleInputChange} />
              <button className="btn btn-outline-success" type="button" id="searchBtn" onClick={this.handleSearch}>
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
