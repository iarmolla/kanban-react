import React from 'react'
import { Link } from "react-router-dom"
import '../styles/error.css'

function Error() {
    return (
        <div className="container">
            <div>
                <p className="container-error">404</p>
            </div>
            <h2 className="container-title">
                Parece que has encontrado la puerta a la gran nada
            </h2>
            <p class="container-paragraph">¡Lo siento por eso! Visite la página de inicio para llegar a donde necesita ir.</p>
            <Link to={'/'} className="container-link">Volver!</Link>
        </div>
    )
}

export default Error