import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ReactComponent as Search } from "../../assets/search.svg";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import { ReactComponent as LoadingIcon } from "../../assets/loading.svg";
import InputSearchResultList from "./InputSearchResultList";
import Icon from "../Icon";
import { StyledIconSection, StyledInput, StyledInputWrapper } from "./styles";
import useDebounce from "../../hooks/debouncer";

const InputSearch = (props) => {
  const {
    id,
    placeholder = "Zoeken",
    error = false,
    isLoading = false,
    name = "search",
    onSelectResult,
    debounceTimeout = 400,
    maxResultsHeight = 200,
    minChars = 2,
    onSearch,
    searchResults = [],
  } = props;

  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);

  const [debouncedSearchTerm, debouncedSearchTermLastChange] = useDebounce(
    inputValue,
    debounceTimeout
  );

  useEffect(() => {
    if (searchResults.length > 0) {
      setResults(searchResults);
    }
  }, [searchResults]);

  useEffect(() => {
    if (debouncedSearchTerm.length >= minChars) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTermLastChange]);

  const handleClearValue = () => setInputValue("");

  return (
    <>
      <StyledInputWrapper>
        <StyledInput
          id={id}
          type="text"
          name={name}
          placeholder={placeholder}
          value={inputValue}
          error={error}
          autoComplete="off"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <StyledIconSection>
          {inputValue.length > 0 && !isLoading && (
            <Icon
              as={CloseIcon}
              id="deleteValueButton"
              height="16px"
              width="16px"
              onClick={handleClearValue}
            />
          )}
          {inputValue.length > 2 && isLoading && (
            <Icon
              as={LoadingIcon}
              height="16px"
              width="16px"
              onClick={handleClearValue}
            />
          )}
          <Icon as={Search} height="16px" width="16px" />
        </StyledIconSection>
        {debouncedSearchTerm.length >= minChars && results.length > 0 && (
          <InputSearchResultList
            maxHeight={maxResultsHeight}
            results={results}
            searchTerm={debouncedSearchTerm}
            onSelectResult={(r) => {
              setInputValue(r.searchterm);
              onSelectResult(r);
            }}
          />
        )}
      </StyledInputWrapper>
    </>
  );
};

InputSearch.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  isLoading: PropTypes.bool,
  name: PropTypes.string,
  onSelectResult: PropTypes.func.isRequired,
  debounceTimeout: PropTypes.number,
  maxResultsHeight: PropTypes.number,
  minChars: PropTypes.number,
  onSearch: PropTypes.func.isRequired,
  searchResults: PropTypes.array,
};

InputSearch.displayName = "InputSearch";

export default InputSearch;
