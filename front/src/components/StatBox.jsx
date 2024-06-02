import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const StatBox = ({ title, value, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box 
      width="100%" 
      m="0 30px" 
      p="20px" 
      bgcolor={colors.primary[700]} 
      borderRadius="8px"
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
    >
      <Box display="flex" alignItems="center">
        {icon}
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: colors.grey[100], ml: 2 }}
        >
          {title}
        </Typography>
      </Box>
      <Box mt="16px" ml="14px">
        <Typography 
          variant="h5" 
          fontWeight="500"
          sx={{ color: colors.greenAccent[500] }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
