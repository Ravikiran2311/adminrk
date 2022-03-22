import './index.css'

const Pagination = props => {
  const {UserList, PageHandler, currentPage, maxPageLimit, minPageLimit} = props

  const pageNumber = []

  for (let i = 1; i < Math.ceil(UserList.length) / 10; i += 1) {
    pageNumber.push(i)
  }

  const ClickPageNumber = event => {
    PageHandler(event.target.value)
  }

  return (
    <>
      {pageNumber.map(each => {
        if (each < maxPageLimit + 1 && each > minPageLimit) {
          return (
            <>
              <li
                className={currentPage === each ? 'active' : 'each-pageNumber'}
                onClick={ClickPageNumber}
                id={each}
                value={each}
              >
                {each}
              </li>
            </>
          )
        }
        return ''
      })}
    </>
  )
}

export default Pagination
