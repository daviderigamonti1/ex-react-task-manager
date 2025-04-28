import { NavLink } from "react-router-dom"

export default function Header() {
    return (
        <nav>
            <NavLink to="/">Lista Task</NavLink>
            <NavLink to="/add">Aggiungi Task</NavLink>
        </nav>
    )
}