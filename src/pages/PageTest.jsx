import React, {useState, useEffect} from 'react'
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';

export default function PageTest() {

  console.log($.fn.dataTable.version);
  
  useEffect(() => {
    const table = $('#example');

    if (table.length) {
      // 初始化 DataTables
      table.DataTable({
        paging: true,
        searching: true,
        info: true,
      });
    }

    // 清理：避免重複初始化
    return () => {
      if ($.fn.DataTable.isDataTable('#example')) {
        table.DataTable().destroy(true);
      }
    };
  }, []);


  return (
    <div className='min-h-96'>
      <h1>DataTables 範例</h1>

      <table id="example" className="display" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>名字</th>
            <th>年齡</th>
            <th>職業</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>25</td>
            <td>軟體工程師</td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>30</td>
            <td>產品經理</td>
          </tr>
          <tr>
            <td>Sam Wilson</td>
            <td>28</td>
            <td>設計師</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

