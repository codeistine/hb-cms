import React from 'react';
import SideNav from '../components/SideNav/SideNav.component';
import Menu from '../components/Menu/Menu.component';
import {
    ThemeProvider,
    createTheme,
} from '@material-ui/core';
import ReactNotificaton from 'react-notifications-component';

const withHeaderPages = (location) => {
    switch (location.pathname) {
        case '/login' : return false;
        default: return true;
    }
};

const customTheme = createTheme({
    overrides: {
        MuiInputLabel: {
            root: {
                fontSize: '1.5rem'
            }
        },
        MuiInput: {
            root: {
                fontSize: '1.3rem'
            }
        },
        MuiTableCell: {
            root: {
                fontSize: '1.3rem'
            }
        },
        MuiTab: {
            wrapper: {
                fontSize: '1.2rem',
                fontWeight: '700'
            }
        },
        MuiStepLabel: {
            alternativeLabel: {
                fontSize: '1.2rem'
            }
        },
        MuiInputBase: {
            input: {
                '&.Mui-disabled': {
                    color: '#0e153a',
                    fontWeight: 700
                }
            }
        },
        MuiStepIcon: {
            text: {
                fontSize: '1.5rem'
            }
        },
        MuiSvgIcon: {
            root: {
                fontSize: '2rem'
            }
        }
    }
})

const Layout = ({ children, location, auth }) => {
    const Header = withHeaderPages(location);

    return (
        <ThemeProvider theme={customTheme}>
        <ReactNotificaton />
         {Header && 
            <header>
                <SideNav auth={auth}/>
                <Menu location={location} auth={auth}/>
            </header>
            }
            <main className={Header ? 'Main' : null}>
                {children}
            </main>
        </ThemeProvider>
    )
};

export default Layout;
