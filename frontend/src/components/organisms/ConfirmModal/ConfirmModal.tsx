import React from "react";
import { Button, Modal } from "semantic-ui-react";

interface Props {
    title: string;
    desc: string;
    confirmText: string;
    onClose: () => void;
    onConfirm: () => void;
    variant: "delete";
}

const ConfirmModal = (props: Props) => {
    const { title, desc, onClose, onConfirm, confirmText } = props;

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Modal onClose={onClose} open>
            <Modal.Header>{title}</Modal.Header>
            <Modal.Content>{desc}</Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    content={confirmText}
                    labelPosition="right"
                    icon="trash"
                    onClick={handleConfirm}
                    color="red"
                />
            </Modal.Actions>
        </Modal>
    );
};

export default ConfirmModal;
