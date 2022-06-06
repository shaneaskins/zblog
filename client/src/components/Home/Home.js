import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Header from "../Header/Header"

const Home = () => {
    const { user } = useAuth();
    const outlet = useOutlet();

    let pagesArray = [
        { label: "Home", path: "/" }
    ]

    if (user) {
        pagesArray = [ ...pagesArray,
            { label: "Dashboard", path: "/dashboard" } ]
    }
    else {
        pagesArray = [ ...pagesArray,
            { label: "Login", path: "/login" },
            { label: "Register", path: "/register" } ]
    }

    return(
        <>
            <Header pages={pagesArray}/>
            {outlet}
        </>
    )
}

export default Home;