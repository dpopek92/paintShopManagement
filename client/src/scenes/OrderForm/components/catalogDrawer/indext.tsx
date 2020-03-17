import React from 'react';
import styled from 'styled-components';
import { Drawer } from 'antd';
import Colors from 'scenes/Catalog/Colors';
import Handles from 'scenes/Catalog/Handles';
import Millings from 'scenes/Catalog/Millings';
import GlassCases from 'scenes/Catalog/GlassCases';
import Veneers from 'scenes/Catalog/Veneers';
import Header from 'components/header';
import { CatalogDrawerTypesT } from 'services/store/types/view/View';

interface PropsT {
 type: CatalogDrawerTypesT;
 onClose: () => void;
}

const CatalogDrawer: React.FC<PropsT> = ({ type, onClose }) => {
 return (
  <Drawer
   onClose={onClose}
   title={<Header type="h3" title="Katalog" />}
   visible={!!type}
   placement="bottom"
   height={'95vh'}
   destroyOnClose
  >
   {type === 'colors' && <Colors />}
   {type === 'handles' && <Handles />}
   {type === 'millings' && <Millings />}
   {type === 'glassCases' && <GlassCases />}
   {type === 'veneers' && <Veneers />}
  </Drawer>
 );
};

export default CatalogDrawer;
