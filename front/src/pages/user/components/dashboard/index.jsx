import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../../../components/Header";
import StatBox from "../../../../components/StatBox";
import { tokens } from "../../../../theme";
import axiosInstance from "../../../../axios-instance";
import PieChart from "../charts/PieChart";
import BarChart from "../charts/BarChart";
import PieChart2 from '../../../../components/PieChart2';

const UserDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [totalExportInvoices, setTotalExportInvoices] = useState(0);
  const [totalExportAmount, setTotalExportAmount] = useState(0);
  const [exportInvoicesByStatus, setExportInvoicesByStatus] = useState([]);
  const [exportInvoicesByCountry, setExportInvoicesByCountry] = useState([]);

  const [topProducts, setTopProducts] = useState([]);
  const [topCountries, setTopCountries] = useState([]); // New state for top countries
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [totalQuantityExported, setTotalQuantityExported] = useState(0);
  const [totalPriceByUser, setTotalPriceByUser] = useState([]);

  useEffect(() => {
    fetchTotalExport();
    fetchExportInvoicesByStatus();
    fetchExportInvoicesByCountry();
    fetchTopProductsForUser();
    fetchTopCountriesForUser(); // Fetch top countries data
    fetchNumberOfInvoices();
    fetchTotalQuantityExported();
    fetchTotalPriceByUser();
  }, []);

  async function fetchTotalExport() {
    try {
      const result = await axiosInstance.get('user-kpis/total-export');
      setTotalExportInvoices(result.data.totalExportInvoices);
      setTotalExportAmount(result.data.totalSpent);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchExportInvoicesByStatus() {
    try {
      const result = await axiosInstance.get('user-kpis/export-invoices-by-status');
      setExportInvoicesByStatus(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchExportInvoicesByCountry() {
    try {
      const result = await axiosInstance.get('user-kpis/export-invoices-by-country');
      setExportInvoicesByCountry(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchTopProductsForUser() {
    try {
      const result = await axiosInstance.get('user-kpis/top-products-for-user');
      setTopProducts(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchTopCountriesForUser() {
    try {
      const result = await axiosInstance.get('user-kpis/top-countries-for-user');
      setTopCountries(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchNumberOfInvoices() {
    try {
      const result = await axiosInstance.get('user-kpis/number-of-invoices');
      setTotalInvoices(result.data.total_invoices);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchTotalQuantityExported() {
    try {
      const result = await axiosInstance.get('user-kpis/total-quantity-exported');
      setTotalQuantityExported(result.data.total_quantity_exported);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchTotalPriceByUser() {
    try {
      const result = await axiosInstance.get('user-kpis/total-price-by-user');
      setTotalPriceByUser(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box m="20px">
      <Header title="Dashboard" subtitle="Welcome to your dashboard" />

      <Box display="flex" justifyContent="space-between">
        <StatBox title="Total Export Invoices" value={totalExportInvoices} />
        <StatBox title="Total Export Amount" value={`$${totalExportAmount}`} />
        <StatBox title="Total Invoices" value={totalInvoices} />
        <StatBox title="Total Quantity Exported" value={totalQuantityExported} />
      </Box>

      <hr />

      <Box mt="20px" display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
        <Box gridColumn="span 8" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Top Products by Quantity
            </Typography>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <BarChart data={topProducts} />
          </Box>
        </Box>
        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Export Invoices by Status
            </Typography>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <PieChart data={exportInvoicesByStatus} />
          </Box>
        </Box>
        

        {/* Add the section for top countries */}
        
      </Box>
    </Box>
  );
};

export default UserDashboard;
