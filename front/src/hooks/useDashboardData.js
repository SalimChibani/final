import { useEffect, useState } from "react";
import axiosInstance from "../axios-instance";

const useDashboardData = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [newUsersByPeriod, setNewUsersByPeriod] = useState(0);
  const [userProfileCompletion, setUserProfileCompletion] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [averageProductsPerUser, setAverageProductsPerUser] = useState(0);
  const [totalExportInvoices, setTotalExportInvoices] = useState(0);
  const [exportInvoicesByStatus, setExportInvoicesByStatus] = useState([]);
  const [totalExportAmount, setTotalExportAmount] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [averageInvoicesPerCategory, setAverageInvoicesPerCategory] = useState([]);
  const [dailyUserActivity, setDailyUserActivity] = useState([]);
  const [userRoleDistribution, setUserRoleDistribution] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await Promise.allSettled([
          axiosInstance.get('kpis/total-users'),
          axiosInstance.get('kpis/user-profile-completion'),
          axiosInstance.get('kpis/total-products'),
          axiosInstance.get('kpis/average-products-per-user'),
          axiosInstance.get('kpis/total-export-invoices'),
          axiosInstance.get('kpis/export-invoices-by-status'),
          axiosInstance.get('kpis/total-export-amount'),
          axiosInstance.get('kpis/total-categories'),
          axiosInstance.get('kpis/average-invoices-per-category'),
          axiosInstance.get('kpis/daily-user-activity'),
          axiosInstance.get('kpis/user-role-distribution'),
          axiosInstance.get('kpis/top-products'),
        ]);

        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            switch (index) {
              case 0:
                setTotalUsers(result.value.data.totalUsers);
                break;
              case 1:
                setUserProfileCompletion(result.value.data.percentageWithInfo);
                break;
              case 2:
                setTotalProducts(result.value.data.totalProducts);
                break;
              case 3:
                setAverageProductsPerUser(result.value.data.averageProductsPerUser);
                break;
              case 4:
                setTotalExportInvoices(result.value.data.totalExportInvoices);
                break;
              case 5:
                setExportInvoicesByStatus(result.value.data.invoicesByStatus);
                break;
              case 6:
                setTotalExportAmount(result.value.data.totalExportAmount);
                break;
              case 7:
                setTotalCategories(result.value.data.totalCategories);
                break;
              case 8:
                setAverageInvoicesPerCategory(result.value.data.invoiceCountByCategory);
                break;
              case 9:
                setDailyUserActivity(result.value.data.dailyUserActivity);
                break;
              case 10:
                setUserRoleDistribution(result.value.data.userRolesDistribution);
                break;
              case 11:
                setTopProducts(result.value.data.topProducts);
                break;
              default:
                break;
            }
          } else {
            console.error(`Error fetching data for request ${index}:`, result.reason);
          }
        });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return {
    totalUsers,
    userProfileCompletion,
    totalProducts,
    averageProductsPerUser,
    totalExportInvoices,
    exportInvoicesByStatus,
    totalExportAmount,
    totalCategories,
    averageInvoicesPerCategory,
    dailyUserActivity,
    userRoleDistribution,
    topProducts,
  };
};

export default useDashboardData;
