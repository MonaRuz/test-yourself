import React from 'react'
import PropTypes from 'prop-types'

export default function Button ({textColor="black", bgColor="white", onClick, children, borderWidth=1,borderRad=0,childrenSize=18,className}) {
    const buttonStyle = {
		padding: "10px",
		margin: "20px",
		fontSize: `${childrenSize}px`,
		minWidth: "150px",
		height: "45px",
		color: textColor,
		backgroundColor: bgColor,
		border: `${borderWidth}px solid ${textColor}`,
        borderRadius:`${borderRad}px`
	}

	const invertedStyle = {
		color: bgColor,
		backgroundColor: textColor,
		border: `${borderWidth}px solid ${bgColor}`,
	}
    
	return (
        <button
        style={buttonStyle}
        onMouseEnter={(e) => {
            e.currentTarget.style.color = invertedStyle.color
            e.currentTarget.style.backgroundColor = invertedStyle.backgroundColor
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.color = buttonStyle.color
            e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor
        }}
        onClick={onClick}
		>
			{children}
		</button>
	)
}

Button.propTypes = {
    textColor:PropTypes.string,
    bgColor:PropTypes.string,
    borderWidth:PropTypes.number,
    borderRad:PropTypes.number,
    childrenSize:PropTypes.number,
    onClick:PropTypes.func,
    className:PropTypes.string
}


