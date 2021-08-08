import LandingPage from "../pages/LandingPage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import Analytics from "../pages/Analytics";

const authProtectedRoutes = [
    {path:"/home",      exact:true, component: Home},
    {path:"/analytics", exact:true, component:Analytics}
]

const publicRoutes = [
    {path:"/",      exact:true, component:LandingPage},
    {path:"/signin", exact:true, component:SignIn},
    {path:"/signup", exact:true, component:SignUp}
]

export {authProtectedRoutes,publicRoutes};