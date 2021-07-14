import React from 'react'


function PopUps({ message, showPopUp }) {

    const clickHandler = () => {
        // CLOSE POPUP
        showPopUp("")
    }

    return (
        <div className="popUpPage" >
            <div className="modalBackground" onClick={clickHandler}></div>
            <div className="popUpContainer">
                <div className="popUpCloser pointer" onClick={clickHandler}>
                    <i className="fas fa-times text-white"></i>
                </div>
                <span className="text-primary">{message}</span>
            </div>
        </div>
    )
}

export default PopUps