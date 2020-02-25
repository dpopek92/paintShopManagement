/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React, { useState } from 'react';
import styled from 'styled-components';
import { PageHeader, Card, Icon, Modal } from 'antd';
import FullWidthPageTemplate from 'components/templates/fullWidth';
import FlexTemplate from 'components/templates/flexTemplate';
import { useHistory } from 'react-router';
import CardAction from '../components/CardAction';

const StyledImage = styled.img`
 width: 200px;
 height: 200px;
 margin: 0 auto;
`;

const names: Images = {
 image: 'Model',
 imageProfile: 'Przekrój',
 imageProfile2: 'Przekrój',
 imageFront: 'Front',
 imageIzometric: 'Rzut izometryczny',
};

interface location {
 pathname: string;
 search: string;
 hash: string;
 state: any;
}
interface Images {
 [key: string]: string;
}

const Element = ({ location }: { location: location }) => {
 const history = useHistory();
 const [img, setImg] = useState('');
 const { state } = location;

 const images: Images = {
  image: state.image,
  imageProfile: state.imageProfile,
  imageProfile2: state.imageProfile2,
  imageFront: state.imageFront,
  imageIzometric: state.imageIzometric,
 };

 return (
  <>
   <FullWidthPageTemplate>
    <>
     <div style={{ textAlign: 'center' }}>
      <PageHeader
       ghost={false}
       onBack={() => history.goBack()}
       title={state.name.toUpperCase()}
      />
      <div>
       <FlexTemplate>
        {Object.keys(images).map((key: any) => {
         const image = images[key];
         if (image) {
          return (
           <Card
            key={key}
            style={{ width: 300, height: 200, margin: 5 }}
            bodyStyle={{ padding: 0 }}
            cover={
             <StyledImage
              src={require(`assets/images/${state.type}s/${state.name}/${image}`)}
              alt="img"
             />
            }
            actions={[
             <CardAction onclick={() => setImg(image)}>
              <>
               {' '}
               {names[key]} <Icon type="search" />
              </>
             </CardAction>,
            ]}
           />
          );
         }
         return null;
        })}
       </FlexTemplate>
      </div>
     </div>
    </>
   </FullWidthPageTemplate>
   {/* Modal */}
   <Modal visible={!!img} onCancel={() => setImg('')} footer={null}>
    <div
     style={{ textAlign: 'center' }}
     onClick={() => {
      setImg('');
     }}
     onKeyDown={() => {
      setImg('');
     }}
     role="button"
     tabIndex={0}
    >
     {img && (
      <img
       style={{ maxWidth: '100%', maxHeight: '100vh' }}
       src={require(`assets/images/${state.type}s/${state.name}/${img}`)}
       alt="Podgląd elementu"
       className="image"
      />
     )}
    </div>
   </Modal>
   )}
  </>
 );
};

export default Element;
