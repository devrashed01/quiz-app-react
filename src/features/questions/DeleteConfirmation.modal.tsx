import Button from 'components/form/button';
import Modal from 'components/modal';

interface Props {
  open: boolean;
  onClose: () => void;
  onClick: () => void;
}

export default function DeleteConfirmationModal({ onClose, onClick, open }: Props) {
  return (
    <Modal title="Delete Confirmation" className="max-w-lg" onCancel={onClose} visible={open}>
      <h2 className="text-base mb-5">Are you sure you want to delete this question?</h2>
      <Button onClick={onClose} className="mr-2">
        Cancel
      </Button>
      <Button onClick={onClick} color="danger">
        Yes, Delete
      </Button>
    </Modal>
  );
}
