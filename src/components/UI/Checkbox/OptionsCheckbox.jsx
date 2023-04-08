import React, { useState } from 'react'
import cls from './OptionsCheckbox.module.css'

function OptionsCheckbox({keysValue, addFilter}) {

  const [check, setCheck] = useState(false)

const checkIs = () => {
  setCheck(!check)
  addFilter(keysValue)
}

  return (
    <div className={cls.options__checkbox}>
      <label className={cls.label}>
      <input className={cls.checkbox} checked={check} onChange={checkIs} type="checkbox"/>
      <div className={cls.checkbox__value}>{keysValue}</div>
      </label>
    </div>
  )
}

export default OptionsCheckbox