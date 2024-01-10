import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { Menu, MenuItem, Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { setLocation } from "../../modules/reducers/character";


function BottomMenu() {

    const gameLocations = useSelector(store => store.gameLocations);
    const character = useSelector(store => store.character);
    const dispatch = useDispatch();
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [value, setValue] = useState(0);

    const handleMenuClick = (event) => {
        setMenuAnchor(event.currentTarget);
        };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    }

    const handleMenuItemClick = (menuItem) => {
        console.log('Clicked on ', menuItem);
        dispatch(setLocation(menuItem));
        handleMenuClose();
    };

return (
    <Paper
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
            elevation={3}
            >
            <BottomNavigation
                showLabels>
                  <BottomNavigationAction icon={<MenuIcon />} onClick={handleMenuClick} />
                  <BottomNavigationAction label="Stats" />
                  <BottomNavigationAction label="Home" />
                </BottomNavigation>
                <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}>
                    {gameLocations.city?.map((item) => (
                        <MenuItem key={item.id} onClick={() => handleMenuItemClick(item.id)}>{item.title}</MenuItem>
                    ))}

                    
                </Menu>
              </Paper>
    )
}

export default BottomMenu;