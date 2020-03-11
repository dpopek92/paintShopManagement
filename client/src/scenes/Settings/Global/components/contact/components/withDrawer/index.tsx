import React from 'react';
import { Drawer } from 'antd';
import Header from 'components/header';
import { isMobile } from 'react-device-detect';

const withDrawer = (Component: React.FC<any>) => {
 return (props: any) => {
  return (
   <Drawer
    onClose={props.onclose}
    visible={props.visible}
    title={<Header type="h4" title={props.title} />}
    width={isMobile ? window.innerWidth * 0.95 : 500}
   >
    <Component {...props} />
   </Drawer>
  );
 };
};

export default withDrawer;
