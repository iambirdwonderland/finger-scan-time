import Register from './Register';
import React from 'react';
import { Layout, theme } from 'antd';
const { Header, Content, Footer } = Layout;
// const items = new Array(15).fill(null).map((_, index) => ({
//   key: index + 1,
//   label: `nav ${index + 1}`,
// }));

function Main() {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {/* <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    // defaultSelectedKeys={['2']}
                    // items={items}
                    style={{
                        flex: 1,
                        minWidth: 0,
                    }}
                /> */}
            </Header>
            <Content
                style={{
                    padding: '0 48px',
                }}
            >
                {/* <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Register />
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                ©2024 Created by Information Technology Department - Haier Electric (Thailand) PCL 
            </Footer>
        </Layout>
    )
}

export default Main