import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import useKeyRoles from "../../hooks/useKeyRoles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import {purple} from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import {includes} from "lodash";
import {drawnerMenu, MenuFilter} from "../../models/menuItems";
import {PROJECT_BOZZA, PROJECT_EDIT, PROJECT_ROOT_NEW} from "../../constants/Routes";
import ModeIcon from "@mui/icons-material/Mode";
import AddIcon from "@mui/icons-material/Add";
import LinkIcon from "@mui/icons-material/Link";
import UserInfo from "./UserInfo";
import ConfirmDialog from "../../ui/ConfirmDialog";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import DesignServicesIcon from "@mui/icons-material/DesignServices";

const ProgettiMenu = ({filter, setFilter}) => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const role = useKeyRoles();
    const handleClick = (menu) => {
        if (menu.filter !== filter) {
            navigate(menu.path)
            setFilter(menu.filter)
        }
    };
    return (
        <>
            <UserInfo/>
            <Divider/>
            <List>
                <ListItem selected={location.pathname === "/progetti"}
                          disablePadding sx={{my: 2}}>
                    <ListItemButton onClick={() => handleClick({
                        path: "/",
                        filter: MenuFilter.TUTTI
                    })}>
                        <ListItemIcon><AppsOutlinedIcon color={'primary'} fontSize="small"/></ListItemIcon>
                        <ListItemText primary="Sfoglia progetti"/>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <Typography sx={{p: 2, fontWeight: 600}} variant={"button"} color={"inherit"}>
                    <span style={{color: purple[600]}}>I miei progetti</span>
                </Typography>
                {drawnerMenu.map(menu => (
                    <ListItem selected={location.pathname === menu.path} key={menu.menuLabel}
                              disablePadding>
                        <ListItemButton onClick={() => handleClick(menu)}>
                            <ListItemIcon>{menu.icon}</ListItemIcon>
                            <ListItemText primary={menu.menuLabel}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            {role === "ADMIN" && (
                <>
                    <Divider/>
                    <List>
                        <Typography sx={{p: 2, fontWeight: 600}} variant={"button"} color={"inherit"}>
                            <span style={{color: purple[600]}}>Gestisci progetti</span>
                        </Typography>
                        <ListItem selected={location.pathname === PROJECT_ROOT_NEW} disablePadding>
                            <ListItemButton onClick={() => setOpen(true)}>
                                <ListItemIcon>
                                    <AddIcon color={"primary"}/>
                                </ListItemIcon>
                                <ListItemText primary="Crea nuovo progetto"/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem selected={includes(location.pathname, "modifica")} disablePadding>
                            <ListItemButton onClick={() => {
                                navigate(PROJECT_EDIT);
                            }}>
                                <ListItemIcon>
                                    <ModeIcon color={"primary"}/>
                                </ListItemIcon>
                                <ListItemText primary="Modifica progetto"/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem selected={includes(location.pathname, "in-bozza")} disablePadding>
                            <ListItemButton onClick={() => {
                                navigate(PROJECT_BOZZA);
                            }}>
                                <ListItemIcon>
                                    <DesignServicesIcon color={"primary"}/>
                                </ListItemIcon>
                                <ListItemText primary="Progetti in bozza"/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </>
            )}
            <Divider/>
            <List>
                <Typography sx={{p: 2, fontWeight: 600}} variant={"button"} color={"inherit"}>
                    <span style={{color: purple[600]}}>Impostazioni account</span>
                </Typography>
                {["Exo User"].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <LinkIcon/>
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <ConfirmDialog
                body="Sei sicuro di voler creare un nuovo progetto?"
                open={open}
                handleClose={() => setOpen(false)}
                handleConfirm={() => {
                    navigate({to: PROJECT_ROOT_NEW});
                    setOpen(false);
                }}
            /></>
    );
};

export default ProgettiMenu;