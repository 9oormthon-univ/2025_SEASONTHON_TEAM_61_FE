'use client';

import { useModal } from '@/contexts/ModalContext';
import AddressModal from './AddressModal';
import SearchModal from './SearchModal';

export default function ModalContainer() {
  const { isAddressModalOpen, closeAddressModal, setSelectedAddress } = useModal();
  const { isSearchModalOpen, closeSearchModal, keywords } = useModal();

  const handleApply = (address: string) => {
    setSelectedAddress(address);
    closeAddressModal();
  };

  return (
    <>
      <AddressModal isOpen={isAddressModalOpen} onClose={closeAddressModal} onApply={handleApply} />
      <SearchModal isOpen={isSearchModalOpen} onClose={closeSearchModal} keywords={keywords} />
    </>
  );
}
