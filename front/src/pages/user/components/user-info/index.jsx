import React, { useState, useEffect } from 'react';
import { Box, useTheme, TextField, Button, MenuItem, Select, InputLabel } from '@mui/material';
import axios from 'axios';
import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";
const { useSelector } = require("react-redux");

const UserInfo = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [userData, setUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const token = useSelector((state) => state.auth.user.accessToken);

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        try {
            const res = await axios.get('http://localhost:5000/user-info', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserData(res.data);
            setIsEditing(!!res.data);
        } catch (err) {
            console.error('Failed to fetch user info:', err);
        }
    };

    const handleSave = async () => {
        const url = isEditing ? `http://localhost:5000/user-info` : 'http://localhost:5000/user-info';
        const method = isEditing ? axios.put : axios.post;
        try {
            await method(url, userData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('User info saved successfully');
            fetchUserInfo(); 
        } catch (error) {
            console.error('Failed to save user info:', error);
            alert('Failed to save user info');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <Box m="20px">
            <Header title="User Info" />
            <Box
                m="40px"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    maxWidth: '500px'
                }}
            >
                <TextField
                    label="Societe Name"
                    variant="outlined"
                    name="societeName"
                    value={userData.societeName}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                />
                <TextField
                    label="Agent Name"
                    variant="outlined"
                    name="agentName"
                    value={userData.agentName}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                />
                <TextField
                    label="Societe Location"
                    variant="outlined"
                    name="societeLocation"
                    value={userData.societeLocation}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                />
                <TextField
                    label="Legal Form"
                    variant="outlined"
                    name="legalForm"
                    value={userData.legalForm}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                />
                <TextField
                    label="Activity"
                    variant="outlined"
                    name="activity"
                    value={userData.activity}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                />
                <TextField
                    label="Workshop Location"
                    variant="outlined"
                    name="workshopLocation"
                    value={userData.workshopLocation}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                />
                <TextField
                    label="Phone Number"
                    variant="outlined"
                    name="phoneNumber"
                    value={userData.phoneNumber}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                />
                <TextField
                    label="Storage Location"
                    variant="outlined"
                    name="storageLocation"
                    value={userData.storageLocation}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                />
                <TextField
                    label="Fax"
                    variant="outlined"
                    name="fax"
                    value={userData.fax}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                />
                <TextField
                    label="Number of Admin"
                    variant="outlined"
                    name="numberOfAdmin"
                    value={userData.numberOfAdmin}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                />
                <TextField
                    label="Number of Worker"
                    variant="outlined"
                    name="numberOfWorker"
                    value={userData.numberOfWorker}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                />
                <TextField
                    label="Tax ID"
                    variant="outlined"
                    name="taxId"
                    value={userData.taxId}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                />
                <TextField
                    label="Diwana ID"
                    variant="outlined"
                    name="diwanaId"
                    value={userData.diwanaId}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                />
                <TextField
                    label="Commercial ID"
                    variant="outlined"
                    name="commercialId"
                    value={userData.commercialId}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                />
                <InputLabel id="localType-label">Local Type</InputLabel>
                <Select
                    labelId="localType-label"
                    value={userData.localType}
                    onChange={handleChange}
                    name="localType"
                    fullWidth
                >
                    <MenuItem value="Full">Full</MenuItem>
                    <MenuItem value="Partial">Partial</MenuItem>
                </Select>

                <InputLabel id="exportType-label">Export Type</InputLabel>
                <Select
                    labelId="exportType-label"
                    value={userData.exportType}
                    onChange={handleChange}
                    name="exportType"
                    fullWidth
                >
                    <MenuItem value="Owned">Owned</MenuItem>
                    <MenuItem value="Rent">Rent</MenuItem>
                </Select>
                <InputLabel id="spec-label">Spec</InputLabel>
                <Select
                    labelId="spec-label"
                    value={userData.spec}
                    onChange={handleChange}
                    name="spec"
                    fullWidth
                >
                    <MenuItem value="transiteur">Transiteur</MenuItem>
                    <MenuItem value="transporteur">Transporteur</MenuItem>
                    <MenuItem value="societe_de_commerce">Société de commerce</MenuItem>
                </Select>
                <Button variant="contained" color="primary" onClick={handleSave}>
                    {isEditing ? 'Update Info' : 'Add User'}
                </Button>
            </Box>
        </Box>
    );
};

export default UserInfo;
