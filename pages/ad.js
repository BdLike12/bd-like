import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useEffect, useState } from "react"
import { initializeUser } from "../utils/initializeUser";

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
                        <div className={navopen ? "collapse navbar-collapse show" : "collapse navbar-collapse"} style={{ paddingTop: "30px" }} id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" href="/dashboard">Home</Link>
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
                {/* <!-- navbar part end --> */}



                < div className="line" ></div >

                < div className="line" ></div >

                {/* <!--TASK HALL PART START-- > */}
                <section id="record_item">
                    <div className="container">
                        <div className="record_item_main">
                            <div className="row">
                                <div className="col-lg-6 m-auto">
                                    <div className="record_item_full">
                                        <div className="screenshot_item">
                                            <div className="item_main">
                                                <div className="tittle">
                                                    <h4>Screenshot</h4>
                                                </div>
                                                <div className="img_upload">
                                                    <Link href="#">
                                                        <i className="fa-regular fa-image"></i>
                                                    </Link>
                                                    <p>upload image</p>
                                                </div>
                                            </div>
                                            <div className="diposite_bank_btn text-center">
                                                <button>Upload</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* < !--Mobile Bottom ICON BAR PART START-- > */}
                <section id="icon" className="d-sm-none">
                    <div className="container">
                        <div className="icon_main">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="icon_div">
                                        <div className="icon_item active">
                                            <Link href="/dashboard"><i className="fa-solid fa-house"></i></Link>
                                            <p>Home</p>
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
                                            <p>Profile</p>
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
