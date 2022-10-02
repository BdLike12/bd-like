import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";




export default function Profile() {
    const router = useRouter();

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
            <div style={{ height: "98vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Link href="/api/auth/login">
                    <a style={{ backgroundColor: "#dbdbdb", padding: "10px", borderRadius: "10px" }}> Login</a>
                </Link>
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



                {/* <!-- ME HEADER PART START --> */}
                <header id="me_head">
                    <div className="container">
                        <div className="me_head_main">
                            <div className="row">
                                <div className="col-10">
                                    <div className="img_number">
                                        <div className="profile">
                                            <picture>
                                                <img className="img-fluid" src="/profile.jpg" alt="img" />
                                            </picture>
                                        </div>
                                        <div className="number">
                                            <h5>{user?.nickname}</h5>
                                            <div className="edit" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                <h5>019539755000</h5>
                                                <button className="balance_btn">edit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="icon">
                                        <Link href="/dashboard"><i className="fa-solid fa-angle-right"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                {/* <!-- ME HEADER PART END --> */}

                {/* <!-- VIP MEMBER PART START --> */}
                <section id="vip_member">
                    <div className="container">
                        <div className="vip_member_main">
                            <div className="col-lg-12">
                                <div className="vip_heading">
                                    <div className="vip_item">
                                        <div className="vip_item_inf">
                                            <div className="name">
                                                <h4>VIP:</h4>
                                            </div>
                                            <div className="catagori">
                                                <h4>Member</h4>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rating">
                                        <div className="rating_inf">
                                            <span>Ranking:</span>
                                        </div>
                                        <div className="rating_icon">
                                            <picture>
                                                <img src="/badge.png" alt="img" />
                                            </picture>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- VIP MEMBER PART END --> */}

                {/* <!-- BALANCE PART START --> */}
                <section id="balance">
                    <div className="container">
                        <div className="balance_main">
                            <div className="row">
                                <div className="col-lg-10">
                                    <div className="balance_inf">
                                        <p>Current Blance</p>
                                        <h4>104 tk</h4>
                                        <p>Total Revenue</p>
                                        <h4>36 tk</h4>
                                        <div className="balance_btn">
                                            <button>invite friends</button>
                                            <button>my team</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- BALANCE PART END --> */}

                {/* <!-- SERVICE PART START --> */}
                <section id="service">
                    <div className="container">
                        <div className="service_main">
                            <div className="row">
                                <div className="col-lg-4 col-6">
                                    <div className="service_item text-center">
                                        <Link href="#"><i className="fa-solid fa-address-card"></i>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-6">
                                    <div className="service_item text-center">
                                        <Link href="bank_card.html"><i className="fa-solid fa-building-columns"></i>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-6">
                                    <div className="service_item text-center">
                                        <Link href="my_wallet.html"><i className="fa-solid fa-money-bill-transfer"></i>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-6">
                                    <div className="service_item text-center">
                                        <Link href="bank_card.html"><i className="fa-solid fa-book"></i>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-6">
                                    <div className="service_item text-center">
                                        <Link href="#"><i className="fa-solid fa-circle-down"></i>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-6">
                                    <div className="service_item text-center">
                                        <Link href="#"><i className="fa-solid fa-question"></i>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-6">
                                    <div className="service_item text-center">
                                        <Link href="facebook.html"><i className="fa-solid fa-compass"></i>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-6">
                                    <div className="service_item text-center">
                                        <Link href="#"><i className="fa-solid fa-headphones"></i>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-6">
                                    <div className="service_item text-center">
                                        <Link href="/api/auth/logout?federated"><i className="fa-solid fa-power-off"></i>
                                        </Link>
                                        <p>Logout</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- SERVICE PART END --> */}

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
                                            <Link href="/profile"><i className="fa-regular fa-gem"></i></Link>
                                            <p>VIP</p>
                                        </div>
                                        <div className="icon_item">
                                            <Link href="#"><i className="fa-solid fa-rectangle-ad"></i></Link>
                                            <p>Ad</p>
                                        </div>
                                        <div className="icon_item">
                                            <Link href="/records"><i className="fa-solid fa-clock"></i></Link>
                                            <p>Records</p>
                                        </div>
                                        <div className="icon_item active">
                                            <Link href="/profile"><i className="fa-solid fa-user"></i></Link>
                                            <p>Profile</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
                {/* < !--Mobile Bottom ICON BAR PART END-- > */}
            </div >

        )
    }
}
