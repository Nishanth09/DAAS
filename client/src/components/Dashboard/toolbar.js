import React, { useState, useEffect } from "react";
import "./style-toolbar.css";

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails, getSelectedDataset } from "../../redux/actions/dashboardAction";
import Axios from 'axios';


export function Toolbar() {
    let {datasetDetails} = useSelector(state => state.dashboard.userDetails);
    const [datasetNames, setDatasetNames] = useState([]);
    const dispatch = useDispatch();
    useEffect(async () => {
        await dispatch(getUserDetails({"username":"karthik"}));
        async function fetchData() {
            let data = {
                "username": "karthik"
            }
            const response = await Axios.get("http://localhost:5001/api/userProfile", {
                params: data
            }, (err, res) => {
                if (err) {
                    return null;
                }
                return res.data;
            });
            console.log("res = ", response.data['datasetDetails'][1]);
            let dNames = response.data['datasetDetails'][1];
            let resultDetails = [];
            for (let i = 0; i < dNames.length; i++) {
                let current = dNames[i].split(".");
                resultDetails.push(current[0]);
            }
            setDatasetNames(resultDetails);
        }
        fetchData();
      }, []);

    const handleDatasetName = (name, index) => {
        console.log("name = ", name, index);
        const data = {"datasetName": name, "datasetid": datasetDetails[0][index]};
        console.log("data = ", data);
        dispatch(getSelectedDataset(data));

    }
    if (datasetNames.length > 0){
        console.log("dataset details = ", datasetNames);
    }
    return (
        <div className="toolbar">
            <div style={{textAlign:"center"}}>
                <h3 style={{fontWeight:'bold'}}>DAAS</h3>
                <DropdownButton id="dropdown-item-button" title="Select the dataset" variant="secondary" menuVariant="dark" >
                {datasetNames.map((name, index) => {
              return <Dropdown.Item key = {index} as="button" onClick={() => handleDatasetName(name, index)}>{name}</Dropdown.Item>;
            })}
                </DropdownButton>
                < hr/>
            </div>
        </div>
    )
}