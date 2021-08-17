import { useSelector } from 'react-redux';
import { Layout } from 'antd';
import MyHeader from './components/MyHeader/MyHeader';
import MySideBar from './components/MySideBar/MySideBar';
import MyContent from './components/Content';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';

const { Content } = Layout;

const App = () => {
  // -------------------------------------------------------------- Хуки ---------------------------------------------------------------------------
  // const isWeAreOnTheWorkTab = useSelector(selectIsWeAreOnTheWorkTab);
  // -------------------------------------------------------------- / Хуки -------------------------------------------------------------------------

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <MyHeader />

      <Content style={{ padding: '0 50px' }}>
        <Layout className='site-layout-background' style={{ padding: '24px 0' }}>
          <MySideBar />

          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <MyContent />
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default App;
