
import './destination/Styles/style.css'
import './destination/Bootstrap/css/bootstrap.min.css'
import './destination/Bootstrap/js/bootstrap.bundle.js'
import './destination/Styles/font.css'
import './destination/Styles/dark-style.css'
import './destination/Fonts/css/all.css'




import LOGO from './destination/Images/Logo/coinwatch-logo.svg'
import {Link} from "react-router-dom";

export  function Header() {

    return (
        <>

            <header className="mb-4">
                <section id="header" className="p-3">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 header-wrapper">
                                <Link  className="extension-logo" to={'/home'}>
                                    <h1 >
                                        <img src={LOGO} width="150" alt=""/>
                                    </h1>
                                </Link>
                                <Link className="extension-settings" to={'/setting'}>


                                    <i className="fa-solid fa-gear"   ></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </header>
        </>
    )
}


