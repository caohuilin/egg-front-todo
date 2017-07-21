import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Spin, Checkbox, Input } from 'antd';
import * as actions from './redux/actions';

import 'antd/dist/antd.min.css';
import './style.less';

const { Header, Sider, Content } = Layout;

export const formatTimestamp = (timeStamp, isReturn = false) => {
  const date = new Date(timeStamp);
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const seconds =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  if (isReturn) return `${year}-${month}-${day}`;
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const Loaders = () =>
  <div className="loader">
    <div className="pacman">
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>;

@connect(
  state => ({ todoList: state.todos.todosList }),
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
    collapsed: false,
    showAddArea: false,
    showEditArea: -1,
    content: '',
    editContent: ''
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  update = item => {
    if (item.finished) {
      this.props.actions.updateTodoList({ id: item._id, finished: false });
    } else {
      this.props.actions.updateTodoList({ id: item._id, finished: true });
    }
  };
  delete = item => {
    this.props.actions.updateTodoList({ id: item._id, deleted: true });
  };
  showAddArea = () => {
    this.setState({ showAddArea: !this.state.showAddArea });
  };
  showEditArea = i => {
    if (this.state.showEditArea === i) {
      this.setState({ showEditArea: -1 });
    } else {
      this.setState({ showEditArea: i });
    }
  };
  onChangeContent = e => {
    this.setState({ content: e.target.value });
  };
  handleEditChange = e => {
    this.setState({ editContent: e.target.value });
  };
  submit = () => {
    this.props.actions.addTodoList({ content: this.state.content });
    this.setState({ content: '', showAddArea: false });
  };
  editSubmit = () => {
    const item = this.props.todoList.list[this.state.showEditArea];
    this.props.actions.updateTodoList({
      id: item._id,
      content: this.state.editContent
    });
    this.setState({ editContent: '', showEditArea: -1 });
  };
  handleBlur = () => {
    this.setState({ showEditArea: -1 });
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
            <div className="title">
              <h2>我的目标</h2>
              <div className="add" onClick={this.showAddArea}>
                <Icon type="plus" />
              </div>
            </div>
            {this.state.showAddArea &&
              <div className="add-area">
                <Input
                  suffix={<Icon type="edit" />}
                  value={this.state.content}
                  onChange={this.onChangeContent}
                  onPressEnter={this.submit}
                />
              </div>}
            <div>
              <ul className="todo-list">
                {this.props.todoList.list.map((item, i) =>
                  <li key={i}>
                    <input
                      className="checkInput"
                      type="checkbox"
                      id={i}
                      checked={item.finished}
                    />
                    <label htmlFor={i} onClick={this.update.bind(null, item)}>
                      {this.state.showEditArea !== i && item.content}
                      {this.state.showEditArea === i &&
                        <Input
                          defaultValue={item.content}
                          onClick={e => {
                            e.stopPropagation();
                          }}
                          onChange={this.handleEditChange}
                          onPressEnter={this.editSubmit}
                          onBlur={this.handleBlur}
                        />}
                      {this.state.showEditArea !== i &&
                        <span className="time">
                          {formatTimestamp(new Date(item.createTime))}
                        </span>}
                    </label>
                    <div className="option">
                      <div
                        className="edit"
                        onClick={this.showEditArea.bind(null, i)}
                      >
                        <Icon type="edit" />
                      </div>
                      <div
                        className="close"
                        onClick={this.delete.bind(null, item)}
                      >
                        <Icon type="close" />
                      </div>
                    </div>
                  </li>
                )}
              </ul>
              {this.props.todoList.loading && <Loaders />}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default DefaultPage;
