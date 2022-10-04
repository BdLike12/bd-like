import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useEffect, useState } from "react"
import { constants } from "../../utils/constants";
import { initializeUser } from "../../utils/initializeUser";


export const AD_TYPES = {
    VIDEO: "video",
    AD_NETWORK: "ad nework"
}

export default function Dashboard() {

    const [navopen, setNavopen] = useState(false);
    const [link, setLink] = useState("");

    const { user, isLoading } = useUser();

    const [type, setType] = useState(AD_TYPES.VIDEO);
    const [selectorOpen, setSelectorOpen] = useState(false);


    useEffect(() => {
        initializeUser(user);
    }, [user])


    // need to implement it farther
    async function addAdNetwork() {
    }

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

                <div style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <h2>Link for ad</h2>
                    {
                        !selectorOpen &&
                        <button style={{ padding: "5px", marginLeft: "5%", backgroundColor: "#ebebeb", borderRadius: "20px", maxWidth: "max-content" }} onClick={() => { setSelectorOpen(!selectorOpen) }}> {type}</button>
                    }
                    {
                        selectorOpen &&
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <button style={{ padding: "5px", marginLeft: "5%", marginTop: "10px", backgroundColor: "#dbdbdb", borderRadius: "20px", maxWidth: "max-content" }}> { }</button>
                            <button style={{ padding: "5px", marginLeft: "5%", marginTop: "10px", backgroundColor: "#dbdbdb", borderRadius: "20px", maxWidth: "max-content" }} onClick={async () => { setType(AD_TYPES.VIDEO); setSelectorOpen(false) }}> video</button>
                            <button style={{ padding: "5px", marginLeft: "5%", marginTop: "10px", backgroundColor: "#dbdbdb", borderRadius: "20px", maxWidth: "max-content" }} onClick={async () => { setType(AD_TYPES.AD_NETWORK); setSelectorOpen(false) }}> add network </button>

                        </div>
                    }

                    <input type="text" placeholder="link" style={{
                        width: "90%",
                        margin: "auto",
                        marginTop: "10px",
                        backgroundColor: "transparent",
                        borderLeft: "none",
                        borderTop: "none",
                        borderRight: "none",
                        borderBottom: "1px solid black"
                    }}
                        onChange={(e) => { setLink(e.target.value) }}
                    />
                    <button style={{ padding: "5px", margin: "auto", marginTop: "10px", backgroundColor: "#dbdbdb", borderRadius: "20px", maxWidth: "max-content" }}
                        onClick={async () => { await addAdNetwork() }}>add advertisement</button>

                </div>


                {/* use database */}
                <h3 style={{ padding: "20px" }}> All ads</h3>
                <div style={{ border: "1px solid black", width: "94%", margin: "3%", marginBottom: "10vh", height: "80vh", padding: "10px", overflowY: "scroll" }}>
                    <div style={{
                        maxWidth: "95%",
                        margin: "auto",
                        marginBottom: "10px",
                        padding: "10px",
                        border: "1px solid black",
                    }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <h3 style={{ maxWidth: "max-content" }}>
                                {"ad type : "}
                            </h3>

                            <button style={{ marginLeft: "5px", padding: "5px", backgroundColor: "#ebebeb", borderRadius: "20px", maxWidth: "max-content" }}> {AD_TYPES.AD_NETWORK}</button>
                        </div>


                        <div style={{ display: "flex", alignItems: "center" }}>
                            <h3 style={{ maxWidth: "max-content", marginRight: "10px" }}>
                                {"ad link : "}
                            </h3>
                            <a href="#">link</a>
                        </div>
                        <button style={{ padding: "5px", background: "linear-gradient(#5CB8E4, #277BC0)", color: "#ebebeb", borderRadius: "20px", maxWidth: "max-content" }}>
                            Delete ad
                        </button>
                    </div>
                </div>






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
