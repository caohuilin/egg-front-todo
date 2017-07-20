import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';
import * as actions from './redux/actions';

import 'antd/dist/antd.min.css';
import './style.less';

const { Header, Sider, Content } = Layout;

@connect(
  state => ({ todoList: state.todos.todosList}),
  dispatch => {
    return {
      actions: bindActionCreators(
        {
          ...actions
        },
        dispatch
      )
    };
  }
)
class DefaultPage extends Component {
  static propTypes = {};
  state = {
    collapsed: false
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  componentDidMount() {
    this.props.actions.getTodoList();
  }
  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="bars" />
              <span>List</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280
            }}
          >
            <h2>我的目标</h2>
            <div>
              <ul>
                {
                  this.props.todoList.list.map((item, i) => (
                    <li>
                      {item.content}
                    </li>
                  ))
                }
              </ul>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default DefaultPage;
