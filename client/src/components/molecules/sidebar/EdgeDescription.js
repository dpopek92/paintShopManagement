import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import "./EdgeDescription.scss";

const EdgeDescription = props => {
 const leftSideClass = useSelector(state => state.view.modelLeftSide);
 const rightSideClass = useSelector(state => state.view.modelRightSide);
 return (
  <>
   <h5>Opis krawędzi:</h5>
   <div className="edge__description">
    <div className={`front__model front__model--left ${leftSideClass}`}>
     <span className="edge__left edge__desc">Lewa</span>
     <span className="edge edge__left w2l">W2'</span>
     <span className="edge edge__left w1l">W1'</span>
     <span className="edge edge__left s2l">S2'</span>
     <span className="edge edge__left s1l">S1'</span>
     <div className={`front__model front__model--right ${rightSideClass}`}>
      <div>
       <span className="edge__right edgeright__desc">Prawa</span>
       <span className="edge edge__right w2p">W2</span>
       <span className="edge edge__right w1p">W1</span>
       <span className="edge edge__right s2p">S2</span>
       <span className="edge edge__right s1p">S1</span>
      </div>
     </div>
    </div>
   </div>
  </>
 );
};

EdgeDescription.propTypes = {};

export default EdgeDescription;
