import React from 'react';
import styled from 'styled-components';
import { Form, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

const StyledCheckboxWrapper = styled.div`
 display: flex;
 justify-content: flex-start;
`;
const StyledInfo = styled.p`
 font-size: 10px;
 line-height: 10px;
 margin-bottom: 2px;
 margin-left: 2px;
 margin-top: 12px;
 color: lightgray;
`;

const labels: any = {
 rodo: (
  <>
   {' '}
   Wyrażam zgodę na przetwarzanie moich danych osobowych przez firmę: BLOW
   Meble, NIP: 534 225 05 99, REGON: 144019841, w celu założenia i utrzymywania
   mojego konta użytkownika na warunkach opisanych w
   <a href="/regulations"> regulaminie</a> i przy zachowaniu przepisów
   rozporządzenia o ochronie danych osobowych (RODO). Zostałem poinformowany, że
   zgodę mogę wycofać w dowolnym momencie. Zostałem poinformowany, że mam prawo
   wglądu, poprawiania oraz żądania usunięcia moich danych osobowych w dowolnej
   chwili.*
  </>
 ),
 reg: (
  <>
   Zapoznałem się z <a href="/regulations">regulaminem.</a>*
  </>
 ),
 msg: (
  <>
   Wyrażam zgodę na otrzymywanie wiadomości e-mail z informacjami na temat moich
   zamówień.*
  </>
 ),
};

interface Props {
 touched: any;
 errors: any;
 values: any;
 handleChange: (e: CheckboxChangeEvent) => void;
 name: string;
}

const FormCheckbox: React.FC<Props> = ({
 touched,
 errors,
 values,
 handleChange,
 name,
}) => {
 return (
  <Form.Item
   style={{ margin: 0 }}
   validateStatus={touched[name] && errors[name] ? 'error' : 'success'}
   help={touched[name] && errors[name]}
  >
   <StyledCheckboxWrapper>
    <Checkbox
     checked={values[name]}
     onChange={handleChange}
     name={name}
    ></Checkbox>
    <StyledInfo>{labels[name]}</StyledInfo>
   </StyledCheckboxWrapper>
  </Form.Item>
 );
};

export default FormCheckbox;
