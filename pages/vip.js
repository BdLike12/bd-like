import Link from "next/link";
import { useState } from "react";

export default function Vip() {

    const [navopen, setNavopen] = useState(false);
    return (
        <div>
            {/* <!-- navbar part start --> */}
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <Link className="navbar-brand" href="/dashboard">
                        <div className="img">
                            <picture>
                                <img className="w-25" src="/logo.png" alt="logo" />
                            </picture>
                        </div>
                    </Link>
                    <button onClick={() => { setNavopen((current) => !current) }} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={navopen ? "collapse navbar-collapse show" : "collapse navbar-collapse"} id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="/dashboard">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="/vip">Vip</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="/ad">Ad</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="/records">Records</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="/profile">Me</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>



            {/* <!-- VIP PART START --> */}
            <section id="vip">
                <div className="container">
                    <div className="vip_main">
                        <div className="heading">
                            <div className="icon">
                                <Link href="/dashboard">
                                    <i className="fa-solid fa-angle-left"></i>
                                </Link>
                            </div>
                            <div className="text"><span>VIP</span></div>
                        </div>
                        <div className="row">
                            <div className="col-lg-8 m-auto">
                                <div className="vip_card">
                                    <picture>
                                        <img className="img-fluid w-100" src="/card.jpg" alt="img" />
                                    </picture>
                                    <div className="recharge">
                                        <button>Recharge</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="line"></div>


                        <div className="row">
                            <div className="col-lg-4">
                                <div className="vip_item">
                                    <picture>
                                        <img className="img-fluid" src="/card.jpg" alt="img" />
                                    </picture>
                                    <div className="purchase">
                                        <button>Purchase Now</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <div className="vip_item">
                                    <picture>
                                        <img className="img-fluid" src="/card2.jpg" alt="img" />
                                    </picture>
                                    <div className="purchase">
                                        <button>Purchase Now</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <div className="vip_item">
                                    <picture>
                                        <img className="img-fluid" src="/card3.jpg" alt="img" />
                                    </picture>
                                    <div className="purchase">
                                        <button>Purchase Now</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <div className="vip_item">
                                    <picture>
                                        <img className="img-fluid" src="/card3.jpg" alt="img" />
                                    </picture>
                                    <div className="purchase">
                                        <button>Purchase Now</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <div className="vip_item">
                                    <picture>
                                        <img className="img-fluid" src="/card.jpg" alt="img" />
                                    </picture>
                                    <div className="purchase">
                                        <button>Purchase Now</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <div className="vip_item">
                                    <picture>
                                        <img className="img-fluid" src="/card2.jpg" alt="img" />
                                    </picture>
                                    <div className="purchase">
                                        <button>Purchase Now</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <div className="vip_item">
                                    <picture>
                                        <img className="img-fluid" src="/card.jpg" alt="img" />
                                    </picture>
                                    <div className="purchase">
                                        <button>Purchase Now</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <div className="vip_item">
                                    <picture>
                                        <img className="img-fluid" src="/card3.jpg" alt="img" />
                                    </picture>
                                    <div className="purchase">
                                        <button>Purchase Now</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <div className="vip_item">
                                    <picture>
                                        <img className="img-fluid" src="/card.jpg" alt="img" />
                                    </picture>
                                    <div className="purchase">
                                        <button>Purchase Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- VIP PART END --> */}

            {/* <!-- INVITATION PART START --> */}
            <section id="invite">
                <div className="container">
                    <div className="invite_main">
                        <h3>Invite Friends</h3>
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-6">
                                <div className="icon_main">
                                    <div className="invite_icon">
                                        <i className="fa-solid fa-user"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-6">
                                <div className="icon_main">
                                    <div className="invite_icon">
                                        <i className="fa-solid fa-user"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-6">
                                <div className="icon_main">
                                    <div className="invite_icon">
                                        <i className="fa-solid fa-user"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-6">
                                <div className="icon_main">
                                    <div className="invite_icon">
                                        <i className="fa-solid fa-user"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-6">
                                <div className="icon_main">
                                    <div className="invite_icon">
                                        <i className="fa-solid fa-user"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-6">
                                <div className="icon_main">
                                    <div className="invite_icon">
                                        <i className="fa-solid fa-user"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-6">
                                <div className="icon_main">
                                    <div className="invite_icon">
                                        <i className="fa-solid fa-user"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-6">
                                <div className="icon_main">
                                    <div className="invite_icon">
                                        <i className="fa-solid fa-user"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-6">
                                <div className="icon_main">
                                    <div className="invite_icon">
                                        <i className="fa-solid fa-user"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-6">
                                <div className="icon_main">
                                    <div className="invite_icon">
                                        <i className="fa-solid fa-user"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-6">
                                <div className="icon_main">
                                    <div className="invite_icon">
                                        <i className="fa-solid fa-user"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- INVITATION PART END --> */}

            {/* <!-- Mobile Bottom ICON BAR PART START --> */}
            <section id="icon" className="d-sm-none">
                <div className="container">
                    <div className="icon_main">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="icon_div">
                                    <div className="icon_item">
                                        <Link href="/dashboard"><i className="fa-solid fa-house"></i></Link>
                                        <p>Home</p>
                                    </div>
                                    <div className="icon_item active">
                                        <Link href="/vip"><i className="fa-regular fa-gem"></i></Link>
                                        <p>VIP</p>
                                    </div>
                                    <div className="icon_item">
                                        <Link href="/ad"><i className="fa-solid fa-rectangle-ad"></i></Link>
                                        <p>Ad</p>
                                    </div>
                                    <div className="icon_item">
                                        <Link href="/records"><i className="fa-solid fa-clock"></i></Link>
                                        <p>Records</p>
                                    </div>
                                    <div className="icon_item">
                                        <Link href="/profile"><i className="fa-solid fa-user"></i></Link>
                                        <p>Me</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            {/* < !--Mobile Bottom ICON BAR PART END-- >

        {/* <!--Mobile Bottom ICON BAR PART END-- > */ }
        </div >

    )
}
