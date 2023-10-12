import React from "react"

import { Link } from 'react-router-dom';

//Build an error page with some styling and emojis
const Error = () => {
    return (
        <div 
            className="error" 
            styles = {{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "100vw",
                color: "white",
                backgroundColor: "black",
                fontSize: "2rem",
                textAlign: "center",
            }}
        >
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>Sorry, this page does not exist</p>
            <Link to="/">Back to Home</Link>
        </div>
    )
}


export default Error