import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faEdit,
 faExclamation,
 faComments,
 faClock,
 faTint,
 faTruck,
 faUndo,
 faCheck,
 faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";
import { faClock as faClockRegular } from "@fortawesome/free-regular-svg-icons";
import withContext from "hoc/withContext";

const HalfGriding = styled.div`
 width: 30px;
 height: 20px;
 display: inline-block;
 background-color: #fff3cb;
 border: 1px solid rgba(0, 0, 0, 0.1);
`;
const StyledSpan = styled.span`
 background-color: ${({ type }) => {
  if (type === "lost") return `rgb(231, 188, 186)`;
  else if (type === "correct") return `rgb(204, 247, 179)`;
 }};
`;

const Legend = ({ permissionContext, view, position = "" }) => {
 if (permissionContext === "user") {
  return (
   <div>
    <FontAwesomeIcon icon={faTruck} /> <span> - Materiał powierzony</span>
   </div>
  );
 } else {
  if (permissionContext === "admin") {
   if (view === "new" || view === "ended") {
    return (
     <>
      <div>
       <FontAwesomeIcon icon={faTruck} /> <span> - Materiał powierzony</span>
      </div>
      <div>
       <FontAwesomeIcon icon={faComments} />
       <span> - Zamówienie zawiera komentarze</span>
      </div>
     </>
    );
   } else if (view === "production") {
    return (
     <>
      <div>
       <FontAwesomeIcon icon={faExclamation} />
       <span> - Priorytet</span>
      </div>
      <div>
       <FontAwesomeIcon icon={faTruck} /> <span> - Materiał powierzony</span>
      </div>
      <div>
       <FontAwesomeIcon icon={faComments} />
       <span> - Zamówienie zawiera komentarze</span>
      </div>
      <div>
       <FontAwesomeIcon icon={faClock} />
       <span> - Zamówienie w trakcie wykonywania</span>
      </div>
      <div>
       <FontAwesomeIcon icon={faTint} style={{ opacity: 0.5 }} />{" "}
       <span> - Zamówienie mokre</span>
      </div>
      <div>
       <FontAwesomeIcon icon={faExclamationCircle} />{" "}
       <span> - Przekroczony data realizacji</span>
      </div>
      <div>
       <FontAwesomeIcon icon={faClockRegular} style={{ color: "red" }} />
       <span> - >12h od szlifowania</span>
      </div>
      <div>
       <StyledSpan type="lost">1</StyledSpan>
       <span> - Elementy brakujące</span>
      </div>
      <div>
       <StyledSpan type="correct">1</StyledSpan>
       <span> - Elementy do poprawy</span>
      </div>
      <div>
       <FontAwesomeIcon icon={faEdit} />
       <span> - Ostatnio edytowane zamówienie</span>
      </div>
     </>
    );
   }
  } else if (permissionContext === "employee") {
   if (position === "Surówka") {
    return (
     <>
      <div>
       <FontAwesomeIcon icon={faExclamation} />
       <span> - Priorytet</span>
      </div>
      <div>
       <FontAwesomeIcon icon={faTruck} /> <span> - Materiał powierzony</span>
      </div>{" "}
      <div>
       <FontAwesomeIcon icon={faComments} />
       <span> - Zamówienie zawiera komentarze</span>
      </div>
     </>
    );
   } else if (position === "Podkład") {
    return (
     <>
      <div>
       <FontAwesomeIcon icon={faExclamation} />
       <span> - Priorytet</span>
      </div>{" "}
      <div>
       <FontAwesomeIcon icon={faComments} />
       <span> - Zamówienie zawiera komentarze</span>
      </div>
     </>
    );
   } else if (position === "Szlifiernia") {
    return (
     <>
      <div>
       <FontAwesomeIcon icon={faExclamation} />
       <span> - Priorytet</span>
      </div>{" "}
      <div>
       <FontAwesomeIcon icon={faComments} />
       <span> - Zamówienie zawiera komentarze</span>
      </div>
      <div>
       <FontAwesomeIcon icon={faUndo} />
       <span> - Zamówienie wróciło za szlifiernię</span>
      </div>
      <div>
       <HalfGriding />
       <span> - Zamówienie do przeszlifu</span>
      </div>
      <div>
       <FontAwesomeIcon icon={faClockRegular} style={{ color: "red" }} />
       <span> - >12h od szlifowania</span>
      </div>{" "}
      <div>
       <FontAwesomeIcon icon={faTint} style={{ opacity: 0.5 }} />{" "}
       <span> - Zamówienie mokre</span>
      </div>
     </>
    );
   } else if (position === "Lakiernia") {
    return (
     <>
      <div>
       <FontAwesomeIcon icon={faExclamation} />
       <span> - Priorytet</span>
      </div>{" "}
      <div>
       <FontAwesomeIcon icon={faComments} />
       <span> - Zamówienie zawiera komentarze</span>
      </div>
      <div>
       <FontAwesomeIcon icon={faClockRegular} style={{ color: "red" }} />
       <span> - >12h od szlifowania</span>
      </div>
     </>
    );
   } else if (position === "Polernia") {
    return (
     <>
      <div>
       <FontAwesomeIcon icon={faExclamation} />
       <span> - Priorytet</span>
      </div>{" "}
      <div>
       <FontAwesomeIcon icon={faComments} />
       <span> - Zamówienie zawiera komentarze</span>
      </div>
      <div>
       <FontAwesomeIcon icon={faTint} style={{ opacity: 0.5 }} />{" "}
       <span> - Zamówienie mokre</span>
      </div>
     </>
    );
   } else if (position === "Pakowanie") {
    return (
     <>
      <div>
       <FontAwesomeIcon icon={faExclamation} />
       <span> - Priorytet</span>
      </div>{" "}
      <div>
       <FontAwesomeIcon icon={faComments} />
       <span> - Zamówienie zawiera komentarze</span>
      </div>
      <div>
       <FontAwesomeIcon icon={faTint} style={{ opacity: 0.5 }} />{" "}
       <span> - Zamówienie mokre</span>
      </div>
      <div>
       <FontAwesomeIcon icon={faCheck} /> <span> - Gotowe do odbioru</span>
      </div>
     </>
    );
   }
  } else if (permissionContext === "display") {
   return (
    <>
     <div>
      <FontAwesomeIcon icon={faExclamation} />
      <span> - Priorytet</span>
     </div>{" "}
     <div>
      <FontAwesomeIcon icon={faTruck} /> <span> - Materiał powierzony</span>
     </div>{" "}
     <div>
      <FontAwesomeIcon icon={faClockRegular} style={{ color: "red" }} />
      <span> - >12h od szlifowania</span>
     </div>{" "}
     <div>
      <FontAwesomeIcon icon={faExclamationCircle} />{" "}
      <span> - Przekroczony data realizacji</span>
     </div>{" "}
     <div>
      <FontAwesomeIcon icon={faUndo} />
      <span> - Zamówienie wróciło za szlifiernię</span>
     </div>
     <div>
      <HalfGriding />
      <span> - Zamówienie do przeszlifu</span>
     </div>
     <div>
      <FontAwesomeIcon icon={faComments} />
      <span> - Zamówienie zawiera komentarze</span>
     </div>
     <div>
      <FontAwesomeIcon icon={faTint} style={{ opacity: 0.5 }} />{" "}
      <span> - Zamówienie mokre</span>
     </div>
     <div>
      <FontAwesomeIcon icon={faCheck} /> <span> - Gotowe do odbioru</span>
     </div>
     <div>
      <StyledSpan type="lost">1</StyledSpan>
      <span> - Elementy brakujące</span>
     </div>
     <div>
      <StyledSpan type="correct">1</StyledSpan>
      <span> - Elementy do poprawy</span>
     </div>
    </>
   );
  }
 }
 return null;
};
Legend.propTypes = {
 view: PropTypes.string,
 permissionContext: PropTypes.string
};

export default withContext(Legend);
