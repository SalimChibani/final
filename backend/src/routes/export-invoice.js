const router = require('express').Router();

const {
    addInvoice,
    getInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
    setActiveStatus,
    getMyOwnInvoice } = require('../controller/export-invoice');

router.post('/', addInvoice);
router.get('/', getInvoices);
router.get('/myinvoices',getMyOwnInvoice );

router.get('/:id', getInvoiceById);
router.put('/:id', updateInvoice);
router.delete('/:id', deleteInvoice);
router.put('/activate/:id', setActiveStatus);


module.exports = router;