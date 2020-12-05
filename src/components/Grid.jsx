import React, { useState, useEffect } from 'react';

// axios
import axios from 'axios';

// ag-grid
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';

// styles
import '../assets/styles/grid.scss';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

const Grid = () => {
	const [gridApi, setGridApi] = useState(null);

	const [gridColumnApi, setGridColumnApi] = useState(null);

	// row data from useEffect
	const [rowData, setRowData] = useState([]);

	const actionButton = (params) => {
		console.log(params);
		alert(
			`${params.data.name} was a ${params.data.success ? 'success' : 'failure'}`
		);
	};
	const columns = [
		{
			headerName: 'Flight Number',
			field: 'flight_number',
			checkboxSelection: true,
			headerCheckboxSelection: true,
			tooltipField: 'name',
			maxWidth: 200,
		},
		{
			headerName: 'Name',
			field: 'name',
			tooltipField: 'success',
			maxWidth: 250,
			cellClassRules: {
				successful: (params) => params.data.success === true,
				failure: (params) => params.data.success === false,
				unknown: (params) => params.data.success === null,
			},
		},
		// {
		// 	headerName: 'Success',
		// 	field: 'success',
		// 	 cellStyle: (params) =>
		// 	 	params.value ? { color: 'green' } : { color: 'red' },
		// 	cellClass: (params) => (params.value ? 'successful' : 'failure'),

		// },
		{
			headerName: 'Date',
			field: 'date_local',
			valueFormatter: (params) => new Date(params.value).toLocaleString(),
			maxWidth: 250,
		},
		{
			headerName: 'Details',
			field: 'details',
			filter: false,
		},
		{
			headerName: 'Core Landing Success',
			valueGetter: 'data.cores[0].landing_success',
		},
		{
			headerName: 'Action',
			field: 'name',
			filter: false,
			maxWidth: 100,
			cellRendererFramework: (params) => (
				<div>
					<button onClick={() => actionButton(params)}>Click Me</button>
				</div>
			),
		},
	];

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios('https://api.spacexdata.com/v4/launches');
				setRowData(result.data);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, []);

	function onGridReady(params) {
		setGridApi(params.api);
		setGridColumnApi(params.columnApi);
	}

	const defaultColDef = {
		sortable: true,
		filter: true,
		editable: true,
		floatingFilter: true,
		flex: 1,
	};

	const onExportClick = () => {
		gridApi.exportDataAsCsv();
	};

	//const rowSelectionType = 'multiple';

	const onSelectionChanged = (event) => {
		console.log(event.api.getSelectedRows());
	};

	// const isRowSelectable = (node) => {
	// 	return node.data ? node.data.flight_number % 2 === 0 : false;
	// };

	const onPaginationChange = (pageSize) => {
		gridApi.paginationSetPageSize(Number(pageSize));
	};

	return (
		<>
			<button onClick={() => onExportClick()}>Export</button>
			<select onChange={(e) => onPaginationChange(e.target.value)}>
				<option value="10">10</option>
				<option value="15">15</option>
				<option value="25">25</option>
				<option value="50">50</option>
			</select>
			<div className="ag-theme-alpine-dark table">
				<AgGridReact
					onGridReady={onGridReady}
					columnDefs={columns}
					defaultColDef={defaultColDef}
					rowData={rowData}
					enableBrowserTooltips
					//rowSelection={rowSelectionType}
					onSelectionChanged={onSelectionChanged}
					rowMultiSelectWithClick
					rowSelectionType="multiple"
					//isRowSelectable={isRowSelectable}
					pagination
					//paginationAutoPageSize
                    //paginationPageSize={10}
                   // sideBar
				></AgGridReact>
			</div>
		</>
	);
};

export default Grid;
