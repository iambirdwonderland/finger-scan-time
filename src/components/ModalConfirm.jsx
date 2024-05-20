import React from 'react'
import { Modal } from 'antd'

export const ModalConfirm = ({ 
    isOpen, 
    isCloseModal,
    isConfirm,
}) => {
    return (
        <>
            <Modal
                open={isOpen}
                onOk={isConfirm}
                okText = "Confirm"
                onCancel={isCloseModal}
                title = 'Confirm registration or not ?'
            ></Modal>
        </>
    )
}
