import React from 'react';
import Button from "@material-ui/core/Button";


const ActionButton = ({name, width, height, backgroundColor, color, handleClick}) => {
    return (
        <Button
            style={{
            width: width,
            height: height,
            backgroundColor: backgroundColor,
            color: color}}

            onClick={handleClick}
            >

            {name}
        </Button>
    )
}

export default ActionButton;
