import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import Gallery from "react-grid-gallery";
import { withRouter } from "react-router";
import { downloadPdfImage } from "utils/apiHandlers/orders/get";
import { setSpinner } from "actions/view";

const StyledImg = styled.img`
 width: 150px;
 height: 150px;
 cursor: pointer;
`;

const Images = ({ order, location }) => {
 const dispatch = useDispatch();
 const [images, setImages] = useState([]);
 const [pdf, setPdf] = useState([]);

 useEffect(() => {
  //  get custom milling image
  if (order.images) {
   if (order.customMilling.path) {
    const ext = order.customMilling.path.split(".");
    if (ext[ext.length - 1] !== "pdf") {
     const image = {
      src: `${order.customMilling.path}`,
      thumbnail: `${order.customMilling.path}`,
      thumbnailWidth: 150,
      thumbnailHeight: 150,
      caption: `Rodzaj frezowania`,
      alt:
       "Brak zdjęcia w bazie danych. Zdjęcie pojawi się po złożeniu zamówienia."
     };
     setImages(images => images.concat(image));
    } else {
     const newPdf = {
      src: `${order.customMilling.path}`,
      title: "Wzór frezowania [PDF]"
     };
     setPdf(pdf => pdf.concat(newPdf));
    }
   }
   // get elements images
   order.items.forEach((item, index) => {
    if (item.image.path) {
     const ext = item.image.path.split(".");
     if (ext[ext.length - 1] !== "pdf") {
      const image = {
       src: `${item.image.path}`,
       thumbnail: `${item.image.path}`,
       thumbnailWidth: 150,
       thumbnailHeight: 150,
       caption: `Rysunek do pozycji nr: ${index + 1}`,
       alt:
        "Brak zdjęcia w bazie danych. Zdjęcie pojawi się po złożeniu zamówienia."
      };
      setImages(images => images.concat(image));
     } else {
      const newPdf = {
       src: `${item.image.path}`,
       title: `Rysunek do pozycji nr: ${index + 1}`
      };
      setPdf(pdf => pdf.concat(newPdf));
     }
    }
   });
  }
 }, []);

 const getPdf = async (path, name) => {
  dispatch(setSpinner(true));
  await downloadPdfImage(order, order._id, path, name);
  dispatch(setSpinner(false));
 };

 return (
  <div className="order__gallery">
   {location.pathname.includes("summary") &&
   (images.length > 0 || pdf.length > 0) ? (
    <h5>Wszystkie zdjęcia zostaną wyświetlone po złożeniu zamówienia</h5>
   ) : (
    <>
     <Gallery
      images={images}
      enableImageSelection={false}
      backdropClosesModal={true}
      margin={5}
     />
     {pdf.length > 0 &&
      pdf.map(item => {
       return (
        <span key={item.src}>
         <StyledImg
          className="icon__image"
          onClick={() => getPdf(item.src, item.title)}
          src={require(`assets/images/pdf-icon.png`)}
          alt="Rysunek"
          title={item.title}
         />
        </span>
       );
      })}
    </>
   )}
  </div>
 );
};

Images.propTypes = {};

export default withRouter(Images);
