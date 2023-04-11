import React from 'react'
import cls from './styles/Table.module.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Loader from './UI/Loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { reorder } from '../helper';
import { getTable } from '../store/tableSlice';
import FetchError from './error/FetchError';


function Table() {

  const array = useSelector(state => state.tables.data)

  const page = useSelector(state => state.tables.page)

  const keys = useSelector(state => state.tables.keys)

  const err = useSelector(state => state.tables.requestError)

  const dispatch = useDispatch()

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
  }
    const items = reorder(array[page - 1], result.source.index, result.destination.index)
    dispatch(getTable(items))
  }

  return (
    <div className={cls.table__adaptive}>
      { array.length > 0
      ? <table className={cls.table}>
      <thead>
        <tr>
          <th>Index</th>
          {keys.map(item => (
            item === 'dndId' 
            ? false
            : <th key={item}>{item}</th>
          ))}
        </tr>
      </thead>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <tbody {...provided.droppableProps} ref={provided.innerRef}>
            {array[page - 1].map((item, index) => (
              <Draggable key={item.dndId} draggableId={item.dndId} index={index}>
                {provided => (
                  <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <td>{index + 1 + (10 * (page - 1))}</td>
                    {Object.entries(item).map(([key, value]) => (
                      keys.includes(key) === false || key === 'dndId'
                      ? false
                      : <td key={key}>{value}</td>
                    ))}
                  </tr>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </tbody>
          )}
        </Droppable>
      </DragDropContext>
    </table>
      : <Loader/>
      }
      { err 
      ? <FetchError/>
      : false}
      
</div>
)}

export default Table