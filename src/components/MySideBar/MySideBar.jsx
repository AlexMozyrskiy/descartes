import React from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Layout, Menu } from 'antd';
import {
  LaptopOutlined,
  FileExcelOutlined,
  VideoCameraOutlined,
  FileTextOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const { SubMenu } = Menu;
const { Sider } = Layout;

const MySideBar = () => {
  return (
    <Sider className='site-layout-background' width={300}>
      <Menu mode='inline' defaultSelectedKeys={['1']} defaultOpenKeys={['1']} style={{ height: '100%' }}>
        <Menu.Item key='1' icon={<VideoCameraOutlined />}>
          <NavLink to='/'>Ведомость учета неисправностей ВСП</NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default MySideBar;
