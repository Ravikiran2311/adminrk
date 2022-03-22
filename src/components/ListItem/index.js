import {Component} from 'react'

import {AiOutlineDelete} from 'react-icons/ai'
import './index.css'

class ListItem extends Component {
  onclickDeleteIcon = () => {
    const {onDeleteUser, UserData} = this.props
    const {id} = UserData
    onDeleteUser(id)
  }

  onclickCheckbox = event => {
    const {getCheckedItem, UserData} = this.props
    const {id} = UserData
    getCheckedItem(event.target.checked, id)
  }

  renderUserDetailsList = () => {
    const {UserData} = this.props
    const {name, email, role, action, id} = UserData
    return (
      <>
        <li className="UserList-Items-container">
          <input
            type="checkbox"
            className="checkbox-for-properties"
            onClick={this.onclickCheckbox}
            id={id}
            value={name}
          />
          <p className="UserId">{id}</p>
          <p className="User-name">{name}</p>
          <p className="User-email">{email}</p>
          <p className="User-role">{role}</p>
          <p className="list-item">{action}</p>
          <AiOutlineDelete
            className="delete-icon"
            onClick={this.onclickDeleteIcon}
            value={id}
            id={id}
          />
        </li>
      </>
    )
  }

  render() {
    return <>{this.renderUserDetailsList()}</>
  }
}
export default ListItem
