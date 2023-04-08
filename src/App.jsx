import './App.css'
import { useEffect } from 'react';
import Table from './components/Table';
import TableFilter from './components/TableFilter';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTables } from './store/tableSlice';
import PaginationTable from './components/PaginationTable';


function App() {

  const dispatch = useDispatch()

  const data = useSelector(state => state.tables.data)


useEffect(() => {
  if (data.length === 0) {
    dispatch(fetchTables())
  }
})

  return (
    <div className="App">
      <TableFilter/>
      <Table/>
      <PaginationTable/>
    </div>
  );
}

export default App;
