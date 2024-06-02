import React, { useState, useEffect } from 'react';
import {
  Box,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid
} from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';
import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";
import CustomToolbar from '../../../../components/custom-tool-bar';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../../axios-instance';
const Category = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [productData, setProductData] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const token = useSelector((state) => state.auth.user.accessToken);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get('http://localhost:5000/category');
      setProductData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = () => {
    setEditProduct({ name: "" }); 
    setOpenDialog(true);
    setIsNew(true);
  };

  const handleDelete = async () => {
    const selectedIDs = Array.from(new Set(selectionModel));
    try {
      await Promise.all(selectedIDs.map(id =>
        axios.delete(`http://localhost:5000/category/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ));
      setProductData(productData.filter((row) => !selectedIDs.includes(row.id)));
    } catch (err) {
      console.log(err);
    }
  };

  const handleModify = () => {
    const selectedProduct = productData.find(product => product.id === selectionModel[0]);
    setEditProduct(selectedProduct);
    setOpenDialog(true);
    setIsNew(false); 
  };

  const handleSaveChanges = async () => {
    const url = isNew ? 'http://localhost:5000/category' : `http://localhost:5000/category/${editProduct.id}`;
    const method = isNew ? axios.post : axios.put;
    try {
      const res = await method(url, editProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (isNew) {
        setProductData([...productData, res.data]);
      } else {
        const updatedProducts = productData.map(product =>
          product.id === editProduct.id ? editProduct : product
        );
        setProductData(updatedProducts);
      }
      setOpenDialog(false);
      setIsNew(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    setIsNew(false);
  };

  const handleChange = (event, field) => {
    setEditProduct(prev => ({ ...prev, [field]: event.target.value }));
  };

  const columns = [
    { field: 'id', headerName: 'Category ID', flex: 1 },
    { field: 'name', headerName: 'Category Name', flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header title="Category" subtitle="List of categories" />
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
          components={{
            Toolbar: (props) => <CustomToolbar {...props} onAdd={handleAdd} />
          }}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          componentsProps={{
            toolbar: {
              onAdd: handleAdd,
              onDelete: handleDelete,
              onModify: handleModify,
            },
          }}
        />
      </Box>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{isNew ? 'Add New Category' : 'Edit Category'}</DialogTitle>
        <DialogContent>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Category Name"
                variant="outlined"
                value={editProduct?.name || ''}
                onChange={(e) => handleChange(e, 'name')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
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

export default Category;
