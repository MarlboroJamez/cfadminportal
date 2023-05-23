import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import axios from 'axios';

import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';

function Table({
    data,
    cipcs
}) {
    const gridRef = useRef();
    const enableCharts = true;
    const enableRangeSelection = true;
    const [rowData, setRowData] = useState();
    const resultData = data;

    // Each Column Definition results in one Column.
    const [columnDefs, setColumnDefs] = useState([]);

    //OPEN EXPAND MODAL
    useEffect(() => {
        const colDefs = columnDefs;
        colDefs.length = 0
        if(resultData.verifications[0]){
            const keys = Object.keys(resultData.verifications[0]);
            keys.forEach(key => columnDefs.push({field: key}))
            setColumnDefs(colDefs)
            setRowData(() => resultData.verifications.map((res) => {
                return res
            }))
        }
        
    }, []);

    const onBtExcelExport = () => {
        gridRef.current.api.exportDataAsExcel();
    }

    const onBtCsvExport = () => {
        gridRef.current.api.exportDataAsCsv();
    }

    const cellClickedListener = useCallback( event => {
        console.log('cellClicked', event);
    }, []);

    const isFirstColumn = (params) => {
        var displayedColumns = params.columnApi.getAllDisplayedColumns();
        var thisIsFirstColumn = displayedColumns[0] === params.column;
        return thisIsFirstColumn;
    };

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 150,
            sortable: true,
            resizable: true,
            filter: true,
            pagination: true,
            enablePivot: true,
            enableRowGroup: true,
            enableValue: true,
            floatingFilter: true,
            headerCheckboxSelection: isFirstColumn,
            checkboxSelection: isFirstColumn,
        };
    }, []);

    const statusBar = useMemo(() => {
        return {
          statusPanels: [
            { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
            { statusPanel: 'agTotalRowCountComponent', align: 'center' },
            { statusPanel: 'agFilteredRowCountComponent' },
            { statusPanel: 'agSelectedRowCountComponent' },
            { statusPanel: 'agAggregationComponent' },
          ],
        };
    }, []);

    const onQuickFilterChanged = useCallback(() => {
        gridRef.current.api.setQuickFilter(
          document.getElementById('quickFilter').value
        );
    }, []);

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const handleDownloadLink = async (e) => {
        const bp = e.data['Business Partner'];
      
        let resultArray = cipcs.filter(a => a.download.includes(bp));
      
        try {
          fetch(`/get/cipc/report/${resultArray[0].download}`, {
            method: 'GET',
          })
          .then(response => response.blob()) // Convert the response to a Blob
          .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = resultArray[0].download; // Set the filename for the downloaded file
            a.click(); // Trigger the download
            window.URL.revokeObjectURL(url);
          });
        } catch (err) {
          console.log(err);
        }
      };
      

  return (
    <div className="h-116 w-full">
        <div className="flex justify-between w-full bg-emerald-700 rounded-tl rounded-tr p-2 shadow-md mb-4">
            <h1 className="pl-2 text-2xl text-white font-medium">
                Company Pre-Liminary Verifications
            </h1>

            <div className="flex">
            </div>
        </div>


        <input
        type="text"
        className="m-2 border border-neutral-200 mb-4 p-1 w-96 rounded bg-white"
        onInput={onQuickFilterChanged}
        id="quickFilter"
        placeholder="Search records..."/>

       {rowData ? (
        <AgGridReact
        className="ag-theme-balham"
        ref={gridRef}
        rowData={rowData.flat()} 
        columnDefs={columnDefs}
        animateRows={true} 
        onRowDoubleClicked={handleDownloadLink}
        defaultColDef={defaultColDef}
        sideBar={['filters','columns']}
        pagination={true}
        rowSelection={'multiple'}
        rowGroupPanelShow={'always'}
        debounceVerticalScrollbar={true}
        pivotPanelShow={'always'}
        enableCharts={enableCharts}
        enableRangeSelection={enableRangeSelection}
        suppressRowClickSelection={true}
        statusBar={statusBar}/>
       ):(
        <div className="w-full p-2 h-fit flex justify-center">
            <h1 className="text-lg flex">
                <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
                No records retrieved
            </h1>
        </div>
       )}

    </div>
  )
}

export default Table