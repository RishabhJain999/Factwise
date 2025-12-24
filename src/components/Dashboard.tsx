import { useMemo, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, type ColDef, type GridApi, type GridReadyEvent } from 'ag-grid-community';
import { EMPLOYEES, type Employee } from '../model/data';
import {
   StatusRenderer,
   SkillsRenderer,
   RatingRenderer,
   EmployeeNameRenderer
} from './CellRenderers';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
ModuleRegistry.registerModules([AllCommunityModule]);

const EmployeeDashboard = () => {
   const rowData = useMemo(() => EMPLOYEES, []);
   const [gridApi, setGridApi] = useState<GridApi | null>(null);
   const columnDefs = useMemo<ColDef<Employee>[]>(
      () => [
         {
            headerName: '#',
            field: 'id',
            width: 60,
            pinned: 'left',
            checkboxSelection: true,
            headerCheckboxSelection: true
         },
         {
            headerName: 'Employee',
            field: 'firstName',
            minWidth: 140,
            valueGetter: (params) => `${params.data?.firstName} ${params.data?.lastName}`,
            cellRenderer: EmployeeNameRenderer
         },
         { headerName: 'Department', field: 'department', minWidth: 140 },
         { headerName: 'Location', field: 'location', width: 120 },
         {
            headerName: 'Salary',
            field: 'salary',
            width: 130,
            valueFormatter: (params) => `$${params.value?.toLocaleString() || 'N/A'}`,
         },
         {
            headerName: 'Performance',
            field: 'performanceRating',
            width: 140,
            cellRenderer: RatingRenderer,
         },
         {
            headerName: 'Projects',
            field: 'projectsCompleted',
            width: 110,
         },
         {
            headerName: 'Status',
            field: 'isActive',
            width: 110,
            cellRenderer: StatusRenderer,
         },
         {
            headerName: 'Skills',
            field: 'skills',
            width: 220,
            cellRenderer: SkillsRenderer,
            filter: false,
            sortable: false
         },
         {
            headerName: 'Manager',
            field: 'manager',
            minWidth: 130,
         }
      ],
      []
   );

   const defaultColDef = useMemo(() => ({
      resizable: true,
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
   }), []);

   const onGridReady = useCallback((event: GridReadyEvent) => {
      setGridApi(event.api);
   }, []);

   const exportData = useCallback(() => {
      gridApi?.exportDataAsCsv({ fileName: 'factwise-employees.csv' });
   }, [gridApi]);

   return (
      <div className=" p-6 bg-gray-50">
         <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl  p-8 mb-8">
               <div className="flex justify-between items-end">
                  <div>
                     <h1 className="text-4xl font-bold text-gray-900 mb-2">Employee Dashboard</h1>
                     <p className="text-xl text-gray-600">
                        FactWise Assigment • {EMPLOYEES.length} employees • Client-side AG Grid
                     </p>
                  </div>
                  <button
                     onClick={exportData}
                     className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                     Export CSV
                  </button>
               </div>
            </div>
            <div
               className="ag-theme-alpine"
            >
               <AgGridReact
                  rowData={rowData}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  pagination={true}
                  paginationPageSize={15}
                  paginationPageSizeSelector={[10, 15, 20]}
                  domLayout="autoHeight"
                  rowSelection="multiple"
                  animateRows={true}
                  onGridReady={onGridReady}
               />
            </div>
         </div>
      </div>
   );
};

export default EmployeeDashboard;
