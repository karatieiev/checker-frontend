import React, {useEffect, useState} from "react";
import {getEmployees} from "../../utils/api";
import Loader from "../../components/Loader";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Header from "../../components/Header";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Співробітник', flex: 300 },
    { field: 'position', headerName: 'Посада', flex: 200 },
    { field: 'date_of_birth', headerName: 'День народження', flex: 150 },
];

const Employees = () => {
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);

    const getEmployeesList = () => {
        setLoading(true);
        getEmployees()
            .then(list => {
                setList(list);
                setLoading(false);
            })
            .catch(() => {
                setList([]);
                setLoading(false);
            });
    }

    useEffect(() => {
        getEmployeesList();
    }, []);

    console.log(list);

    return (
        <>
            {loading && <Loader />}
            <Header />
            <DataGrid
                autoHeight
                disableSelectionOnClick
                columns={columns}
                rows={list}
                pageSize={10}
                rowsPerPageOptions={[10]}
            />
        </>
    );
}

export default Employees;