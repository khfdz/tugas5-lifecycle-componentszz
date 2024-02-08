import React, { Component } from "react";
import Navbar from "./Navbar";
import NewsCard from "./NewsCard";

class Halaman extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuery: "bitcoin",
      currentPage: 1,
      articles: [],
      totalResults: 0,
      searchQuery: "", // State untuk menyimpan input pencarian
      searchResults: [], // State untuk menyimpan hasil pencarian
    };
  }

  componentDidMount() {
    this.fetchNews(1, this.state.currentQuery);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentQuery !== this.state.currentQuery) {
      this.fetchNews(1, this.state.currentQuery);
    }
  }

  searchByTitle = () => {
    const { articles, searchQuery } = this.state;
    const searchResults = articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    this.setState({ searchResults });
  };


  fetchNews = async (page, q) => {
    console.log(`Fetching News for ${q}, Page Number ${page}...`);

    var url = `https://newsapi.org/v2/everything?q=${q}&from=2024-01-11&to=2024-01-11&pageSize=20&page=${page}&sortBy=popularity&apiKey=53de3838f3ef4745b2d5dc60e1155f14`;

    try {
      let response = await fetch(url);
      let data = await response.json();
      console.log(data);
      this.setState({
        totalResults: data.totalResults,
        articles: data.articles
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  handleInputChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };


  handleSearch = (searchQuery) => {
    this.setState({ searchQuery }, () => {
      this.searchByTitle();
    });
  };


  handlePreviousPage = () => {
    if (this.state.currentPage > 1) {
      this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
      this.fetchNews(this.state.currentPage - 1, this.state.currentQuery);
    }
  };

  handleNextPage = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
    this.fetchNews(this.state.currentPage + 1, this.state.currentQuery);
  };

  handleCategoryClick = (category) => {
    this.setState({ currentQuery: category });
  };

  render() {
    const { totalResults, articles, searchResults } = this.state;

    // Menentukan data yang akan ditampilkan berdasarkan apakah sedang melakukan pencarian atau tidak
    const displayData = this.state.searchQuery ? searchResults : articles;

    return (
      <div>
        <Navbar
          handleCategoryClick={this.handleCategoryClick}
          handleSearch={this.handleSearch}
        />
        <div className="container">
          <h1>Welcome to News APP ({totalResults} Results)</h1>
          <div className="row content">
            {displayData && displayData.length > 0 ? (
              displayData.map((item, index) => (
                <NewsCard key={index} item={item} />
              ))
            ) : (
              <p>No articles found.</p>
            )}
          </div>

          <div className="d-flex justify-content-around my-3">
            <button className="btn btn-primary" id="previousPage" onClick={this.handlePreviousPage}>&lt; Previous Page</button>
            <button className="btn btn-primary" id="nextPage" onClick={this.handleNextPage}>Next Page &gt;</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Halaman;
