import React from 'react'
import cls from './FetchError.module.css'

function FetchError() {
  return (
    <div className={cls.error}>
      <h1>Прозошли ошибка запроса...</h1>
      <p>Попробуйте обновить страницу или зайти позже...</p>
    </div>
  )
}

export default FetchError