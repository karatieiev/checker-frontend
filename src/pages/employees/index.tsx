import React, {useEffect, useState} from "react";
import {getEmployees} from "../../utils/api";
import Loader from "../../components/Loader";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Header from "../../components/Header";
import {useNavigate} from "react-router-dom";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'QR', width: 70 },
    { field: 'name', headerName: 'Співробітник', flex: 300 },
    { field: 'position', headerName: 'Посада', flex: 200 },
    { field: 'date_of_birth', headerName: 'День народження', flex: 150 },
];

const Employees = () => {
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const navigate = useNavigate();

    const getEmployeesList = () => {
        setLoading(true);
        getEmployees()
            .then(list => setList(list))
            .catch(() => setList([]))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        getEmployeesList();
    }, []);

    return (
        <>
            {loading && <Loader />}
            <Header />
            <h2>Співробітники</h2>
            <DataGrid
                autoHeight
                columns={columns}
                rows={list}
                pageSize={10}
                rowsPerPageOptions={[10]}
                onRowDoubleClick={params => navigate(`/employees/${params.id}`, { replace: false })}
            />
        </>
    );
}

export default Employees;