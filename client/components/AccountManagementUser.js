import React, {Component} from 'react'
import {Dropdown} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
//add middleware for url path
class AccountManagementUser extends Component {
  render() {
    return (
      <Dropdown text="Manage my account" align="right">
        <Dropdown.Menu>
          <Link to="/open_orders_user">
            <Dropdown.Item> Open Orders</Dropdown.Item>
          </Link>
          <Link to="/past_orders_user">
            <Dropdown.Item>Past Orders</Dropdown.Item>
          </Link>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default AccountManagementUser
