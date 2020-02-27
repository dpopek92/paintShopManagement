import React from 'react';
import { Modal, Button } from 'antd';

interface Props {
 visible: boolean;
 loading: boolean;
 handleOk: () => void;
 handleCancel: () => void;
}

const RemoveUser: React.FC<Props> = ({
 visible,
 loading,
 handleOk,
 handleCancel,
}) => {
 return (
  <Modal
   visible={visible}
   title={
    <span style={{ color: 'red', margin: 0 }}>
     Czy na pewno chcesz usunąć tego użytkownika?
    </span>
   }
   onCancel={handleCancel}
   footer={[
    <Button key="back" onClick={handleCancel}>
     Anuluj
    </Button>,
    <Button key="submit" type="danger" loading={loading} onClick={handleOk}>
     Usuń
    </Button>,
   ]}
  >
   Z bazy danych znikną wszystkie dane tego użytkownika, jego statystyki i
   zamówienia.
  </Modal>
 );
};

export default RemoveUser;
