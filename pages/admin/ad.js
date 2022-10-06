import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useEffect, useState } from "react"
import { deleteAd, getAds, insertAd } from "../../database/functions";
import { constants } from "../../utils/constants";
import { initializeUser } from "../../utils/initializeUser";
import { generateRandomID } from "../../utils/randomID";
import { getYoutubeIDfromLink } from "../../utils/youtubeIDParser";


export const AD_TYPES = {
    VIDEO: "video",
    YOUTUBE: "youtube video",
    AD_NETWORK: "ad nework"
}


export default function Dashboard() {

    const [navopen, setNavopen] = useState(false);
    const [link, setLink] = useState("");
    const [load, setLoad] = useState(false);

    const [ads, setAds] = useState([]);


    const { user, isLoading } = useUser();

    const [type, setType] = useState(AD_TYPES.YOUTUBE);
    const [selectorOpen, setSelectorOpen] = useState(false);


    useEffect(() => {
        initializeUser(user);
    }, [user])


    async function deleteAdvertisement(adID) {
        setLoad(true);
        await deleteAd(adID);
        setLoad(false);

    }

    async function syncAds() {
        const { data, error } = await getAds();
        console.log(data);
        setAds(data);
        // console.log(ads);
    }
    useEffect(() => {
        syncAds();
    }, [load]);




    async function addAd() {
        setLoad(true);

        if (type === AD_TYPES.YOUTUBE) {
            await insertAd(generateRandomID("AD"), type, getYoutubeIDfromLink(link));
        }
        else {
            await insertAd(generateRandomID("AD"), type, link);
        }
        setLink("");
        setType(AD_TYPES.VIDEO);
        setLoad(false);
    }

    if (isLoading || load) {
        return (
            <div>
                <p>loading . . .</p>
            </div>
        )
    }
    else if (!user || (user && user.nickname !== constants.ADMIN_NICKNAME)) {
        return (
            <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: `url("/login_bg.jfif")`, backgroundRepeat: 'no-repeat', backgroundSize: "cover" }}>
                <Link href="/api/auth/login">
                    <a
                        style={{ padding: "20px", background: "linear-gradient(#5CB8E4, #277BC0)", color: "#ebebeb", borderRadius: "20px", maxWidth: "max-content" }}
                    > Login with google</a>
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
                            {/* <button style={{ padding: "5px", marginLeft: "5%", marginTop: "10px", backgroundColor: "#dbdbdb", borderRadius: "20px", maxWidth: "max-content" }} onClick={async () => { setType(AD_TYPES.VIDEO); setSelectorOpen(false) }}> video</button> */}
                            <button style={{ padding: "5px", marginLeft: "5%", marginTop: "10px", backgroundColor: "#dbdbdb", borderRadius: "20px", maxWidth: "max-content" }} onClick={async () => { setType(AD_TYPES.YOUTUBE); setSelectorOpen(false) }}> youtube video </button>
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
                        onClick={async () => { await addAd() }}>add advertisement</button>

                </div>



                {/* use database */}
                <h3 style={{ padding: "20px" }}> All ads</h3>
                <div style={{ border: "1px solid black", width: "94%", margin: "3%", marginBottom: "10vh", height: "80vh", padding: "10px", overflowY: "scroll" }}>
                    {
                        ads.map((ad, index) => {
                            return <div key={ad.adID} style={{
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

                                    <button style={{ marginLeft: "5px", padding: "5px", backgroundColor: "#ebebeb", borderRadius: "20px", maxWidth: "max-content" }}> {ad.type}</button>
                                </div>


                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <h3 style={{ maxWidth: "max-content", marginRight: "10px" }}>
                                        {"ad link : "}
                                    </h3>
                                    <a target="_blank" rel="noreferrer" href={ad.link}>{ad.link}</a>
                                </div>
                                <button onClick={async () => await deleteAdvertisement(ad.adID)}
                                    style={{ padding: "5px", background: "linear-gradient(#5CB8E4, #277BC0)", color: "#ebebeb", borderRadius: "20px", maxWidth: "max-content" }}>
                                    Delete ad
                                </button>
                            </div>
                        })
                    }


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
