import styled from "styled-components";

export const StyledIconSection = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  & > * {
    margin-right: 16px;
  }
`;

export const StyledInput = styled.input`
  flex: 1 1 auto;
  border: 1px solid gray;
  outline: none;
  transition: all 0.2s ease-in;

  &:focus {
    border: 1px solid black;
  }
  padding: 5px 32px 5px 5px;
`;

export const StyledInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
`;

export const ResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid gray;
  left: 0;
  width: calc(100% - 2px);
  top: 26px;
  position: absolute;
  max-height: ${(props) => props.maxHeight}px;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
`;

export const ResultItem = styled.div`
  display: flex;
  min-width: 100%;
  height: 24px;
  border-bottom: 1px solid gray;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;

export const StyledNumberResultSpan = styled.span`
  margin-left: 5px;
`;
