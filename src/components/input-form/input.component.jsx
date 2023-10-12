import React from "react"



const Input = ( {label, ...props} ) =>{
    return(
        <>
            <label>{label}</label>
            <input {...props} style= {
                {
                    width: props.w,
                    height: props.h
                }
            }/>
        </>
    )
}


export default Input