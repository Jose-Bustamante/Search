import React, { Component } from "react";
import InputSearch from "./components/InputSearch";
import { getSearchResult } from "./services/searchServices";

class App extends Component {
  state = {
    searchResults: [],
  };

  render() {
    const handleSearch = async (value) => {
      const a = await getSearchResult(value);
      if (a.data) {
        this.setState({ searchResults: a.data.suggestions });
      }
    };

    return (
      <div>
        <div>
          <h2>Hello world</h2>
        </div>
        <p>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <InputSearch
          onSearch={handleSearch}
          searchResults={this.state.searchResults}
        />
      </div>
    );
  }
}

export default App;
