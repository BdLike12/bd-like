import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useState } from "react"

export default function Dashboard() {

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

                {/* <!-- ICON BAR PART START --> */}
                <section id="icon">
                    <div className="container">
                        <div className="icon_main">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="icon_div">
                                        <div className="icon_item">
                                            <Link href="/deposite"><i className="fa-solid fa-sack-dollar"></i></Link>
                                            <p>Deposit</p>
                                        </div>
                                        <div className="icon_item">
                                            <Link href="/vip"><i className="fa-regular fa-gem"></i></Link>
                                            <p>VIP</p>
                                        </div>
                                        <div className="icon_item">
                                            <Link href="/bank_card"><i className="fa-solid fa-building"></i></Link>
                                            <p>Invesment</p>
                                        </div>
                                        <div className="icon_item">
                                            <Link href="/profile"><i className="fa-solid fa-envelope"></i></Link>
                                            <p>Custom service</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
                {/* < !--ICON BAR PART END-- > */}

                < div className="line" ></div >

                {/* <!--COUNT DOWN PART START-- > */}
                < section id="count" >
                    <div className="container">
                        <div className="count_main">
                            <h3>Information</h3>
                            <div className="row g-0">
                                <div className="col-4 text-center">
                                    <div className="count_item count_item1">
                                        <p>Available Balance</p>
                                        <h3 className="count_up">754.78</h3>
                                    </div>
                                </div>
                                <div className="col-4 text-center">
                                    <div className="count_item count_item2">
                                        <p>{"Yesterday's Income"}</p>
                                        <h3 className="count_up">96.55</h3>
                                    </div>
                                </div>
                                <div className="col-4 text-center">
                                    <div className="count_item count_item3">
                                        <p>{"Today's Income"}</p>
                                        <h3 className="count_up">96.66</h3>
                                    </div>
                                </div>
                                <div className="col-4 text-center">
                                    <div className="count_item count_item4">
                                        <p>{"This week's Income"}</p>
                                        <h3 className="count_up">74.78</h3>
                                    </div>
                                </div>
                                <div className="col-4 text-center">
                                    <div className="count_item 5">
                                        <p>{"This Month's Income"}</p>
                                        <h3 className="count_up">254.78</h3>
                                    </div>
                                </div>
                                <div className="col-4 text-center">
                                    <div className="count_item count_item6">
                                        <p>{"Last Month's Income"}</p>
                                        <h3 className="count_up">1554.78</h3>
                                    </div>
                                </div>
                                <div className="col-4 text-center">
                                    <div className="count_item count_item7">
                                        <p>Remaining Tasks</p>
                                        <h3 className="count_up">5</h3>
                                    </div>
                                </div>
                                <div className="col-4 text-center">
                                    <div className="count_item count_item8">
                                        <p>Tasks under review</p>
                                        <h3 className="count_up">0</h3>
                                    </div>
                                </div>
                                <div className="col-4 text-center">
                                    <div className="count_item count_item9">
                                        <p>Totall Revenue</p>
                                        <h3 className="count_up">1554.78</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
                {/* <!--COUNT DOWN PART END-- > */}

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
