import React, {useEffect, useRef, useState} from "react";
import {getEmployees, postEmployee, putEmployee} from "../../utils/api";
import Loader from "../../components/Loader";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../../components/Header";
import {Box, Button, Card, CardContent, Grid, TextField} from "@mui/material";
import {fileToDataUri} from "../../utils/helpers";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const EmployeeCard = () => {
    const {id} = useParams();
    const [employee, setEmployee] = useState({
        id: 0,
        name: "",
        date_of_birth: "",
        position: "",
        photo: ""
    });
    const [wasChanged, setWasChanged] = useState(false);
    const [loading, setLoading] = useState(id !== 'new');
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (id && id !== 'new') getEmployees(id)
            .then(result => setEmployee(result[0]))
            .catch(() => setEmployee({id: 0, name: '', date_of_birth: '', position: '', photo: ''}))
            .finally(() => setLoading(false));
    }, []);

    const onPhotoUpload = () => {
        if (inputRef.current?.files?.length)
        {
            fileToDataUri(inputRef.current.files[0]).then(result => {
                // @ts-ignore
                const photo = result.slice(result.indexOf(",")+1);
                setEmployee({...employee, photo});
                setWasChanged(true);
            });
        }
    }

    const handleTextFieldChange = (field: string, value: any) => {
        setEmployee({...employee, [field]: value});
        setWasChanged(true);
    }

    const handleSave = () => {
        setLoading(true);
        if (id === 'new')
            postEmployee(employee).then(() => navigate("/web/employees", { replace: false }));
        else
            putEmployee(employee).then(() => navigate("/web/employees", { replace: false }));
    }

    return (
        <>
            {loading && <Loader />}
            <Header />
            {!loading &&
                <Grid container direction="column" alignItems="center">
                    <Grid item>
                        <h2 style={{width: 800}}>????????????????????????</h2>
                    </Grid>
                    <Grid item>
                        <Card sx={{maxWidth: 800}}>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Box sx={{pb: 2}}>
                                            <TextField
                                                label="id"
                                                value={employee.id}
                                                fullWidth
                                                disabled={true}
                                            />
                                        </Box>
                                        <Box sx={{pb: 2}}>
                                            <TextField
                                                label="????'??"
                                                value={employee.name}
                                                fullWidth
                                                onChange={(e) => handleTextFieldChange("name", e.target.value)}
                                            />
                                        </Box>
                                        <Box sx={{pb: 2}}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    label="???????? ????????????????????"
                                                    value={employee.date_of_birth}
                                                    inputFormat="yyyy-MM-dd"
                                                    onChange={(e) => handleTextFieldChange("date_of_birth", e)}
                                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                                />
                                            </LocalizationProvider>
                                        </Box>
                                        <Box>
                                            <TextField
                                                label="????????????"
                                                value={employee.position}
                                                fullWidth
                                                onChange={(e) => handleTextFieldChange("position", e.target.value)}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <img
                                            src={`data:image/jpeg;charset=utf-8;base64,${employee.photo}`}
                                            alt=""
                                            width={350}
                                            style={{float: 'right'}}
                                        />
                                        <Button
                                            component="label"
                                            style={{float: 'right'}}
                                        >
                                            ?????????????????????? ????????
                                            <input
                                                type="file"
                                                hidden
                                                ref={inputRef}
                                                onChange={onPhotoUpload}
                                            />
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    {wasChanged &&
                        <Grid item>
                            <div style={{width: 800, paddingTop: 20}}>
                                <Button
                                    variant="contained"
                                    style={{float: 'right'}}
                                    onClick={handleSave}
                                >
                                    ????????????????
                                </Button>
                            </div>
                        </Grid>
                    }
                </Grid>
            }
        </>
    );
}

export default EmployeeCard;