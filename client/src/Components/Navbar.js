import {React, useEffect, useState, innerWidth} from "react";
import "../Css/navigation.css";

function NavigationBar() {

    const [toggleMenu, setToggleMenu] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window, innerWidth)

    const toggleNav = () => {
        setToggleMenu(!toggleMenu)
        console.log("TOGGLED")
    }

    useEffect(() => {
        const changeWidth = () => {
            setScreenWidth(window.innerWidth)
        }
        
        if(window.innerWidth>600){
            setToggleMenu(true)
        }

        if(window.innerWidth<600 && setToggleMenu==true){
            setToggleMenu(false)
        }
        window.addEventListener('resize', changeWidth)
    })

        return (

            <div>
                <nav className="navbar">
                    <img src="/Images/Gecko.png" alt="logo" className="logo"></img>
                    <a className="toggle-button" onClick={toggleNav}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </a>
                    <div className="navbar-links">
                        {(toggleMenu || screenWidth > 600 ) && (
                            <ul>
                            <li className="aboutPadding"><a href="homepage">HOME</a></li>
                            <li><a href="Blog">FORUM</a></li>
                            </ul>
                        )}                      
                    </div>
                    <div>
                    </div>
                    
                </nav>
            </div>
        );
}           

export default NavigationBar