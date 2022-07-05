import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import { MenuObject, User } from "../../model/models";
import { Box, IconButton, Menu, styled, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { generateUserMenuItems } from "../../model/menuItems";

const CustomMenuTypography = styled(Typography)({
  color: grey["800"],
  fontWeight: 600,
});
const RolesTypography = styled(Typography)({
  color: grey["800"],
  display: "block",
  fontWeight: 600,
});
export const MenuUtente = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const user: User = useSelector((state: RootState) => state.user);
  const userMenuItems = generateUserMenuItems();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const go = (menu: MenuObject) => {
    setAnchorEl(null);
    navigate(menu.path);
  };

  return (
    <Box>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <CustomMenuTypography variant="body2">{`${user.username}`}</CustomMenuTypography>
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {userMenuItems.map((menu: MenuObject) => (
          <MenuItem key={menu.path} onClick={() => go(menu)}>
            {menu.icon} {menu.menuLabel}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
