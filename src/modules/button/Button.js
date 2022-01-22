import React from "react";
import "./Button.css"
import Animation from "../../utils/animation"

class Button extends React.Component {

    uniformSpeed() {
        Animation.animate({
            duration: 1000,
            easing(timeFraction) {
                return timeFraction;
            },
            draw: (progress) => {
                this.props.ballTransfrom(`translate(${progress * 100}px, 0)`);
            },
        })
    };

    gravity() {
        Animation.animate({
            duration: 800,
            easing(timeFraction) {
                // 初始速度系数为2
                return timeFraction ** 2;
            },
            draw: (progress) => {
                this.props.ballTransfrom(`translate(0, ${500 * (progress - 1)}px)`);
            },
        })
    };

    friction() {
        Animation.animate({
            duration: 1000,
            easing(timeFraction) {
                // 初始速度系数为2
                return timeFraction * (2 - timeFraction);
            },
            draw: (progress) => {
                this.props.ballTransfrom(`translate(0, ${500 * (progress - 1)}px)`);
            },
        })
    }

    flatThrow() {
        Animation.animate({
            duration: 1000,
            easing(timeFraction) {
                // 初始速度系数为2
                return {
                    x: timeFraction,
                    y: timeFraction ** 2,
                };
            },
            draw: (progress) => {
                this.props.ballTransfrom(`translate(${300 * progress.x}px, ${300 * (progress.y - 1)}px)`);
            },
        })
    }

    flatThrowSpin() {
        Animation.animate({
            duration: 1000,
            easing(timeFraction) {
                // 初始速度系数为2
                return {
                    x: timeFraction,
                    y: timeFraction ** 2,
                    rotate: timeFraction,
                };
            },
            draw: (progress) => {
                this.props.ballTransfrom(`translate(${300 * progress.x}px, ${300 * (progress.y - 1)}px) rotate(${2000 * progress.rotate}deg)`);
            },
        })
    }

    bowDraw() {
        const back = (x, timeFraction) => {
            return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x);
        }
        Animation.animate({
            duration: 2000,
            easing(timeFraction) {
                // 初始速度系数为2
                return {
                    x: timeFraction,
                    y: back(2, timeFraction),
                };
            },
            draw: (progress) => {
                this.props.ballTransfrom(`translate(${300 * progress.x}px, ${-500 * progress.y}px)`);
            },
        });
    }

    bezier() {
        const bezierPath = (x1, y1, x2, y2, timeFraction) => {
            const x = 3 * x1 * timeFraction * (1 - timeFraction) ** 2 + 3 * x2 * timeFraction ** 2 * (1 - timeFraction) + timeFraction ** 3;
            const y = 3 * y1 * timeFraction * (1 - timeFraction) ** 2 + 3 * y2 * timeFraction ** 2 * (1 - timeFraction) + timeFraction ** 3;
            return [x, y];
        }

        const draw = (progress) => {
            const [px, py] = bezierPath(0.2, 0.6, 0.8, 0.2, progress);
            this.props.ballTransfrom(`translate(${300 * px}px, ${-300 * py}px)`);
        }

        Animation.animate({
            duration: 2000,
            easing(timeFraction) {
                return timeFraction * (2 - timeFraction);
            },
            draw,
        });
    }

    ellipsis() {
        const draw = (progress) => {
            const x = 150 * Math.cos(Math.PI * 2 * progress);
            const y = 100 * Math.sin(Math.PI * 2 * progress);
            this.props.ballTransfrom(`translate(${x}px, ${y}px)`);
          }
          
          Animation.animate({
            duration: 2000,
            easing(timeFraction) {
              return timeFraction * (2 - timeFraction);
            },
            draw,
          });
    }

    render() {
        return (
            <div className="nav">
                <button onClick={this.uniformSpeed.bind(this)}>匀速运动</button>
                <button onClick={this.gravity.bind(this)}>重力</button>
                <button onClick={this.friction.bind(this)}>摩擦力</button>
                <button onClick={this.flatThrow.bind(this)}>平抛</button>
                <button onClick={this.flatThrowSpin.bind(this)}>旋转+平抛</button>
                <button onClick={this.bowDraw.bind(this)}>拉弓</button>
                <button onClick={this.bezier.bind(this)}>贝塞尔曲线</button>
                <button onClick={this.ellipsis.bind(this)}>椭圆</button>
            </div>
        );
    }
}

export default Button;