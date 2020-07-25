import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { ResultsWrapper, ResultItem, StyledNumberResultSpan } from "./styles";

const identifySearchTerm = (term, data) => {
  if (!term || !data) return "";
  let termLower = term.toLowerCase();
  let matchIndex = data.toLowerCase().indexOf(termLower);
  if (data.toLowerCase().indexOf(termLower) >= 0) {
    let matchEndIndex = matchIndex + term.length;
    return (
      <Fragment>
        {data.substring(0, matchIndex)}
        <strong>{data.substring(matchIndex, matchEndIndex)}</strong>
        {data.length >= matchEndIndex
          ? identifySearchTerm(term, data.substring(matchEndIndex, data.length))
          : null}
      </Fragment>
    );
  } else return data;
};

const InputSearchResultList = (props) => {
  const { maxHeight = 200, results = [], searchTerm, onSelectResult } = props;

  return (
    <ResultsWrapper maxHeight={maxHeight}>
      {results.map((r, i) => {
        return (
          <ResultItem key={r.id ? r.id : i} onClick={() => onSelectResult(r)}>
            <span>{identifySearchTerm(searchTerm, r.searchterm)}</span>
            <StyledNumberResultSpan>({r.nrResults})</StyledNumberResultSpan>
          </ResultItem>
        );
      })}
    </ResultsWrapper>
  );
};
InputSearchResultList.propTypes = {
  searchTerm: PropTypes.string,
  onSelectResult: PropTypes.func.isRequired,
  maxHeight: PropTypes.number,
  results: PropTypes.array,
};

InputSearchResultList.displayName = "InputSearchResultList";

export default InputSearchResultList;
