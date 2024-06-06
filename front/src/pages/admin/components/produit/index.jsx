import React, { useState, useEffect } from 'react';
import { Box, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, Card, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import axios from 'axios';
import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Produits = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [productData, setProductData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const token = useSelector((state) => state.auth.user.accessToken);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await axios.get('http://localhost:5000/product', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const productsWithImages = await Promise.all(res.data.map(async (product) => {
                    const image = await fetchProductImage(product.id);
                    return { ...product, image };
                }));
                setProductData(productsWithImages);
            } catch (err) {
                console.log(err);
            }
        }
        fetchProducts();
    }, [token]);

    const fetchProductImage = async (productId) => {
        try {
            const res = await axios.get(`http://localhost:5000/product/get-product-img/${productId}`, {
                responseType: 'blob',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return URL.createObjectURL(res.data);
        } catch (err) {
            console.log(err);
            return null;
        }
    };

    const handleAdd = () => {
        setEditProduct({ name: "", productIdentifier: "" });
        setImage(null);
        setImagePreview(null);
        setOpenDialog(true);
    };

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            if (res.status === 200) {
                setProductData(productData.filter((row) => row.id !== id));
            } else {
                console.log('Failed to delete product');
            }
        } catch (err) {
            console.log('Error deleting product:', err);
        }
    };

    const handleModify = (product) => {
        setEditProduct(product);
        setImagePreview(product.image);
        setOpenDialog(true);
    };

    const handleSaveChanges = async () => {
        const isNew = !editProduct?.id;
        const url = isNew ? 'http://localhost:5000/product' : `http://localhost:5000/product/${editProduct.id}`;
        const method = isNew ? axios.post : axios.put;

        try {
            const res = await method(url, editProduct, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const newImage = image ? await handleImageUpload(res.data.id) : editProduct.image;
            const updatedProduct = { ...res.data, image: newImage };

            if (isNew) {
                setProductData([...productData, updatedProduct]);
            } else {
                const updatedProducts = productData.map(product =>
                    product.id === editProduct.id ? updatedProduct : product
                );
                setProductData(updatedProducts);
            }
            setOpenDialog(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleChange = (event, field) => {
        setEditProduct(prev => ({ ...prev, [field]: event.target.value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleImageUpload = async (productId) => {
        if (!image) return null;

        const formData = new FormData();
        formData.append('file', image);

        try {
            await axios.post(`http://localhost:5000/product/upload/${productId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            return URL.createObjectURL(image);
        } catch (err) {
            console.log(err);
            return null;
        }
    };

    const filteredProducts = productData.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.productIdentifier.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box m="20px">
            <Header title="Produit" subtitle="Liste des produits" />
            <Button variant="contained" color="primary" onClick={handleAdd} style={{ marginTop: '20px' }}>
                Add Product
            </Button>
            <TextField
                fullWidth
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ margin: '20px 0' }}
            />
            <Box
                m="40px 0 0 0"
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '20px'
                }}
            >
                {filteredProducts.map((product) => (
                    <Card key={product.id} sx={{ backgroundColor: colors.primary[400] }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {product.name}
                            </Typography>
                            <Typography variant="body2">
                                {product.productIdentifier}
                            </Typography>
                            {product.image && (
                                <img
                                    src={product.image}
                                    alt="Product Preview"
                                    style={{ width: '100%', marginTop: '16px' }}
                                />
                            )}
                        </CardContent>
                        <CardActions>
                            <IconButton onClick={() => handleModify(product)} color="primary">
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(product.id)} color="secondary">
                                <DeleteIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                ))}
            </Box>
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>{editProduct?.id ? "Edit Product" : "Add Product"}</DialogTitle>
                <DialogContent>
                    <br />
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Product Name"
                                variant="outlined"
                                value={editProduct?.name || ''}
                                onChange={(e) => handleChange(e, 'name')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Product Identifier"
                                variant="outlined"
                                value={editProduct?.productIdentifier || ''}
                                onChange={(e) => handleChange(e, 'productIdentifier')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                accept="image/*"
                                type="file"
                                onChange={handleImageChange}
                                style={{ marginTop: '16px' }}
                            />
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Product Preview"
                                    style={{ width: '100%', marginTop: '16px' }}
                                />
                            )}
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

export default Produits;
