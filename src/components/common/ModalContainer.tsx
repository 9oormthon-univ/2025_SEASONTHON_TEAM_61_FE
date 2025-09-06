'use client';

import { useModal } from '@/contexts/ModalContext';
import AddressModal from './AddressModal';

export default function ModalContainer() {
  const { isAddressModalOpen, closeAddressModal, setSelectedAddress } = useModal();

  const handleApply = (address: string) => {
    setSelectedAddress(address);
    closeAddressModal();
  };

  return (
    <>
      <AddressModal isOpen={isAddressModalOpen} onClose={closeAddressModal} onApply={handleApply} />
    </>
  );
}
