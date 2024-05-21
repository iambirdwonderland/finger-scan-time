import React, { useState } from 'react'
import axios from 'axios';
import { ModalConfirm } from './ModalConfirm';
import { ExclamationCircleTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import {
    Button,
    Flex,
    Form,
    Input,
    Select,
    Card,
    Checkbox
} from 'antd';
import { ModalResponse } from './ModalResponse';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 6,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 14,
        },
    },
};

const { Option } = Select;

function Register() {


    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleOpenModal = () => {
        console.log(formData);
        if (optionsMessageFrom) {
            setIsModalOpen(true);
        }
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const [isDataResponse, setIsDataResponse] = useState("")
    const [isModalOpenResponse, setIsModalOpenResponse] = useState(false)
    const handleCloseModalResponse = () => {
        setIsModalOpenResponse(false);
        window.location.reload();
    };

    const [optionsMessageFrom, setOptionsMessageFrom] = useState('');
    const [optionsMessageType, setOptionsMessageType] = useState([]);
    // ฟังก์ชันเมื่อมีการเปลี่ยนแปลงค่าที่เลือก
    // Form
    const handleSelectChangeForm = (value) => {
        setOptionsMessageFrom(value)
        if (value === "detail") {
            setOptionsMessageType([
                { id: 'PS', name: 'Department' },
                { id: 'DV', name: 'Division' },
            ]);
        } else if (value === "summary") {
            setOptionsMessageType([
                { id: 'DV', name: 'Division' },
                { id: 'GV', name: 'Group Division' },
            ]);
        }
        console.log("sendForm : " + value)
    };
    // Type
    const handleSelectChangeType = (value) => {
        setFormData(formData => ({
            ...formData,
            sendType: value
        }));

        console.log("sendType : " + value);
    };
    // Desc
    const handleSelectChangeDesc = (value) => {
        setFormData(formData => ({
            ...formData,
            sendCode: value,
        }));
    };

    // Data form
    const initialFormData = {
        sendEmpId: '',
        sendEmpName: '',
        sendCode: '',
        sendType: '',
        sendToken: '',
        sendActive: 0,
        sendMonday: 0,
        sendTuesday: 0,
        sendWednesday: 0,
        sendThursday: 0,
        sendFriday: 0,
        sendSaturday: 0,
        sendSunday: 0,
        sendDesc: ''
    };
    const [formData, setFormData] = useState(initialFormData);
    const handleCancel = () => {
        setFormData(initialFormData);
        window.location.reload();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Options Description
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchDataOptions = async () => {
        if (formData.sendType) {
            setLoading(true);
            try {
                let response;
                if (formData.sendType === 'PS') {
                    response = await axios.get('http://10.35.10.47:2003/api/FingerScanTime/GetProcess');
                } else if (formData.sendType === 'DV') {
                    response = await axios.get('http://10.35.10.47:2003/api/FingerScanTime/GetDivision');
                } else if (formData.sendType === 'GV') {
                    response = await axios.get('http://10.35.10.47:2003/api/FingerScanTime/GetGroupDivision');
                }
                setOptions(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleCheckboxChange = (value) => {
        setFormData(formData => ({
            ...formData,
            [value]: formData[value] ? 0 : 1
        }));
    };

    const [resIcon, setResIcon] = useState("");
    // Submit Form
    const handleSubmit = async (event) => {

        event.preventDefault(); // ป้องกันการโหลดหน้าใหม่เมื่อกด Submit ใน form

        if (formData != null) {

            try {

                let data = '';
                let response;
                if (optionsMessageFrom === 'detail') {
                    // สร้างลูปแบบ async ด้วย for...of
                    for (const code of formData.sendCode) {
                        const desc = options.filter(option => code.includes(option.id)).map(option => option.name);
                        try {
                            response = await axios.post('http://10.35.10.47:2003/api/FingerScanTime/LineTokenDetail/AddDetail', {
                                ...formData,
                                sendCode: code, // ใช้ค่า sendCode ในแต่ละรอบของลูป
                                sendDesc: desc[0]
                            });
                            if (response.data.startsWith("Add Detail : Register successfully.")) {
                                setResIcon(<CheckCircleTwoTone twoToneColor="#52c41a" />);
                            }
                            if (response.data === "Add Detail : You have registered before, please check your status.") {
                                setResIcon(<ExclamationCircleTwoTone twoToneColor="#eba92f" />);
                            }
                            console.log('Response:', response.data);
                            data += response.data + '\n';
                        } catch (error) {
                            console.error('Error:', error);
                        }
                    }
                    console.log('All data:', data);
                }
                if (optionsMessageFrom === 'summary') {
                    // สร้างลูปแบบ async ด้วย for...of
                    for (const code of formData.sendCode) {
                        const desc = options.filter(option => code.includes(option.id)).map(option => option.name);
                        try {
                            response = await axios.post('http://10.35.10.47:2003/api/FingerScanTime/LineTokenSummary/AddSummary', {
                                ...formData,
                                sendCode: code, // ใช้ค่า sendCode ในแต่ละรอบของลูป
                                sendDesc: desc[0]
                            });
                            console.log('Response:', response.data);
                            data += response.data + '\n';
                        } catch (error) {
                            console.error('Error:', error);
                        }
                    }
                    console.log('All data:', data);
                }

                // let data = '';
                // let response;
                // if (optionsMessageFrom === 'detail') {
                //     // response = await axios.post('http://10.35.10.47:2003/api/FingerScanTime/LineTokenDetail/AddDetail', formData);
                //     formData.sendCode.forEach(async code => {
                //         const desc = options.filter(option => code.includes(option.id)).map(option => option.name);
                //         response = await axios.post('http://10.35.10.47:2003/api/FingerScanTime/LineTokenDetail/AddDetail', {
                //             ...formData,
                //             sendCode: code, // ใช้ค่า sendCode ในแต่ละรอบของลูป
                //             sendDesc: desc[0]
                //         });
                //         console.log('Response:', response.data);
                //         setIsDataResponse(response.data);
                //         data += response.data

                //     });
                // }
                // if (optionsMessageFrom === 'summary') {
                //     // response = await axios.post('http://10.35.10.47:2003/api/FingerScanTime/LineTokenSummary/AddSummary', formData);
                //     formData.sendCode.forEach(async code => {
                //         const desc = options.filter(option => code.includes(option.id)).map(option => option.name);
                //         response = await axios.post('http://10.35.10.47:2003/api/FingerScanTime/LineTokenSummary/AddSummary', {
                //             ...formData,
                //             sendCode: code, // ใช้ค่า sendCode ในแต่ละรอบของลูป
                //             sendDesc: desc[0]
                //         });
                //         console.log('Response:', response.data);
                //         setIsDataResponse(response.data);
                //         data += response.data
                //     });
                // }

                console.log("data: ");
                console.log(data.trim());

                setIsDataResponse(data);
                setIsModalOpen(false);
                setIsModalOpenResponse(true);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        else {
            window.alert('Please input!');
        }
    };

    return (
        <Card
            title="HTC Finger scan time - Line App"
        >
            <Form
                {...formItemLayout}
                variant="filled"
                style={{
                    maxWidth: 1600,
                }}
            >
                <Form.Item
                    label="Employee ID"
                    name="empId"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}
                >
                    <Input type="text" name="sendEmpId" value={formData.sendEmpId} onChange={handleChange} placeholder="Employee ID" />
                </Form.Item>

                <Form.Item
                    label="Employee Name"
                    name="empName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}
                >
                    <Input type="text" name="sendEmpName" value={formData.sendEmpName} onChange={handleChange} placeholder="Employee Name" />
                </Form.Item>

                <Form.Item
                    label="Line Token"
                    name="lineToken"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}
                >
                    <Input type="text" name="sendToken" value={formData.sendToken} onChange={handleChange} placeholder="Line Token" />
                </Form.Item>

                <Form.Item
                    label="Send Form"
                    name="sendForm"
                    rules={[
                        {
                            required: true,
                            message: 'Please select an option!',
                        },
                    ]}
                >
                    <Select
                        placeholder="Select an option"
                        value={optionsMessageFrom}
                        onChange={handleSelectChangeForm}
                    >
                        <Option value={"detail"}>Time by person</Option>
                        <Option value={"summary"}>Summary by scan/all</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Send Type"
                    name="sendType"
                    rules={[
                        {
                            required: true,
                            message: 'Please select an option!',
                        },
                    ]}
                >
                    <Select
                        placeholder="Select an option"
                        value={formData.sendType}
                        onChange={handleSelectChangeType}
                    >
                        {optionsMessageType.map(option => (
                            <Option key={option.id} value={option.id}>{option.name}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Send Desc"
                    name="sendCode"
                    rules={[
                        {
                            required: true,
                            message: 'Please select an option!',
                        },
                    ]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Select an option"
                        loading={loading}
                        onClick={fetchDataOptions}
                        value={formData.sendCode}
                        onChange={handleSelectChangeDesc}
                    >
                        {options.map(option => (
                            <Option key={option.id} value={option.id}>
                                {option.name}
                            </Option>
                        ))}

                    </Select>
                </Form.Item>

                <Form.Item
                    label="Days of workday"
                >

                    <Checkbox
                        checked={formData.sendMonday}
                        onChange={() => handleCheckboxChange("sendMonday")}
                    >
                        Monday
                    </Checkbox>

                    <Checkbox
                        checked={formData.sendTuesday}
                        onChange={() => handleCheckboxChange("sendTuesday")}
                    >
                        Tuesday
                    </Checkbox>

                    <Checkbox
                        checked={formData.sendWednesday}
                        onChange={() => handleCheckboxChange("sendWednesday")}
                    >
                        Wednesday
                    </Checkbox>

                    <Checkbox
                        checked={formData.sendThursday}
                        onChange={() => handleCheckboxChange("sendThursday")}
                    >
                        Thursday
                    </Checkbox>

                    <Checkbox
                        checked={formData.sendFriday}
                        onChange={() => handleCheckboxChange("sendFriday")}
                    >
                        Friday
                    </Checkbox>
                </Form.Item>

                <Form.Item
                    label="Days of weekend"
                >
                    <Checkbox
                        checked={formData.sendSaturday}
                        onChange={() => handleCheckboxChange("sendSaturday")}
                    >
                        Saturday
                    </Checkbox>

                    <Checkbox
                        checked={formData.sendSunday}
                        onChange={() => handleCheckboxChange("sendSunday")}
                    >
                        Sunday
                    </Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 6,
                        span: 16,
                    }}
                >
                    <Flex
                        gap="small"
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={handleOpenModal}
                        >
                            Submit
                        </Button>

                        <Button
                            onClick={handleCancel}
                        >
                            Cancel

                        </Button>
                    </Flex>
                </Form.Item>

                <ModalConfirm
                    isOpen={isModalOpen}
                    isConfirm={handleSubmit}
                    isCloseModal={handleCloseModal}
                />
                <ModalResponse
                    isOpen={isModalOpenResponse}
                    isCloseModal={handleCloseModalResponse}
                    isResponse={isDataResponse}
                    isIcon={resIcon}
                />
            </Form>
        </Card>
    )
}

export default Register