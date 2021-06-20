import React from 'react';
import Button from "@material-ui/core/Button";


const ActionButton = ({name, width, height, backgroundColor, color, handleClick, isInactive}) => {
    return (
        <Button
            style={{
            marginTop: '10px',
            width: width,
            height: height,
            backgroundColor: backgroundColor,
            color: color,
            }}
            disabled={isInactive}
            onClick={handleClick}
            >

            {name}
        </Button>
    )
}

export default ActionButton;
