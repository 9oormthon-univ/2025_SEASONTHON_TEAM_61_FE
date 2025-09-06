'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  isAddressModalOpen: boolean;
  openAddressModal: () => void;
  closeAddressModal: () => void;
  selectedAddress: string;
  setSelectedAddress: (address: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('서울시');

  const openAddressModal = () => setIsAddressModalOpen(true);
  const closeAddressModal = () => setIsAddressModalOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isAddressModalOpen,
        openAddressModal,
        closeAddressModal,
        selectedAddress,
        setSelectedAddress,
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
