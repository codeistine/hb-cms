import React, { useState, useEffect } from 'react';
import {
    IconButton,
    Typography,
    makeStyles,
    Menu as MenuComponent,
    MenuItem,
    Fade,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import * as actions from '../../redux/actions/index';

const useStyles = makeStyles({
    iconBtn: {
        borderRadius: '10px',
        color: '#000',
    }
})

const menuHeaders = (pathname, hanepBuhayID = "", customerName = "", customer = {}, uploadDate) => {
    let headers = {};
    // const transactionNumber = pathname.replace('/transactions/', "");
    // const transactionDateFormatted = uploadDate ? format(new Date(uploadDate), 'MM/dd/yyyy HH:mm') : null;

    if (pathname.indexOf('') === 0) {
        return headers = {
            title: ' ',
            subtitle: ``
        }
    } else {
        return headers;
    }
};

const Menu = ({ location, auth, match }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [headers, setHeaders] = useState({});
    const transaction = useSelector(state => state.hanepbuhayTransactions.transaction);
    const [menuOpen, setMenuOpen] = useState(null);

    const anchorMenuToElement = (event) => {
        setMenuOpen(event.currentTarget);
    }

    const unAnchorMenuToElement = () => {
        setMenuOpen(null);
    }

    useEffect(() => {
        let headers = menuHeaders(location.pathname)
        setHeaders(headers);

        if (location.pathname.indexOf('/transactions/') === 0 && transaction && transaction.user) {
            headers = menuHeaders(location.pathname, null, transaction.user.name, null, transaction.created_at)
            setHeaders(headers);
        }

    }, [location, transaction]);

    return (
        <div className="Menu">
            <div className="Menu__titles">
                <h3 className="heading-main m-bot-xs"> {headers.title} </h3>
                <p className="heading-subtitle"> {headers.subtitle} </p>
            </div>
            <div className="Menu__actions">
                <IconButton className={classes.iconBtn}>
                    <AccountCircleIcon style={{ marginRight: '1rem', fontSize: '2.2rem' }} />
                    <Typography>{window.sessionStorage.getItem("user")}</Typography>
                </IconButton>
            </div>

            <div className="Menu__actions">
                <IconButton className={classes.iconBtn} onClick={anchorMenuToElement}>
                    <LogoutIcon style={{ marginRight: '1rem', fontSize: '2rem' }} />
                </IconButton>

                <MenuComponent
                    id="menu-component"
                    anchorEl={menuOpen}
                    keepMounted
                    open={Boolean(menuOpen)}
                    onClose={unAnchorMenuToElement}
                    TransitionComponent={Fade}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <MenuItem onClick={() => dispatch(actions.onAuthLogout())}> LOG OUT </MenuItem>

                </MenuComponent>
            </div>
        </div>
    )
};

export default Menu;
