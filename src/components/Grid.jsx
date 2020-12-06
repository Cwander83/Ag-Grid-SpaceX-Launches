import React, { useState, useEffect, useContext } from 'react';

// axios
import axios from 'axios';

// ag-grid
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';

// styles
import '../assets/styles/grid.scss';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

//context api
import { ModalContext } from '../context/modal.context.js';

// components
import Commands from './Commands';

const Grid = () => {
	let { setId, openModal } = useContext(ModalContext);

	const [gridApi, setGridApi] = useState(null);

	const [gridColumnApi, setGridColumnApi] = useState(null);

	// row data from useEffect
	const [rowData, setRowData] = useState([]);

	const columns = [
		{
			headerName: 'Flight Number',
			field: 'flight_number',
			checkboxSelection: true,
			headerCheckboxSelection: true,
			tooltipField: 'name',
			maxWidth: 200,
			tooltipShowDelay: 0,
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
		// ? different ways of changing cell styles
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
		// ? nested data in json
		// {
		// 	headerName: 'Core Landing Success',
		// 	valueGetter: 'data.cores[0].landing_success',
		// },
		{
			headerName: 'Details',
			field: 'details',
			filter: false,
			sortable: false,
			flex: 1,
		},
		{
			headerName: 'Rocket',
			field: 'rocket',
			filter: false,
			sortable: false,
			maxWidth: 160,
			cellRendererFramework: (params, query) => (
				<button
					className="button"
					onClick={() => rocketButton(params, (query = 'rocket'))}
				>
					Rocket Details
				</button>
			),
		},
		{
			headerName: 'Launchpad',
			field: 'launchpad',
			filter: false,
			sortable: false,
			maxWidth: 160,
			cellRendererFramework: (params, query) => (
				<button
					className="button"
					onClick={() => launchpadButton(params, (query = 'launchpad'))}
				>
					Launchpad Details
				</button>
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

	// button to send rocket id to
	const rocketButton = (params, query) => {
		console.log(params.value, query);
		setId({ id: params.value, query: query });
		openModal();
	};

	// button to send launchpad id to
	const launchpadButton = (params, query) => {
		console.log(params.value, query);
		setId({ id: params.value, query: query });
		openModal();
	};

	function onGridReady(params) {
		setGridApi(params.api);
		setGridColumnApi(params.columnApi);
	}

	const defaultColDef = {
		sortable: true,
		filter: true,
		editable: true,
		floatingFilter: true,
	};

	const onExportClick = () => {
		gridApi.exportDataAsCsv();
	};

	// setting multi row selection to multiple
	const rowSelectionType = 'multiple';

	const onSelectionChanged = (event) => {
		console.log(event.api.getSelectedRows());
	};

	const isRowSelectable = (node) => {
		return node.data;
	};

	const onPaginationChange = (pageSize) => {
		gridApi.paginationSetPageSize(Number(pageSize));
	};

	return (
		<>
			<Commands
				onPaginationChange={onPaginationChange}
				onExportClick={onExportClick}
			/>
			<div className="ag-theme-alpine-dark table">
				<AgGridReact
					onGridReady={onGridReady}
					columnDefs={columns}
					defaultColDef={defaultColDef}
					rowData={rowData}
					enableBrowserTooltips
					rowSelection={rowSelectionType}
					onSelectionChanged={onSelectionChanged}
					rowMultiSelectWithClick
					//isRowSelectable={isRowSelectable}
					pagination
					//paginationAutoPageSize
					paginationPageSize={10}
					// sideBar
				></AgGridReact>
			</div>
		</>
	);
};

export default Grid;
