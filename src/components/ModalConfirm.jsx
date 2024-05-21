import React from 'react'
import { Modal } from 'antd'

export const ModalConfirm = ({
    isOpen,
    isConfirm,
    isCloseModal,
}) => {

    return (
        <>
            <Modal
                open={isOpen}
                onOk={isConfirm}
                okText="Confirm"
                onCancel={isCloseModal}
                title='Confirm registration or not ?'
            ></Modal>
        </>
    )
}
