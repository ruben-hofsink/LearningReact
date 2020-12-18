import React from "react";

export const Square = ({onClick, value}) => (
    <button
        className="square"
        onClick={onClick}
    >
        {value}
    </button>
)
