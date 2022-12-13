import Home from "@material-ui/icons/Home"

export const screenRoutes = [
    {
        name: 'Home',
        path: '/',
        agentAccess: true,
        adminAccess: false,
        collaboratorAccess: true,
        auditorAccess: true,
        icon: <Home className="Sidenav__icon" fontSize="inherit"/>
    }
];