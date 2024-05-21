import React from 'react'
import { Modal } from 'antd'

export const ModalResponse = ({
    isOpen,
    isCloseModal,
    isResponse,
    isIcon,
}) => {

    return (
        <>
            <Modal
                open={isOpen}
                onOk={isCloseModal}
                // title={isIcon + " Response"}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <div
                    style={{
                        marginTop: '500',
                        textAlign: 'center'
                    }}
                >
                    {isIcon}
                </div>
                {isResponse}
            </Modal>
        </>
    )
}
