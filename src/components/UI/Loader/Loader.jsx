import React from 'react'
import cls from './Loader.module.css'

function Loader() {
  return (
    <div className={cls.loader}>
      <div className={cls.loader__circle}></div>
      <div className={cls.loader__powder}></div>
      </div>
  )
}

export default Loader