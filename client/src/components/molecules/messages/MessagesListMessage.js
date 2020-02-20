import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { isMessageUnreaded } from "utils/functions/messages";
import { dateToString } from "utils/functions/date";
import { setMessageReaded } from "utils/apiHandlers/messages/update";

const StyledContainer = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: ${({ isOwnMessage }) =>
  isOwnMessage ? "flex-end" : "flex-start"};
`;
const StyledWrapper = styled.div`
 cursor: pointer;
 border: 1px solid grey;
 padding: 2px;
 border-radius: 5px;
 margin-bottom: 5px;
 width: 90%;
 background-color: ${({ isUnreaded }) =>
  isUnreaded ? "rgba(0,0,0,0.05)" : "white"};
`;
const StyledTop = styled.div`
 display: flex;
 justify-content: space-between;
 font-size: 10px;
 margin-bottom: 2px;
`;
const StyledInfo = styled.span`
 font-weight: bold;
`;
const StyledPositions = styled.span`
 font-size: 9px;
 color: ${({ theme, position }) => theme.positions[position]};
 text-shadow: ${({ position }) =>
  position === "Podkład" ? "1px 1px 3px rgb(34, 34, 34)" : "none"};
`;

const MessagesListMessage = ({ item, setMessage, getMessages }) => {
 const position = useSelector(state => state.employee.activePosition);
 const user = useSelector(state => state.auth.user);
 const msg = item.message.substr(0, 50);

 const isUnreaded = isMessageUnreaded(user._id, item);
 const isOwnMessage = user._id === item.authorId;

 //  HANDLERS
 const handleSetMessage = async () => {
  if (!item.readedBy.includes(user._id)) {
   await setMessageReaded(item._id, () => getMessages(position, () => {}));
  }
  setMessage(item);
 };
 return (
  <StyledContainer isOwnMessage={isOwnMessage}>
   <StyledWrapper isUnreaded={isUnreaded} onClick={handleSetMessage}>
    <StyledTop>
     <StyledInfo>
      {item.author} <FontAwesomeIcon icon={faArrowRight} />{" "}
      {item.positions.map(item => (
       <StyledPositions position={item} key={item}>
        {item}{" "}
       </StyledPositions>
      ))}
     </StyledInfo>

     <span>{dateToString(item.addDate)}</span>
    </StyledTop>
    <div>
     {msg}
     {msg.length >= 50 && "..."}
    </div>
   </StyledWrapper>
  </StyledContainer>
 );
};

MessagesListMessage.propTypes = {
 item: PropTypes.object,
 setMessage: PropTypes.func
};

export default MessagesListMessage;
