import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptIcon from '@mui/icons-material/Receipt';
import CategoryIcon from '@mui/icons-material/Category';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useSelector } from "react-redux";
import axios from "axios";
import Toast from "react-hot-toast";
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const userInfo = useSelector((state) => state.auth.user.userInfo);
  const [profileImg, setProfileImg] = useState('../../assets/user.png');
  const [uploading, setUploading] = useState(false);
  const token = useSelector((state) => state.auth.user.accessToken);

  useEffect(() => {
    fetchProfileImg();
  }, []);

  const fetchProfileImg = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user/get-profile-img', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob'
      });
      const imageUrl = URL.createObjectURL(response.data);
      setProfileImg(imageUrl);
    } catch (error) {
      console.error('Failed to fetch profile image:', error);
    }
  };


  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
        const fileUrl = URL.createObjectURL(file);
        setProfileImg(fileUrl); 
        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
        try {
            const response = await axios.post('http://localhost:5000/user/upload-img-profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                }
            });

            setProfileImg(response.data.url); 
            Toast.success('Image uploaded successfully');
            window.location.reload();
        } catch (error) {
            console.error('Failed to upload image:', error);
            alert('Failed to upload image');
            setProfileImg('../../assets/user.png'); 
        } finally {
            URL.revokeObjectURL(fileUrl); 
            setUploading(false);
        }
    }
};





  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Users
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <label htmlFor="profile-upload">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={profileImg}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    style={{ display: 'none' }}
                    id="profile-upload"
                  />

                </label>
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {userInfo ? userInfo?.email.split('@')[0] : ""}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  user
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/user/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
             <Item
              title="Gestions user info"
              to="/user/info"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
        
            <Item
              title="Gestions Invoice"
              to="/user/invoice"
              icon={<ReceiptIcon />}
              selected={selected}
              setSelected={setSelected}
            />



          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
