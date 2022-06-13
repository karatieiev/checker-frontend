import React, {useEffect, useState} from "react";
import {getEmployees} from "../../utils/api";
import Loader from "../../components/Loader";

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

    return (
        <>
            {loading && <Loader />}
        </>
    );
}

export default Employees;