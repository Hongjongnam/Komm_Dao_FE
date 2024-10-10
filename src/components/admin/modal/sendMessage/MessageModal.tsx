// src/components/common/MessageModal.tsx
import React from 'react';
import {
  ModalOverlay,
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CloseButton,
  SendButton,
  CancelButton,
  Title,
  TextArea,
  Option,
} from './MessageModal.style';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: () => void;
  title: string;
  content: string;
  channel: string;
  setTitle: (value: string) => void;
  setContent: (value: string) => void;
  setChannel: (value: string) => void;
  formLink?: string;
}

const MessageModal: React.FC<MessageModalProps> = ({
  isOpen,
  onClose,
  onSend,
  title,
  content,
  channel,
  setTitle,
  setContent,
  setChannel,
  formLink = '(Optional) Also send to a discord channel:',
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalContent>
          <ModalHeader>
            <h2>Send Messages</h2>
            <CloseButton onClick={onClose} />
          </ModalHeader>
          <ModalBody>
            <div>
              <Title type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            </div>
            <div>
              <TextArea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
            </div>
            <div>
              <label>{formLink}</label>
              <Option type="text" value={channel} onChange={(e) => setChannel(e.target.value)} />
            </div>
          </ModalBody>
          <ModalFooter>
            <CancelButton onClick={onClose}>Cancel</CancelButton>
            <SendButton onClick={onSend}>Send</SendButton>
          </ModalFooter>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default MessageModal;
