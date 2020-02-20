import React, { useState, useEffect } from "react";
import { Tabs, Tab, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import PageTemplate from "templates/PageTemplate";
import FullWidthPageTemplate from "templates/FullWidthPageTemplate";
import { StyledH1 as Heading } from "components/atoms/heading/Headings";
import Cards from "components/organisms/catalog/Cards";
import ImageCards from "components/organisms/catalog/ImageCards";
import Input from "components/atoms/inputs/InputWithButton";
import FAST from "assets/data/ColorsFast.json";
import RAL from "assets/data/ColorsRal.json";
import NCS from "assets/data/ColorsNcs.json";
import mordantBrown from "assets/data/mordantBrown.json";
import mordantYellow from "assets/data/mordantYellow.json";
import mordantWhite from "assets/data/mordantWhite.json";
import mordantGreen from "assets/data/mordantGreen.json";
import { addColor } from "actions/newOrder";
import { setComponentInModal } from "actions/view";

const StyledWrapper = styled.div`
 margin-top: 5px;
 width: 400px;
 @media (max-width: 600px) {
  margin: 5px auto;
  width: 100%;
 }
`;
const StyledFlex = styled.div`
 display: flex;
 justify-content: space-between;
 @media (max-width: 600px) {
  flex-direction: column;
 }
`;

const Colors = () => {
 const dispatch = useDispatch();
 const [key, setKey] = useState("FAST");
 const [mordant, setMordant] = useState("");
 const [search, setSearch] = useState("");
 const [newMordant, setNewMordant] = useState(null);
 const [newColors, setNewColors] = useState(null);
 const MORDANT = mordantWhite.concat(mordantBrown, mordantYellow, mordantGreen);

 useEffect(() => {
  let newMordant = mordantBrown
   .concat(mordantGreen, mordantWhite, mordantYellow)
   .filter(
    item =>
     item.name
      .toLowerCase()
      .replace(/[\s-]/g, "")
      .indexOf(search.toLowerCase().replace(/[/\s-]/g, "")) !== -1
   );
  let newColors = RAL.concat(NCS).filter(
   item =>
    item.name
     .toLowerCase()
     .replace(/[\s-]/g, "")
     .indexOf(search.toLowerCase().replace(/[/\s-]/g, "")) !== -1
  );
  setNewColors(newColors);
  setNewMordant(newMordant);
 }, [search]);

 const handleClick = (name, type) => {
  if (type === "mordant") dispatch(addColor("bejca " + name));
  else dispatch(addColor(name));
  dispatch(setComponentInModal(null));
 };
 const addCustomMordant = () => {
  dispatch(addColor("bejca " + mordant));
  dispatch(setComponentInModal(null));
 };
 const handleChange = e => setMordant(e.target.value);
 const handleSearch = e => setSearch(e.target.value);
 return (
  <div>
   <PageTemplate>
    <FullWidthPageTemplate>
     <>
      <StyledFlex>
       <Heading>Kolory</Heading>
       <StyledWrapper>
        <Form.Control
         type="text"
         value={search}
         onChange={handleSearch}
         placeholder="Wyszukaj"
        />
       </StyledWrapper>
      </StyledFlex>
      {!search ? (
       <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={key => setKey(key)}
       >
        <Tab eventKey={"FAST"} title={"Szybki wybór"}>
         {key === "FAST" && <Cards items={FAST} onclick={handleClick} />}
        </Tab>
        <Tab eventKey={"RAL"} title={"RAL"}>
         {key === "RAL" && <Cards items={RAL} onclick={handleClick} />}
        </Tab>
        <Tab eventKey={"NCS"} title={"NCS"}>
         {key === "NCS" && <Cards items={NCS} onclick={handleClick} />}
        </Tab>
        <Tab eventKey={"MORDANT"} title={"BEJCA"}>
         {key === "MORDANT" && (
          <>
           <StyledWrapper>
            <Input
             value={mordant}
             onchange={handleChange}
             onclick={addCustomMordant}
             placeholder="Numer bejcy"
            />
            <small>
             Pełny wzornik bejc na stronie:{" "}
             <a href="https://www.sopur.com.pl/pl/katalog-kolorow">
              sopur.com.pl
             </a>
             .
            </small>
           </StyledWrapper>
           <hr />
           <ImageCards
            items={newMordant}
            type="mordant"
            onclick={handleClick}
           />
          </>
         )}
        </Tab>
       </Tabs>
      ) : (
       <>
        <Cards items={newColors} onclick={handleClick} />
        <ImageCards items={MORDANT} type="mordant" onclick={handleClick} />
       </>
      )}
     </>
    </FullWidthPageTemplate>
   </PageTemplate>
  </div>
 );
};

Colors.propTypes = {};

export default Colors;
