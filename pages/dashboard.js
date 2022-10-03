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
                {/* <!-- navbar part end --> */}

                {/* <!-- SLIDER PART START --> */}
                <section id="slider">
                    <div className="container px-0">
                        <div className="slider_main">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="main_div">
                                        <div className="slider_item">
                                            <picture>
                                                <img className="img-fluid" src="/bdlike_bg.jpg" alt="img" />
                                            </picture>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="purches">
                                <button><Link href="/purchase">purchase</Link></button>
                            </div>

                        </div>
                    </div>
                </section>
                {/* <!-- SLIDER PART END --> */}

                < div className="line" ></div >

                < div className="line" ></div >

                {/* <!--TASK HALL PART START-- > */}
                {/* < section id="task" >
                    <div className="container">
                        <div className="task_main">
                            <div className="row">
                                <div className="col-lg-3 col-md-3 col-6">
                                    <div className="task_item">
                                        <h5>Ali Baba</h5>
                                        <p>Like/Follow</p>
                                        <div className="icon">
                                            <Link href="https://www.alibaba.com/?src=sem_ggl&from=sem_ggl&cmpgn=17514778232&adgrp=&fditm=&tgt=&locintrst=&locphyscl=1001441&mtchtyp=&ntwrk=x&device=c&dvcmdl=&creative=&plcmnt=&plcmntcat=&p1=&p2=&aceid=&position=&localKeyword=&pla_prdid=&pla_country=&pla_lang=&gclid=CjwKCAjw-L-ZBhB4EiwA76YzOSV6tkQtmr3pamjgB0mm4rB4d5LLU9t47nf5SE35UOdNDvo-gl87QBoCgRkQAvD_BwE">
                                                <picture>
                                                    <img className="img-fluid w-50" src="/ali baba.png" alt="img" />
                                                </picture>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-3 col-6">
                                    <div className="task_item youtube">
                                        <h5>Amazone</h5>
                                        <p>Like/Follow</p>
                                        <div className="icon">
                                            <Link href="https://shopping.myus.com/amazon/?aid=1006907&gclid=CjwKCAjw-L-ZBhB4EiwA76YzOQhhFdaN0Z06E6SQ8LuUO1wNIQuqRQM-aL8kMFTm6hYyXagkAEToSBoCVUwQAvD_BwE">
                                                <picture>
                                                    <img className="img-fluid w-50" src="/amajon.png" alt="img" />
                                                </picture>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-3 col-6">
                                    <div className="task_item">
                                        <h5>Ali Baba</h5>
                                        <p>Like/Follow</p>
                                        <div className="icon">
                                            <Link href="https://www.alibaba.com/?src=sem_ggl&from=sem_ggl&cmpgn=17514778232&adgrp=&fditm=&tgt=&locintrst=&locphyscl=1001441&mtchtyp=&ntwrk=x&device=c&dvcmdl=&creative=&plcmnt=&plcmntcat=&p1=&p2=&aceid=&position=&localKeyword=&pla_prdid=&pla_country=&pla_lang=&gclid=CjwKCAjw-L-ZBhB4EiwA76YzOSV6tkQtmr3pamjgB0mm4rB4d5LLU9t47nf5SE35UOdNDvo-gl87QBoCgRkQAvD_BwE">
                                                <picture>
                                                    <img className="img-fluid w-50" src="/ali baba.png" alt="img" />
                                                </picture>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-3 col-6">
                                    <div className="task_item youtube">
                                        <h5>Amazone</h5>
                                        <p>Like/Follow</p>
                                        <div className="icon">
                                            <Link href="https://shopping.myus.com/amazon/?aid=1006907&gclid=CjwKCAjw-L-ZBhB4EiwA76YzOQhhFdaN0Z06E6SQ8LuUO1wNIQuqRQM-aL8kMFTm6hYyXagkAEToSBoCVUwQAvD_BwE">
                                                <picture>
                                                    <img className="img-fluid w-50" src="/amajon.png" alt="img" />
                                                </picture>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section > */}
                {/* <!--TASK HALL PART END-- > */}


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
