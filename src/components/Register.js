import React, { useState } from 'react'
import {
    Button,
    Form,
    Input,
    Select,
    Card,
    Col,
    Row,
    Checkbox
} from 'antd';
import axios from 'axios';

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
    const [formData, setFormData] = useState({
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
    });
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

    // Submit Form
    const handleSubmit = async (event) => {

        event.preventDefault(); // ป้องกันการโหลดหน้าใหม่เมื่อกด Submit ใน form

        if (optionsMessageFrom) {

            try {
                // let responsesData = "";
                let response;
                if (optionsMessageFrom === 'detail') {
                    // response = await axios.post('http://10.35.10.47:2003/api/FingerScanTime/LineTokenDetail/AddDetail', formData);

                    formData.sendCode.forEach(async code => {
                        const desc = options.filter(option => code.includes(option.id)).map(option => option.name);
                        response = await axios.post('http://10.35.10.47:2003/api/FingerScanTime/LineTokenDetail/AddDetail', {
                            ...formData,
                            sendCode: code, // ใช้ค่า sendCode ในแต่ละรอบของลูป
                            sendDesc: desc[0]
                        });
                        console.log('Response:', response.data);
                        // responsesData += response.data
                    });
                }
                if (optionsMessageFrom === 'summary') {
                    // response = await axios.post('http://10.35.10.47:2003/api/FingerScanTime/LineTokenSummary/AddSummary', formData);

                    formData.sendCode.forEach(async code => {
                        const desc = options.filter(option => code.includes(option.id)).map(option => option.name);
                        response = await axios.post('http://10.35.10.47:2003/api/FingerScanTime/LineTokenSummary/AddSummary', {
                            ...formData,
                            sendCode: code, // ใช้ค่า sendCode ในแต่ละรอบของลูป
                            sendDesc: desc[0]
                        });
                        console.log('Response:', response.data);
                        // responsesData += response.data
                    });
                }
                // console.log('Response:', response.data);
                // window.alert(responsesData);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        else {
            window.alert('Please input!');
        }
    };

    return (

        <Row gutter={16}>
            <Col span={16}>
                <Card title="HTC Finger scan time - Line App">
                    <Form
                        {...formItemLayout}
                        variant="filled"
                        style={{
                            maxWidth: 600,
                        }}
                    >
                        <Form.Item
                            label="Employee Id"
                            name="empId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input!',
                                },
                            ]}
                        >
                            <Input type="text" name="sendEmpId" value={formData.sendEmpId} onChange={handleChange} />
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
                            <Input type="text" name="sendEmpName" value={formData.sendEmpName} onChange={handleChange} />
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
                            <Input type="text" name="sendToken" value={formData.sendToken} onChange={handleChange} />
                        </Form.Item>

                        <Form.Item
                            label="Send Form"
                            name="sendForm"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input!',
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
                                    message: 'Please input!',
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
                                    message: 'Please input!',
                                },
                            ]}
                        >
                            <Select
                                mode="multiple"
                                placeholder="Select an option"
                                loading={loading}
                                onClick={fetchDataOptions}

                                value={formData.sendCode}
                                // value={optionsMessageDesc}
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
                        // value={formData}
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
                            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Form.Item>

                    </Form>
                </Card>
            </Col>
        </Row>

    )
}

export default Register