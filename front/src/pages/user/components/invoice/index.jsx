import React, { useState, useEffect } from 'react';
import {
    Box, useTheme, Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Grid, MenuItem
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";
import CustomToolbar from '../../../../components/custom-tool-bar';

const UserInvoice = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [invoiceData, setInvoiceData] = useState([]);
    const [selectionModel, setSelectionModel] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editInvoice, setEditInvoice] = useState({});
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const token = useSelector(state => state.auth.user.accessToken);
    const trans = [
        "poste",
        "air",
        "tair"
    ];

    const delegations = [
        "SAYADA_LAMTA_BOU_HAJAR",
        "KSIBET_EL_MEDIOUNI",
        "KSAR_HELAL",
        "JEMMAL",
        "SAHLINE",
        "MONASTIR",
        "MOKNINE",
        "OUERDANINE",
        "TEBOULBA",
        "ZERAMDINE",
        "BEKALTA",
        "BEMBLA",
        "BENI_HASSEN"
    ];
    const coun = [ 
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Qatar",
        "South Korea",
        "Republic of the Congo",
        "Romania",
        "Russia",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Slovakia",
        "Slovenia",
        "South Africa",
        "South Sudan",
        "Spain",
        "Sudan",
        "Sweden",
        "Switzerland",
        "Syria",
        "Tunisia",
        "Turkey",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "Uruguay"
    ];
    
    useEffect(() => {
        fetchInvoices();
        fetchProducts();
        fetchCategories();
    }, [token]);

    const flattenInvoiceData = (invoices) => {
        return invoices.map(invoice => ({
            ...invoice,
            productName: invoice.product.name,
        }));
    };

    const fetchInvoices = async () => {
        try {
            const response = await axios.get('http://localhost:5000/invoice/myinvoices', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const flattenedData = flattenInvoiceData(response.data);
            setInvoiceData(flattenedData);
        } catch (error) {
            console.error('Failed to fetch invoices:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/product', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/category', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCategories(response.data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    const handleAdd = () => {
        setEditInvoice({
           exporter: "", status: false, societe: "",
            societelocation: "", municipalite: "", quantity: "", price: "",transport:"", 
            factDate: new Date().toISOString().slice(0, 10),
            productId: '', categoryId: ''
        });
        setOpenDialog(true);
    };

    const handleSaveChanges = async () => {
        const url = 'http://localhost:5000/invoice';
        try {
            const response = await axios.post(url, editInvoice, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const newInvoice = {
                ...response.data,
                productName: products.find(p => p.id === response.data.productId)?.name || ''
            };
            setInvoiceData([...invoiceData, newInvoice]);
            setOpenDialog(false);
        } catch (error) {
            console.error('Failed to save invoice:', error);
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
            setInvoiceData(invoiceData.filter(row => !selectedIDs.includes(row.id)));
        } catch (error) {
            console.error('Failed to delete invoice:', error);
        }
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleChange = (event, field) => {
        setEditInvoice(prev => ({ ...prev, [field]: event.target.value }));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'productName', headerName: 'Products', width: 200 },
        { field: 'exporter', headerName: 'Exporter', width: 150 },
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
        { field: 'numFact', headerName: 'Invoice Number', width: 130 },
        { field: 'societe', headerName: 'Company', width: 150 },
        { field: 'societelocation', headerName: 'Company Location', width: 200 },
        { field: 'municipalite', headerName: 'Municipality', width: 120 },
        { field: 'transport', headerName: 'transport', width: 120 },
        { field: 'quantity', headerName: 'Quantity', width: 100 },
        { field: 'price', headerName: 'Price', width: 110 },
        { field: 'factDate', headerName: 'Invoice Date', type: 'date', width: 180 },
        { field: 'createdAt', headerName: 'Created At', type: 'date', width: 180 },
    ];

    return (
        <Box m="20px">
            <Header title="Invoice" subtitle="List of Invoices" />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": { border: "none" },
                    "& .MuiDataGrid-cell": { borderBottom: "none" },
                    "& .name-column--cell": { color: colors.greenAccent[300] },
                    "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
                    "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
                    "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
                    "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
                }}
            >
                <DataGrid
                    checkboxSelection
                    rows={invoiceData}
                    columns={columns}
                    components={{ Toolbar: CustomToolbar }}
                    onSelectionModelChange={(newSelectionModel) => {
                        setSelectionModel(newSelectionModel);
                    }}
                    componentsProps={{
                        toolbar: { onAdd: handleAdd, onDelete: handleDelete, showModifyButton: false, showAddButton: true, showDeleteButton: true },
                    }}
                />
            </Box>
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>{editInvoice?.id ? "Edit Invoice" : "Add Invoice"}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <br />
                            <TextField
                                fullWidth
                                label="Invoice Number"
                                variant="outlined"
                                value={editInvoice?.numFact || ''}
                                onChange={(e) => handleChange(e, 'numFact')}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <br />
                            <TextField
                                fullWidth
                                label="Exporter"
                                variant="outlined"
                                value={editInvoice?.exporter || ''}
                                onChange={(e) => handleChange(e, 'exporter')}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                     
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Company"
                                variant="outlined"
                                value={editInvoice?.societe || ''}
                                onChange={(e) => handleChange(e, 'societe')}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Company Location"
                                variant="outlined"
                                value={editInvoice?.societelocation || ''}
                                onChange={(e) => handleChange(e, 'societelocation')}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                fullWidth
                                label="Municipality"
                                variant="outlined"
                                value={editInvoice?.municipalite || ''}
                                onChange={(e) => handleChange(e, 'municipalite')}
                                InputLabelProps={{ shrink: true }}
                            >
                                {delegations.map((delegation) => (
                                    <MenuItem key={delegation} value={delegation}>
                                        {delegation.replace(/_/g, ' ')}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                fullWidth
                                label="transport"
                                variant="outlined"
                                value={editInvoice?.transport || ''}
                                onChange={(e) => handleChange(e, 'transport')}
                                InputLabelProps={{ shrink: true }}
                            >
                                {trans.map((trans) => (
                                    <MenuItem key={trans} value={trans}>
                                        {trans.replace(/_/g, ' ')}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                fullWidth
                                label="country"
                                variant="outlined"
                                value={editInvoice?.country || ''}
                                onChange={(e) => handleChange(e, 'country')}
                                InputLabelProps={{ shrink: true }}
                            >
                                {coun.map((coun) => (
                                    <MenuItem key={coun} value={coun}>
                                        {coun.replace(/_/g, ' ')}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Quantity"
                                variant="outlined"
                                value={editInvoice?.quantity || ''}
                                onChange={(e) => handleChange(e, 'quantity')}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Price"
                                variant="outlined"
                                value={editInvoice?.price || ''}
                                onChange={(e) => handleChange(e, 'price')}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Invoice Date"
                                variant="outlined"
                                value={editInvoice?.factDate || new Date().toISOString().slice(0, 10)}
                                onChange={(e) => handleChange(e, 'factDate')}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                fullWidth
                                label="Product"
                                value={editInvoice?.productId || ''}
                                onChange={(e) => handleChange(e, 'productId')}
                                variant="outlined"
                            >
                                {products.map((product) => (
                                    <MenuItem key={product.id} value={product.id}>
                                        {product.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                fullWidth
                                label="Category"
                                value={editInvoice?.categoryId || ''}
                                onChange={(e) => handleChange(e, 'categoryId')}
                                variant="outlined"
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSaveChanges} color="primary" variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserInvoice;