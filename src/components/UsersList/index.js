import {Component} from 'react'

import ListItem from '../ListItem'

import './index.css'

import Pagination from '../Pagination'

class UsersList extends Component {
  state = {
    UserList: [],
    searchInput: '',
    currentPage: 1,
    ListItemsPerPage: 10,
    addStyle: false,
    checkedItemList: [],
    pageNumberLimit: 5,
    maxPageLimit: 4,
    minPageLimit: 0,
  }

  componentDidMount() {
    this.UserListApi()
  }

  onDeleteUserDetails = id => {
    const {UserList} = this.state
    const updatedUserList = UserList.filter(eachUser => id !== eachUser.id)
    this.setState({
      UserList: updatedUserList,
    })
  }

  searchUser = event => {
    this.setState({
      searchInput: event.target.value,
    })
    this.renderSearchResult()
  }

  renderSearchResult = () => {
    const {UserList, searchInput} = this.state
    const searchUserName = localStorage.getItem('UserName')
    console.log(searchUserName)
    const updatedUserList = UserList.filter(eachUser =>
      eachUser.name.toLowerCase().includes(searchInput.toLowerCase()),
    )
    this.setState({UserList: updatedUserList})
  }

  UserListApi = async () => {
    const ApiUrl =
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
    const options = {
      method: 'GET',
    }
    const responseFromApi = await fetch(ApiUrl, options)
      .then(response => response.json())
      .then(jsonData => jsonData)

    const UserDetailsArray = responseFromApi.map(eachUser => ({
      id: eachUser.id,
      name: eachUser.name,
      email: eachUser.email,
      role: eachUser.role,
    }))
    this.setState({
      UserList: UserDetailsArray,
    })
  }

  PageHandler = value => {
    this.setState({currentPage: value, addStyle: true})
  }

  NextPage = () => {
    const {
      maxPageLimit,
      minPageLimit,
      pageNumberLimit,
      currentPage,
    } = this.state
    this.setState(prev => ({
      currentPage: prev.currentPage + 1,
    }))
    if (currentPage > maxPageLimit) {
      this.setState({
        maxPageLimit: maxPageLimit + pageNumberLimit,
        minPageLimit: minPageLimit + pageNumberLimit,
      })
    }
  }

  getCheckedItem = (checked, id) => {
    this.setState(prev => ({
      checkedItemList: prev.checkedItemList.concat({checked, id}),
    }))
    this.onClickDeleteButton()
  }

  onClickBackButton = () => {
    this.setState({currentPage: 1})
    this.UserListApi()
  }

  render() {
    const {
      UserList,
      currentPage,
      ListItemsPerPage,
      addStyle,
      maxPageLimit,
      minPageLimit,
      searchInput,
    } = this.state
    return (
      <div className="background-container">
        <h1 className="heading-userList"> Details of Users</h1>
        <input
          type="search"
          className="searchBar"
          placeholder="Sort by name,email,or role"
          onChange={this.searchUser}
        />
        <ul className="UserList-container">
          <li className="listItems-container">
            <input type="checkbox" className="checkbox" />
            <p className="UserId">UserId</p>
            <p className="name">Name</p>
            <p className="email">Email</p>
            <p className="role">Role</p>
            <p className="actions">Actions</p>
          </li>
        </ul>
        {UserList.slice(
          (currentPage - 1) * ListItemsPerPage,
          currentPage * ListItemsPerPage,
        ).map(each => (
          <ListItem
            UserData={each}
            getSearchData={this.getSearchData}
            onDeleteUser={this.onDeleteUserDetails}
            getCheckedItem={this.getCheckedItem}
            searchInput={searchInput}
          />
        ))}
        <div>
          <div>
            <ul className="pageNumber">
              <button
                className="delete-button"
                type="button"
                onClick={this.onClickDeleteButton}
              >
                Delete Selected
              </button>
              <Pagination
                UserList={UserList}
                PageHandler={this.PageHandler}
                addStyle={addStyle}
                currentPage={currentPage}
                minPageLimit={minPageLimit}
                maxPageLimit={maxPageLimit}
              />
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default UsersList
