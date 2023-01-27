import DashboardIcon from '@mui/icons-material/Dashboard'
import ConstructionIcon from '@mui/icons-material/Construction'
import PersonIcon from '@mui/icons-material/Person'
import GroupIcon from '@mui/icons-material/Group';

export const sideData = [
    {
        title: "Dashboard",
        path:"/dashboard",
        icon: <DashboardIcon/>
    },
    {
        title: "Projects",
        path: "/projects",
        icon: <ConstructionIcon/>
    },
    {
        title: "User Profile",
        path: "/user_profile",
        icon: <PersonIcon/>
    }
]

export const adminSideData = [
    {
        title: "Dashboard",
        path:"/dashboard",
        icon: <DashboardIcon/>
    },
    {
        title: "Projects",
        path: "/projects",
        icon: <ConstructionIcon/>
    },
    {
        title: "User Profile",
        path: "/user_profile",
        icon: <PersonIcon/>
    },
    {
        title: "Manage Users",
        path: "/manage_users",
        icon: <GroupIcon/>
    }
]