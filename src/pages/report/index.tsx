import React, {useEffect, useState} from "react";
import {getReport} from "../../utils/api";
import Loader from "../../components/Loader";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Header from "../../components/Header";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'id', width: 70, type: "number" },
    { field: 'employee_id', headerName: 'RQ', width: 70, type: "number" },
    { field: 'name', headerName: 'Співробітник', flex: 300 },
    { field: 'time', headerName: 'Час фіксації', flex: 150, type: "dateTime" },
];

const Report = () => {
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);

    const getReportList = () => {
        setLoading(true);
        getReport()
            .then(list => setList(list))
            .catch(() => setList([]))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        getReportList();
    }, []);

    return (
        <>
            {loading && <Loader />}
            <Header />
            <div style={{width: 800, margin: '0 auto'}}>
                <h2>Звіт</h2>
                <DataGrid
                    autoHeight
                    disableSelectionOnClick
                    columns={columns}
                    rows={list}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </div>
        </>
    );
}

export default Report;