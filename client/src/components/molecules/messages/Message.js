import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import Buttons from "templates/FlexRowTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { dateToString } from "utils/functions/date";
import withContext from "hoc/withContext";
import { setSpinner } from "actions/view";
import { removeMessage } from "utils/apiHandlers/messages/delete";

const StyledTop = styled.div`
 display: flex;
 justify-content: space-between;
 font-size: 16px;
 margin-bottom: 2px;
`;
const StyledInfo = styled.span`
 font-weight: bold;
`;
const StyledPositions = styled.span`
 font-size: 12px;
 color: ${({ theme, position }) => theme.positions[position]};
 text-shadow: ${({ position }) =>
  position === "Podkład" ? "1px 1px 3px rgb(34, 34, 34)" : "none"};
`;
const StyledMessage = styled.p`
 border-radius: 5px;
 background-color: rgb(233, 233, 233);
 padding: 10px 15px;
 margin-top: 10px;
`;

const Message = ({ item, setMessage, permissionContext, getMessages }) => {
 const dispatch = useDispatch();

 // HANDLERS
 const handleRemove = async () => {
  dispatch(setSpinner(true));
  await removeMessage(item._id, () => {
   getMessages(null, () => {
    dispatch(setSpinner(false));
    setMessage(null);
   });
  });
 };
 return (
  <div>
   <StyledTop>
    <StyledInfo>
     {item.author}
     <FontAwesomeIcon icon={faArrowRight} />{" "}
     {item.positions.map(item => (
      <StyledPositions position={item} key={item}>
       {item}{" "}
      </StyledPositions>
     ))}
    </StyledInfo>
    <span>{dateToString(item.addDate)}</span>
   </StyledTop>
   <StyledMessage>{item.message}</StyledMessage>
   <hr />
   <Buttons justify="flex-end">
    <Button
     variant="success"
     onClick={() => {
      setMessage(null);
     }}
    >
     Wróć
    </Button>

    <Button
     variant="danger"
     disabled={permissionContext !== "admin"}
     onClick={handleRemove}
    >
     Usuń
    </Button>
   </Buttons>
  </div>
 );
};

Message.propTypes = {
 item: PropTypes.object,
 setMessage: PropTypes.func,
 getMessages: PropTypes.func,
 permissionContext: PropTypes.oneOf(["admin", "employee"])
};

export default withContext(Message);
