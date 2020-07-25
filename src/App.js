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
        <InputSearch
          onSearch={handleSearch}
          searchResults={this.state.searchResults}
          onSelectResult={(value) => console.log("selected value -> ", value)}
        />
      </div>
    );
  }
}

export default App;
