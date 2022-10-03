import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useEffect, useState } from "react"
import { constants } from "../../utils/constants";
import { initializeUser } from "../../utils/initializeUser";

export default function Dashboard() {

    const [navopen, setNavopen] = useState(false);
    const { user, isLoading } = useUser();

    useEffect(() => {
        initializeUser(user);
    }, [user])

    if (isLoading) {
        return (
            <div>
                <p>loading . . .</p>
            </div>
        )
    }
    else if (!user || (user && user.nickname !== constants.ADMIN_NICKNAME)) {
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
                        <Link className="navbar-brand" href="/admin/dashboard">
                            <div className="img">
                                <picture>
                                    <img className="w-25" src="/logo.png" alt="logo" />
                                </picture>
                            </div>
                        </Link>
                        <button onClick={() => { setNavopen((current) => !current) }} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className={navopen ? "collapse navbar-collapse show" : "collapse navbar-collapse"} style={{ paddingTop: "30px" }} id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" href="/admin/payments">{"payments"}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" href="/admin/approval">{"approval"}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" href="/admin/ad">{"Add ad"}</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {/* <!-- navbar part end --> */}

                {/* <!-- SLIDER PART START --> */}
                <section id="slider">
                    <div className="container px-0">
                        <div className="slider_main">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="main_div">
                                        <div className="slider_item" style={{ display: "flex", justifyContent: "center" }}>
                                            <img style={{ minWidth: "80%", maxWidth: "90%", margin: "20px" }} className="img-fluid" src="/admin_bg.jpg" alt="img" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="purches">
                                <button><Link href="#">{"Admin Dashboard"}</Link></button>
                            </div>
                        </div>
                    </div>

                </section>
                {/* <!-- SLIDER PART END --> */}




                {/* < !--Mobile Bottom ICON BAR PART START-- > */}
                <section id="icon" className="d-sm-none">
                    <div className="container">
                        <div className="icon_main">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="icon_div">
                                        <div className="icon_item active">
                                            <Link href="/admin/dashboard"><i className="fa-solid fa-house"></i></Link>
                                            <p>{"Home"}</p>
                                        </div>

                                        <div className="icon_item">
                                            <Link href="/admin/approval"><i className="fa-solid fa-user-cog"></i></Link>
                                            <p>{"approval"}</p>
                                        </div>
                                        <div className="icon_item">
                                            <Link href="/admin/payments"><i className="fa-solid fa-dollar"></i></Link>
                                            <p>{"payments"}</p>
                                        </div>
                                        <div className="icon_item">
                                            <Link href="/admin/ad"><i className="fa-solid fa-rectangle-ad"></i></Link>
                                            <p>{"Ad"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!--Mobile Bottom ICON BAR PART END-- > */}
            </div >
        )

    }
}
