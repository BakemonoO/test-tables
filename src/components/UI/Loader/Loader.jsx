import React from 'react'
import cls from './Loader.module.css'
import { useSelector } from 'react-redux'

function Loader() {

  const err = useSelector(state => state.tables.requestError)

  return (
    <div className={err ? cls.loader + ' ' + cls.error : cls.loader}>
      <div className={err ? cls.loader__circle + ' ' + cls.error : cls.loader__circle}></div>
      <div className={cls.loader__powder}></div>
      </div>
  )
}

export default Loader