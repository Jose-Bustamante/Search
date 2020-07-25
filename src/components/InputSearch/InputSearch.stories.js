import React from "react";
import styled from "styled-components";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import InputSearch from "./index";

const Container = styled.div`
  width: auto;
`;

export const resultsSimple = [
  { searchterm: "heren truien", nrResults: 1100 },
  { searchterm: "dames truien", nrResults: 1501 },
  { searchterm: "kenzo trui", nrResults: 62 },
  { searchterm: "kenzo trui dames", nrResults: 21 },
  { searchterm: "kenzo trui heren", nrResults: 12 },
  { searchterm: "armani truien", nrResults: 39 },
  { searchterm: "daily paper trui", nrResults: 2 },
  { searchterm: "calvin klein trui", nrResults: 54 },
  { searchterm: "calvin klein trui heren rood", nrResults: 40 },
  { searchterm: "calvin klein trui heren blauw", nrResults: 50 },
  { searchterm: "calvin klein trui heren oranje", nrResults: 42 },
];

storiesOf("InputSearch", module)
  .add("Default", () => {
    class StoryComp extends React.Component {
      state = {
        results: [],
        isLoading: false,
      };

      // Fake a async fetch
      getResults(input) {
        this.setState({ ...this.state, isLoading: true });
        setTimeout(() => {
          if (input === "none") this.setState({ results: [] });
          else this.setState({ results: resultsSimple, isLoading: false });
        }, 1000);
      }

      render() {
        return (
          <Container>
            <InputSearch
              id="exampleId"
              placeholder="Search"
              label="Organization"
              notFoundMessage="Unable to find organization"
              minChars={3}
              debounceTimeout={500}
              onSearch={(input) => this.getResults(input)}
              onSelectResult={action("Item Selected")}
              searchResults={this.state.results}
              isLoading={this.state.isLoading}
            />
          </Container>
        );
      }
    }

    return <StoryComp />;
  })
  .add("With Error", () => {
    class StoryComp extends React.Component {
      state = {
        results: [],
        error: false,
      };

      // Fake a async fetch
      getResults(input) {
        setTimeout(() => {
          if (input === "none") this.setState({ results: [] });
          else this.setState({ results: resultsSimple });
        }, 400);
      }

      render() {
        return (
          <Container>
            <InputSearch
              id="exampleId"
              placeholder="Search"
              label="Organization"
              notFoundMessage="Unable to find organization"
              minChars={3}
              debounceTimeout={500}
              onGetResults={(input) => this.getResults(input)}
              onSelectResult={() => this.setState({ error: true })}
              searchResults={this.state.results}
              error={this.state.error}
              errorMessage="Company already registered"
              errorTooltip={
                <p>
                  It seems like you company is already registered. Go to login
                  screen or contact customer support.
                </p>
              }
            />
          </Container>
        );
      }
    }

    return <StoryComp />;
  });
