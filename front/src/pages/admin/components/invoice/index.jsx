import React, { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';
import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";
import CustomToolbar from '../../../../components/custom-tool-bar';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';

const Invoice = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [productData, setProductData] = useState([]);
    console.log("🚀 ~ Invoice ~ productData:", productData)
    const [selectionModel, setSelectionModel] = useState([]);
    const token = useSelector((state) => state.auth.user.accessToken);

    useEffect(() => {
        fetchProducts();
    }, [token]);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/invoice', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProductData(res.data);
        } catch (err) {
            console.error('Failed to fetch products:', err);
        }
    };

    const handleActivateInvoice = async (invoiceId) => {
        try {
            await axios.put(`http://localhost:5000/invoice/activate/${invoiceId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Invoice activated successfully');
            fetchProducts(); 
        } catch (error) {
            console.error('Failed to activate invoice:', error);
            alert('Failed to activate invoice');
        }
    };

    const handleDelete = async () => {
        const selectedIDs = Array.from(new Set(selectionModel));
        try {
            await Promise.all(selectedIDs.map(id =>
                axios.delete(`http://localhost:5000/invoice/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            ));
            setProductData(productData.filter((row) => !selectedIDs.includes(row.id)));
        } catch (err) {
            console.error('Failed to delete product:', err);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'productName', headerName: 'Product Name', width: 130 },
        { field: 'exporter', headerName: 'Exporter', width: 150 },
        { field: 'categoryName', headerName: 'Category Name', width: 130 },
        { field: 'userName', headerName: 'User ', width: 120 },
        {
            field: 'status',
            headerName: 'Status',
            type: 'boolean',
            width: 100,
            renderCell: (params) => (
                <p style={{
                    color: params.value ? 'green' : 'red',
                    fontWeight: 'bold',
                    margin: 0,
                    textAlign: 'center'
                }}>
                    {params.value ? 'Accepted' : 'Pending'}
                </p>
            )
        },
        {
            field: 'activate',
            headerName: 'Activate',
            sortable: false,
            width: 130,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={params.row.status} // Disables the button if the invoice is already active
                    onClick={() => handleActivateInvoice(params.id)}
                    style={{
                        maxWidth: '100px',
                        maxHeight: '30px',
                        minWidth: '100px',
                        minHeight: '30px'
                    }}
                >
                    Activate
                </Button>
            )
        },
        { field: 'numFact', headerName: 'Invoice Number', width: 130 },
        { field: 'societe', headerName: 'Company', width: 150 },
        { field: 'societelocation', headerName: 'Company Location', width: 200 },
        { field: 'quantity', headerName: 'Quantity', type: 'number', width: 100 },
        { field: 'price', headerName: 'Price', type: 'number', width: 110 },
        { field: 'factDate', headerName: 'Invoice Date', type: 'dateTime', width: 180 },
        { field: 'createdAt', headerName: 'Created At', type: 'dateTime', width: 180 },
    ];

    return (
        <Box m="20px">
            <Header title="Invoice" subtitle="Liste des invoices" />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": { border: "none" },
                    "& .MuiDataGrid-cell": { borderBottom: "none" },
                    "& .name-column--cell": { color: colors.greenAccent[300] },
                    "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.greenAccent[700], borderBottom: "none" },
                    "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
                    "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.greenAccent[700] },
                    "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": { color: `${colors.grey[100]} !important` },
                }}
            >
                <DataGrid
                    checkboxSelection
                    rows={productData}
                    columns={columns}
                    components={{ Toolbar: CustomToolbar }}
                    onSelectionModelChange={(newSelectionModel) => {
                        setSelectionModel(newSelectionModel);
                    }}
                    componentsProps={{
                        toolbar: { onDelete: handleDelete, showModifyButton: false, showAddButton: false, showDeleteButton: true, showActivateStatus: true },
                    }}
                />
            </Box>
        </Box>
    );
};

export default Invoice;
