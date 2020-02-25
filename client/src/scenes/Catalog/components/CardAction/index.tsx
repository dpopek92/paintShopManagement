import React from 'react';

interface Props {
 onclick: () => void;
}

const CartAction: React.FC<Props> = ({ onclick, children }) => {
 return (
  <div onClick={onclick} onKeyDown={onclick} role="button" tabIndex={0}>
   {children}
  </div>
 );
};

export default CartAction;
