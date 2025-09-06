'use client';

import { useModal } from '@/contexts/ModalContext';
import AddressModal from './AddressModal';
import { AlertModal, ConfirmModal } from '../ui/modal';

export default function ModalContainer() {
  const { 
    isAddressModalOpen, 
    closeAddressModal, 
    setSelectedAddress,
    isAlertModalOpen,
    closeAlertModal,
    alertModalData,
    isConfirmModalOpen,
    closeConfirmModal,
    confirmModalData
  } = useModal();

  const handleApply = (address: string) => {
    setSelectedAddress(address);
    closeAddressModal();
  };

  return (
    <>
      <AddressModal isOpen={isAddressModalOpen} onClose={closeAddressModal} onApply={handleApply} />
      
      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={closeAlertModal}
        title={alertModalData.title}
        message={alertModalData.message}
      />
      
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={confirmModalData.onConfirm}
        title={confirmModalData.title}
        message={confirmModalData.message}
      />
    </>
  );
}
