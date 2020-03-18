import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import { Fade } from 'react-awesome-reveal';

const StyledIcon = styled(Icon)`
 color: red;
`;

interface PropsT {
 name: string;
 value: string;
 handleRemove: () => void;
}

const Item: React.FC<PropsT> = ({ name, value, handleRemove }) => {
 return (
  <Fade>
   <div>
    <StyledIcon type="delete" onClick={handleRemove} /> <strong>{name}:</strong>{' '}
    <span>{value.toUpperCase()}</span>
   </div>
  </Fade>
 );
};

export default Item;
