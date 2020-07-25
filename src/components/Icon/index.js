import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const IconSvg = styled.svg`
  color: ${({ color }) => color};
  height: ${({ height }) => height};
  width: ${({ width }) => width};
`;

const Icon = ({ ...rest }) => (
  <IconSvg fill={rest.color} strokeWidth={0} {...rest} />
);

Icon.defaultProps = {
  color: "gray",
  height: "32px",
  width: "32px",
};

Icon.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  color: PropTypes.string,
};

Icon.displayName = "Icon";

export default Icon;
