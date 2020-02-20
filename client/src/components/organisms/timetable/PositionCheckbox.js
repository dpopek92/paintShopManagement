import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const StyledLabel = styled(Form.Check.Label)`
 cursor: pointer;
 font-weight: bold;
 font-size: 18px;
 color: ${({ theme, pos }) => theme.positions[pos]};
 text-shadow: ${({ pos }) =>
  pos === 'Podkład' ? `1px 1px 3px rgb(75, 75, 75)` : 'none'};
`;

const PositionCheckbox = ({ position, positions, onchange }) => {
 return (
  <Form.Group controlId={position} style={{ margin: 0 }}>
   <Form.Check type="checkbox">
    <Form.Check.Input
     type="checkbox"
     checked={positions[position]}
     value={position}
     onChange={onchange}
    />
    <StyledLabel pos={position}>{position}</StyledLabel>
   </Form.Check>
  </Form.Group>
 );
};

PositionCheckbox.propTypes = {
 position: PropTypes.string,
 positions: PropTypes.instanceOf(Object),
 onchange: PropTypes.func,
};

export default PositionCheckbox;
