import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../../../components/Header";
import StatBox from "../../../../components/StatBox";
import { tokens } from "../../../../theme";
import useDashboardData from "../../../../hooks/useDashboardData";
import LineChart from "../../../../components/LineChart";
import PieChart from "../../../../components/PieChart";
import UserRolePieChart from "../../../../components/UserRolePieChart";
import BarChart from "../../../../components/BarChart";
import TopProducts from "../../../../components/top-products";
import Municipalite from "../../../../components/municipalite";
import MoneyByMunicipalite from "../../../../components/money-by-municipalite";
import MoneyByCountry from "../../../../components/money-by-country";
import Spec from "../../../../components/spec";
import Transport from "../../../../components/transport";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    averageInvoicesPerCategory,
    dailyUserActivity,
    exportInvoicesByStatus,
    totalExportAmount,
    totalProducts,
    totalUsers,
    userProfileCompletion,
    userRoleDistribution,
  } = useDashboardData();

  return (
    <Box m="20px">
      <Header title="Dashboard" subtitle="Welcome to your dashboard" />

      <Box display="flex" justifyContent="space-between">
        <StatBox title="Total Users" value={totalUsers} />
        <StatBox title="Profile Completion" value={`${userProfileCompletion}%`} />
        <StatBox title="Total Products" value={totalProducts} />
        <StatBox title="Total Export Amount" value={`$${totalExportAmount}`} />
      </Box>



      <hr />

      <Box mt="20px" display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
        <Box gridColumn="span 12" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Top product 5 sold products 
            </Typography>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <TopProducts />
          </Box>
        </Box>

        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
            percentage of Products by municipalite
            </Typography>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <Municipalite />
          </Box>
        </Box>
      
        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
            percentage of Products by transport
            </Typography>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <Transport />
          </Box>
        </Box>

        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
            percentage of Products by spec
            </Typography>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <Spec />
          </Box>
        </Box>

        <Box gridColumn="span 8" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
            Money by municipalite
            </Typography>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <MoneyByMunicipalite />
          </Box>
        </Box>
        <Box gridColumn="span 8" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
            Money by country
            </Typography>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <MoneyByCountry />
          </Box>
        </Box>

      

      

        <Box gridColumn="span 8" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Daily User Activity
            </Typography>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart data={dailyUserActivity} />
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

        <Box gridColumn="span 6" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Average Invoices Per Category
            </Typography>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <BarChart data={averageInvoicesPerCategory} />
          </Box>
        </Box>

        <Box gridColumn="span 6" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              User Role Distribution
            </Typography>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <UserRolePieChart data={userRoleDistribution} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
