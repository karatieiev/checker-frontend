import React from "react";
import {LinearProgress} from "@mui/material";
import styles from "./Loader.module.scss";

const Loader = () => {
    return (
        <div className={styles.loader}>
            <LinearProgress />
        </div>
    );
}

export default Loader;