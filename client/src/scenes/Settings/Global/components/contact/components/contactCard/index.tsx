import React from 'react';
import { Card, Icon } from 'antd';
import styled from 'styled-components';
import { firstLetterUppercase } from 'services/utils/string';
import Header from 'components/header';

const StyledCard = styled(Card)`
 .ant-card-actions {
  visibility: ${({ disabled }: { disabled?: boolean }) =>
   disabled ? 'hidden' : 'visible'};
 }

 .ant-card-head-title {
  letter-spacing: 3px;
  font-weight: bold;
  font-size: 18px;
 }
`;

interface PropsT {
 disabled: boolean;
 title: string;
 content: React.ReactNode;
 handleRemove: any;
}

const ContactCard: React.FC<PropsT> = ({
 disabled,
 title,
 content,
 handleRemove,
}) => (
 <StyledCard
  title={<Header type="h4" title={firstLetterUppercase(title)} />}
  actions={[
   <Icon type="edit" title="Edytuj" />,
   <Icon type="delete" title="Usuń" onClick={handleRemove} />,
  ]}
  disabled={disabled}
  size="small"
 >
  {content}
 </StyledCard>
);

export default ContactCard;
