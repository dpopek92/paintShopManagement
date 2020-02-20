import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FullWidthPageTemplate from "templates/FullWidthPageTemplate";
import { StyledH1 as Heading } from "components/atoms/heading/Headings";
import Modal from "components/molecules/modal/Modal";

const StyledImage = styled.img`
 width: 200px;
 height: 200px;
 margin: 15px;
 display: inline-block;
 cursor: pointer;
`;

const Element = ({ location }) => {
 const [img, setImg] = useState("");
 const { state } = location;
 return (
  <>
   <FullWidthPageTemplate>
    <>
     <div style={{ textAlign: "center" }}>
      <Heading>{state.name.toUpperCase()}</Heading>
      <div>
       <StyledImage
        src={require(`assets/images/${state.type}s/${state.name}/model.jpg`)}
        alt="img"
        onClick={() => {
         setImg("model.jpg");
        }}
       />
       {state.imageProfile && (
        <StyledImage
         src={require(`assets/images/${state.type}s/${state.name}/przekroj.png`)}
         alt="img"
         className={state.type === "handle" ? "przekroj" : ""}
         onClick={() => {
          setImg("przekroj.png");
         }}
        />
       )}
       {state.imageProfile2 && (
        <StyledImage
         src={require(`assets/images/${state.type}s/${state.name}/przekroj2.png`)}
         alt="img"
         className={state.type === "handle" ? "przekroj" : ""}
         onClick={() => {
          setImg("przekroj2.png");
         }}
        />
       )}
       {state.imageFront && (
        <StyledImage
         src={require(`assets/images/${state.type}s/${state.name}/front.png`)}
         alt="img"
         onClick={() => {
          setImg("front.png");
         }}
        />
       )}
       {state.imageIzometric && (
        <StyledImage
         src={require(`assets/images/${state.type}s/${state.name}/izometric.png`)}
         alt="img"
         onClick={() => {
          setImg("izometric.png");
         }}
        />
       )}
      </div>
     </div>
    </>
   </FullWidthPageTemplate>
   {/* Modal */}

   {img && (
    <Modal closeModal={() => setImg("")} size="xl">
     <div style={{ textAlign: "center" }}>
      <img
       style={{ maxWidth: "100%", maxHeight: "100vh" }}
       src={require(`assets/images/${state.type}s/${state.name}/${img}`)}
       onClick={() => {
        setImg("");
       }}
       className="image"
      />
     </div>
    </Modal>
   )}
  </>
 );
};

Element.propTypes = {};

export default Element;
