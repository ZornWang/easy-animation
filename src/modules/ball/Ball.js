import React from 'react'
import "./Ball.css"

class Ball extends React.Component {

    render() {
        return (
            <div className="ball" style={{transform: this.props.ballTrans}}>
                <div className="pin"></div>
            </div>
        );
    }
}

export default Ball;