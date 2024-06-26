

import './destination/Styles/style.css'
import './destination/Bootstrap/css/bootstrap.min.css'
import './destination/Styles/font.css'
import './destination/Styles/dark-style.css'
import './destination/Fonts/css/all.css'

import {Tickertapewidget} from "./Tickertapewidget.jsx"




function Footer ({darkMode})  {

        return (


<>
                <footer className="copy-right text-center p-2">


                    <a target='_blank' href="/AboutUs.html">
                        <p>Made with ❤️</p>

                    </a>


                </footer>



           <Tickertapewidget  darkMode={darkMode}   />

</>
        );
    }


export default Footer;