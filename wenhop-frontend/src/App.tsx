import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Firebase, {withFirebase} from './firebase/index'
import {Layout, Menu} from 'antd'

// Pages
import Home from './views/home'
import Rocket from './views/rocket'

const { Header, Content, Footer } = Layout;

function App(props: {firebase: Firebase}) {
  return (
    <Layout>
      <Header className="header" style={siteContentColor}>
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Starship</Menu.Item>
          <Menu.Item key="2">Line-Up</Menu.Item>
          <Menu.Item key="3">Search</Menu.Item>
        </Menu>
      </Header>
      <Content style={siteContentStyles}>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/rocket/:name' component={Rocket} />
          </Switch>
        </Router>
        <div style={{marginTop: 50}} />
      </Content>
      <Footer style={{ textAlign: 'center' }}> ©2021 Wenhop Space</Footer>
    </Layout>
  );
}

export default withFirebase(App);

const siteContentStyles = {
  background: '#fff',
  padding: 15
}

const siteContentColor = {
  background: '#fff'
}