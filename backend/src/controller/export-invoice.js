const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addInvoice = async (req, res) => {
    const invoiceData = req.body;
    const image = req.file; // Access uploaded image file

    const userId = req.user.id;
    try {
        const newInvoice = await prisma.exportInvoice.create({
            data: {
                exporter: invoiceData.exporter,
                numFact: invoiceData.numFact,
                societe: invoiceData.societe,
                societelocation: invoiceData.societelocation,
                country: invoiceData.country,
                quantity: invoiceData.quantity,
                price: parseFloat(invoiceData.price),
                factDate: new Date(invoiceData.factDate), // Ensure the date is correctly formatted
                status: invoiceData.status,
                productId: invoiceData.productId,
                categoryId: invoiceData.categoryId,
                municipalite: invoiceData.municipalite,
                transport: invoiceData.transport,
                userId: userId,
                exportImage: image ? image.path : null, // Save image path if uploaded
            }
        });
        res.status(200).json(newInvoice);
    } catch (error) {
        console.error('Error creating invoice:', error);
        throw error;
    }
}

const getInvoices = async (req, res) => {
    try {
        const invoices = await prisma.exportInvoice.findMany({
            include: {
                user: {
                    select: { email: true } 
                },
                product: {
                    select: { name: true } 
                },
                category: {
                    select: { name: true } 
                }
            }
        });
        
        if (!invoices.length) {
            return res.status(404).json({ error: 'No invoices found' });
        }
        
        const reshapedInvoices = invoices.map(invoice => ({
            ...invoice,
            userName: invoice.user.email,
            categoryName: invoice.category.name,
            productName: invoice.product.name,
            userId: undefined,
            categoryId: undefined,
            productId: undefined,
            user: undefined, 
            category: undefined, 
        }));

        res.status(200).json(reshapedInvoices);
    } catch (error) {
        console.error('Error getting invoices:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getInvoiceById = async (req, res) => {
    const invoiceId = req.params.id;
    try {
        const invoice = await prisma.exportInvoice.findUnique({
            where: {
                id: parseInt(invoiceId)
            }
        });
        res.status(200).json(invoice);
    } catch (error) {
        console.error('Error getting invoice:', error);
        throw error;
    }
}

const updateInvoice = async (req, res) => {
    const invoiceId = req.params.id;
    const invoiceData = req.body;
    try {
        const updatedInvoice = await prisma.exportInvoice.update({
            where: {
                id: parseInt(invoiceId)
            },
            data: {
                ...invoiceData
            }
        });
        res.status(200).json(updatedInvoice);
    } catch (error) {
        console.error('Error updating invoice:', error);
        throw error;
    }
}

const deleteInvoice = async (req, res) => {
    const invoiceId = req.params.id;
    try {
        const deletedInvoice = await prisma.exportInvoice.delete({
            where: {
                id: parseInt(invoiceId)
            }
        });
        res.status(200).json(deletedInvoice);
    } catch (error) {
        console.error('Error deleting invoice:', error);
        throw error;
    }
}

const setActiveStatus = async (req, res) => {
    const invoiceId = req.params.id;  
    try {
        const updatedInvoice = await prisma.exportInvoice.update({
            where: {
                id: parseInt(invoiceId)
            },
            data: {
                status: true  
            }
        });
        res.status(200).json({
            message: 'Invoice status updated to active successfully',
            invoice: updatedInvoice
        });
    } catch (error) {
        console.error('Error setting invoice status to active:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getMyOwnInvoice = async (req, res) => {
    const userId = req.user.id;
    try {
        const invoices = await prisma.exportInvoice.findMany({
            where: {
                userId: userId
            },  
            include: {
                product: {
                    select: { name: true } 
                }
            }
        });
        if (!invoices.length) {
            return res.status(404).json({ error: 'No invoices found' });
        }
        res.status(200).json(invoices);
    } catch (error) {
        console.error('Error getting invoices:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    addInvoice,
    getInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
    setActiveStatus,
    getMyOwnInvoice
};