import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useState } from "react";


export default function Bank_card() {

    const [navopen, setNavopen] = useState(false);
    const { user, isLoading } = useUser();

    if (isLoading) {
        return (
            <div>
                <p>loading . . .</p>
            </div>
        )
    }
    else if (!user) {
        return (
            <div>
                <Link href="/api/auth/login">Login</Link>
            </div>
        )
    }
    else {
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
                                    <Link className="nav-link active" aria-current="page" href="/profile">Profile</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>


                {/* <!-- BANK CARD HEADING PART START --> */}
                <section id="wallet_heading">
                    <div className="container">
                        <div className="wallet_heading_main">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="wallet_inf">
                                        <div className="icon">
                                            <Link href="/dashboard"><i className="fa-solid fa-angle-left"></i></Link>
                                        </div>
                                        <div className="tittle m-auto">
                                            <h5>Bank card information</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- BANK CARD HEADING PART END --> */}

                {/* <!-- BANK NAME PART START --> */}
                <section id="bank_name">
                    <div className="container">
                        <div className="bank_name_main">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="bank_name_item">
                                        <p>Bank name</p>
                                        <input type="text" placeholder="Enter Bank Name" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="bank_name_item">
                                        <p>Account Number</p>
                                        <input type="text" placeholder="Enter Your Account No" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="bank_name_item">
                                        <p>Card Holder</p>
                                        <input type="text" placeholder="Card Holder" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="bank_name_item">
                                        <p>Bkash/Nogod</p>
                                        <input type="text" placeholder="Bkash No/Nogod No" />
                                    </div>
                                </div>
                            </div>

                            <div className="bank_btn text-center">
                                <button>Send</button>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- BANK NAME PART END --> */}

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
                                        <div className="icon_item">
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
                                            <Link href="profile"><i className="fa-solid fa-user"></i></Link>
                                             <p>Profile</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
            </div >

        )
    }
}
