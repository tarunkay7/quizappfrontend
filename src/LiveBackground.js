import React from 'react';

const LiveBackground = () => {
    return (
        <ul className="background">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <style jsx>{`
              @keyframes animate {
                0%{
                  transform: translateY(0) rotate(0deg);
                  opacity: 1;
                  border-radius: 0;
                }
                100%{
                  transform: translateY(-1000px) rotate(720deg);
                  opacity: 0;
                  border-radius: 50%;
                }
              }

              .background {
                position: fixed;
                width: 100vw;
                height: 100vh;
                top: 0;
                left: 0;
                margin: 0;
                padding: 0;
                background: #4e54c8;
                overflow: hidden;
              }
              .background li {
                position: absolute;
                display: block;
                list-style: none;
                width: 20px;
                height: 20px;
                background: rgba(255, 255, 255, 0.2);
                animation: animate 21s linear infinite;
              }




              .background li:nth-child(0) {
                left: 88%;
                width: 148px;
                height: 148px;
                bottom: -148px;
                animation-delay: 1s;
              }
              .background li:nth-child(1) {
                left: 24%;
                width: 261px;
                height: 261px;
                bottom: -261px;
                animation-delay: 5s;
              }
              .background li:nth-child(2) {
                left: 85%;
                width: 193px;
                height: 193px;
                bottom: -193px;
                animation-delay: 9s;
              }
              .background li:nth-child(3) {
                left: 20%;
                width: 43px;
                height: 43px;
                bottom: -43px;
                animation-delay: 4s;
              }
              .background li:nth-child(4) {
                left: 27%;
                width: 219px;
                height: 219px;
                bottom: -219px;
                animation-delay: 3s;
              }
              .background li:nth-child(5) {
                left: 63%;
                width: 86px;
                height: 86px;
                bottom: -86px;
                animation-delay: 17s;
              }
              .background li:nth-child(6) {
                left: 69%;
                width: 81px;
                height: 81px;
                bottom: -81px;
                animation-delay: 20s;
              }
              .background li:nth-child(7) {
                left: 24%;
                width: 41px;
                height: 41px;
                bottom: -41px;
                animation-delay: 35s;
              }
              .background li:nth-child(8) {
                left: 83%;
                width: 159px;
                height: 159px;
                bottom: -159px;
                animation-delay: 28s;
              }
              .background li:nth-child(9) {
                left: 24%;
                width: 49px;
                height: 49px;
                bottom: -49px;
                animation-delay: 3s;
              }
        
        
      `}</style>
        </ul>
    );
};

export default LiveBackground;
