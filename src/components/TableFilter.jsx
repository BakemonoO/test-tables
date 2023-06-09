import React, { useEffect, useState } from 'react'
import cls from './styles/TableFilter.module.css'
import OptionsCheckbox from './UI/Checkbox/OptionsCheckbox'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { changeKeys } from '../store/tableSlice'

function TableFilter() {

  const [filterKeys, setFilterKeys] = useState([])

  const dispatch = useDispatch()

  const request = useSelector(state => state.tables.requestFulfilled)

  const page = useSelector(state => state.tables.page)

  const staticKeys = useSelector(state => state.tables.staticKeys)

  useEffect(() => {
    if (request) {
      dispatch(changeKeys(filterKeys))
    }
  }, [filterKeys,request, page, dispatch])

  const addFilter = (item) => {
    if (filterKeys.includes(item)) {
      setFilterKeys((prev) => prev.filter(x => x !== item))
    } else {
      setFilterKeys([...filterKeys, item])
    }
  }

  return (
    <div className={cls.table__filter}>
      <div className={cls.title}>
        <h1>Cyber</h1>
        <h1>netically</h1>
        <h1>Inc</h1>
      </div>

      <div className={cls.filter__options}>
        {staticKeys.map(checkbox => (
          checkbox !== 'dndId'
          ? <OptionsCheckbox key={checkbox} keysValue={checkbox} addFilter={addFilter}/>
          : false
        ))}
      </div>
    </div>
  )
}

export default TableFilter