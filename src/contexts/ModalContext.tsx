'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  // Address Modal
  isAddressModalOpen: boolean;
  openAddressModal: () => void;
  closeAddressModal: () => void;
  selectedAddress: string;
  setSelectedAddress: (address: string) => void;
  isSearchModalOpen: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;
  keywords: string[];
  setKeywords: (keywords: string[]) => void;

  // Generic Modals
  isAlertModalOpen: boolean;
  openAlertModal: (title: string, message: string) => void;
  closeAlertModal: () => void;
  alertModalData: { title: string; message: string };

  isConfirmModalOpen: boolean;
  openConfirmModal: (title: string, message: string, onConfirm: () => void) => void;
  closeConfirmModal: () => void;
  confirmModalData: { title: string; message: string; onConfirm: () => void };
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('서울시');

  // Generic modal states
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertModalData, setAlertModalData] = useState({ title: '', message: '' });

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmModalData, setConfirmModalData] = useState({
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const openAddressModal = () => setIsAddressModalOpen(true);
  const closeAddressModal = () => setIsAddressModalOpen(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const openSearchModal = () => setIsSearchModalOpen(true);
  const closeSearchModal = () => setIsSearchModalOpen(false);

  const openAlertModal = (title: string, message: string) => {
    setAlertModalData({ title, message });
    setIsAlertModalOpen(true);
  };
  const closeAlertModal = () => setIsAlertModalOpen(false);

  const openConfirmModal = (title: string, message: string, onConfirm: () => void) => {
    setConfirmModalData({ title, message, onConfirm });
    setIsConfirmModalOpen(true);
  };
  const closeConfirmModal = () => setIsConfirmModalOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isAddressModalOpen,
        openAddressModal,
        closeAddressModal,
        selectedAddress,
        setSelectedAddress,
        isSearchModalOpen,
        openSearchModal,
        closeSearchModal,
        keywords,
        setKeywords,
        isAlertModalOpen,
        openAlertModal,
        closeAlertModal,
        alertModalData,
        isConfirmModalOpen,
        openConfirmModal,
        closeConfirmModal,
        confirmModalData,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
