import React from 'react'
import cls from './styles/PaginationTable.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { pageDown, pageUp } from '../store/tableSlice'

function PaginationTable() {

  const page = useSelector(state => state.tables.page)

  const limit = useSelector(state => state.tables.limitPages)

  const dispatch = useDispatch()

  return (
    <div className={cls.pagination__table}>
      <div className={page === 1 ? cls.pagination__item + ' ' + cls.hidden : cls.pagination__item}
      onClick={() => dispatch(pageDown())}
      >Prev</div>
      /
      <div className={page === limit ? cls.pagination__item + ' ' + cls.hidden : cls.pagination__item}
      onClick={() => dispatch(pageUp())}
      >Next</div>
    </div>
  )
}

export default PaginationTable