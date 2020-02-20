import React from 'react';
// import PropTypes from 'prop-types';
import {
 StyledH3 as Heading,
 StyledH6,
} from 'components/atoms/heading/Headings';
import FullWidthPageTemplate from 'templates/FullWidthPageTemplate';

const Contact = () => {
 return (
  <FullWidthPageTemplate title="Kontakt">
   <>
    <Heading>BLOW Kamil Kępa</Heading>
    <p>
     05-820 Piastów
     <br />
     ul. Piłsudskiego 56/42
     <br />
     NIP: 534 225 05 99
     <br />
     REGON: 144019841
    </p>
    <StyledH6>Produkcja</StyledH6>
    <p>
     Ul. Ożarowska 83 budynek G<br />
     05-850 Duchnice
     <br />
     <br />
     tel. (22) 722 10 17
     <br />
     tel. 505 412 112
     <br />
     tel. 796 999 540
     <br />
     <br />
     E-mail: <strong>biuro@mebleblow.pl</strong>
    </p>
   </>
  </FullWidthPageTemplate>
 );
};

Contact.propTypes = {};

export default Contact;
