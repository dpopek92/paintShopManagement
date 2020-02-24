import React from 'react';
import { Modal } from 'antd';

const Success = ({ onOk }: { onOk: () => void }) => {
 return Modal.success({
  title: 'Konto zostało utworzone',
  content: 'Proszę oczekiwać na zatwierdzenie przez administratora',
  onOk,
 });
};

export default Success;
