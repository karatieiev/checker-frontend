import React, {useEffect, useState} from "react";
import {deleteEmployee, getEmployees} from "../../utils/api";
import Loader from "../../components/Loader";
import {DataGrid, GridColDef, GridSelectionModel} from '@mui/x-data-grid';
import Header from "../../components/Header";
import {useNavigate} from "react-router-dom";
import {Button, Grid} from "@mui/material";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'QR', width: 70, type: "number" },
    { field: 'name', headerName: 'Співробітник', flex: 300 },
    { field: 'position', headerName: 'Посада', flex: 200 },
    { field: 'date_of_birth', headerName: 'День народження', flex: 150, type: "date" },
];

const Employees = () => {
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const navigate = useNavigate();
    const [selectedEmployee, setSelectedEmployee] = useState<GridSelectionModel>();

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

    const handleDelete = () => {
        if (selectedEmployee?.length) {
            setLoading(true);
            deleteEmployee(selectedEmployee[0].toString()).then(() => getEmployeesList());
        }
    }

    return (
        <>
            {loading && <Loader />}
            <Header />
            <div style={{width: 800, margin: '0 auto'}}>
                <Grid container direction="row">
                    <Grid item>
                        <h2>Співробітники</h2>
                    </Grid>
                    <Grid item xs={7}></Grid>
                    <Grid item>
                        <div style={{paddingTop: '10px'}}>
                            <Button
                                onClick={() => navigate("/web/employees/new", { replace: false })}
                            >
                                Додати
                            </Button>
                        </div>
                    </Grid>
                    <Grid item>
                        <div style={{paddingTop: '10px'}}>
                            <Button
                                onClick={handleDelete}
                            >
                                Видалити
                            </Button>
                        </div>
                    </Grid>
                </Grid>
                <DataGrid
                    autoHeight
                    columns={columns}
                    rows={list}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    onSelectionModelChange={(e) => setSelectedEmployee(e)}
                    onRowDoubleClick={params => navigate(`/web/employees/${params.id}`, { replace: false })}
                />
            </div>
        </>
    );
}

export default Employees;