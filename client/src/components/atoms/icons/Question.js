import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

const StyledIcon = styled(FontAwesomeIcon)`
 color: rgba(0, 0, 0, 0.5);
 cursor: pointer;
`;

const Question = () => <StyledIcon icon={faQuestion} />;
export default Question;
