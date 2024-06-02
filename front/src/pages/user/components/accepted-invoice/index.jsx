import { Box, useTheme } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";
import CustomToolbar from '../../../../components/custom-tool-bar';
import { useSelector } from 'react-redux';
const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [userData, setUserData] = useState([]);

  const token = useSelector((state) => state.auth.user.accessToken);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/user-info/users',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);



  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "activity",
      headerName: "Activity",
      width: 130,
      valueGetter: (params) => params.row.userInfo && params.row.userInfo.activity ? params.row.userInfo.activity : "No Activity"
    },
    {
      field: "societeName",
      headerName: "Company Name",
      width: 150,
      valueGetter: (params) => params.row.userInfo ? params.row.userInfo.societeName : "No Data"
    },
    {
      field: "agentName",
      headerName: "Agent Name",
      width: 150,
      valueGetter: (params) => params.row.userInfo ? params.row.userInfo.agentName : "No Data"
    },
    {
      field: "societeLocation",
      headerName: "Company Location",
      width: 180,
      valueGetter: (params) => params.row.userInfo ? params.row.userInfo.societeLocation : "No Data"
    },
    {
      field: "legalForm",
      headerName: "Legal Form",
      width: 150,
      valueGetter: (params) => params.row.userInfo ? params.row.userInfo.legalForm : "No Data"
    },
    {
      field: "workshopLocation",
      headerName: "Workshop Location",
      width: 180,
      valueGetter: (params) => params.row.userInfo ? params.row.userInfo.workshopLocation : "No Data"
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 140,
      valueGetter: (params) => params.row.userInfo ? params.row.userInfo.phoneNumber : "No Data"
    },
    {
      field: "fax",
      headerName: "Fax",
      width: 130,
      valueGetter: (params) => params.row.userInfo ? params.row.userInfo.fax : "No Data"
    },
    {
      field: "storageLocation",
      headerName: "Storage Location",
      width: 180,
      valueGetter: (params) => params.row.userInfo ? params.row.userInfo.storageLocation : "No Data"
    },
    {
      field: "numberOfWorker",
      headerName: "Number of Workers",
      width: 160,
      valueGetter: (params) => params.row.userInfo ? params.row.userInfo.numberOfWorker : "No Data"
    },
    {
      field: "numberOfAdmin",
      headerName: "Number of Admins",
      width: 150,
      valueGetter: (params) => params.row.userInfo ? params.row.userInfo.numberOfAdmin : "No Data"
    },
    {
      field: "taxId",
      headerName: "Tax ID",
      width: 150,
      valueGetter: (params) => params.row.userInfo ? params.row.userInfo.taxId : "No Data"
    },
    {
      field: "diwanaId",
      headerName: "Customs ID",
      width: 150,
      valueGetter: (params) => params.row.userInfo ? params.row.userInfo.diwanaId : "No Data"
    },
    {
      field: "commercialId",
      headerName: "Commercial ID",
      width: 150,
      valueGetter: (params) => params.row.userInfo ? params.row.userInfo.commercialId : "No Data"
    },
    {
      field: "localType",
      headerName: "Local Type",
      width: 130,
      valueGetter: (params) => params.row.userInfo ? params.row.userInfo.localType : "No Data"
    },
    {
      field: "exportType",
      headerName: "Export Type",
      width: 130,
      valueGetter: (params) => params.row.userInfo ? params.row.userInfo.exportType : "No Data"
    }
  ];
  
  return (
    <Box m="20px">
      <Header title="Users" subtitle="Liste des utilisateurs" />
      <Box m="40px 0 0 0" height="75vh" sx={{
        "& .MuiDataGrid-root": { border: "none" },
        "& .MuiDataGrid-cell": { borderBottom: "none" },
        "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
        "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
        "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
        "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": { color: `${colors.grey[100]} !important` },
      }}>
        <DataGrid
          checkboxSelection
          rows={userData}
          columns={columns}
          components={{ Toolbar: CustomToolbar }}
          componentsProps={{
            toolbar: {  showAddButton: false , showModifyButton :false, showDeleteButton :false }, 
          }}
        />
      </Box>
     
    </Box>
  );
};

export default Users;