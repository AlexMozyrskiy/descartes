import React from 'react';
// import { NavLink } from 'react-router-dom';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const MyHeader = () => {
  return (
    <Header className='header'>
      <h2 style={{ color: '#fff' }}>Декарт</h2>
      <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
        {/* <Menu.Item key='1'>
          <NavLink to='/hi'>Привет</NavLink>
        </Menu.Item> */}
      </Menu>
    </Header>
  );
};

export default MyHeader;
