import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUser, getUsersThatWereRefferdByUser, insertHistory, upsertUser } from "../database/functions";
import { constants } from "../utils/constants";
import { initializeUser } from "../utils/initializeUser";
import { generateRandomID } from "../utils/randomID";




export default function Profile() {
    const router = useRouter();

    const [navopen, setNavopen] = useState(false);
    const [reference, setReference] = useState("");
    const [fetchedUser, setFetchedUser] = useState(null);
    const [load, setLoad] = useState(false);
    const [referred, setReferred] = useState(0);



    const { user, isLoading } = useUser();



    async function fetchUser() {
        if (!user) return;
        const { data: fetchedUserDataArray, error } = await getUser(user.sub);
        let fetchedUserData = fetchedUserDataArray[0];
        if (fetchedUserData) {
            setFetchedUser(fetchedUserData);
            if (fetchedUserData?.referredBy) setReference(fetchedUserData?.referredBy);
            else setReference("");
        }
        const { data: fetchedReferred } = await getUsersThatWereRefferdByUser(user.sub);
        setReferred(fetchedReferred?.length);

    }

    // add payment to referrer (not implemented)
    async function addReferal() {
        console.log(reference);
        setLoad(true);
        if (user?.sub === reference) return;

        // update the new user's referredBy
        await upsertUser(fetchedUser.userID, fetchedUser.email, fetchedUser.balance, fetchedUser.pendingWithdrawalBalance, reference);
        console.log(reference);
        const { data: fetchedUserDataArray, error } = await getUser(reference);
        console.log(fetchedUserDataArray);
        let referrer = null;
        if (fetchedUserDataArray.length !== 0) referrer = fetchedUserDataArray[0];

        if (referrer) {
            await upsertUser(referrer.userID, referrer.email, (referrer.balance + constants.REFERRAL_PAYOUT), referrer.pendingWithdrawalBalance, referrer.referredBy);
            const history = `You referred a new user to this site! You got payed : ${constants.REFERRAL_PAYOUT} $`;
            await insertHistory(generateRandomID("HISTORY"), referrer.userID, history);
        }

        await fetchUser();
        setLoad(true);
    }

    useEffect(() => {
        fetchUser();
        initializeUser(user);
    }, [user])




    if (isLoading && load) {
        return (
            <div>
                <p>loading . . .</p>
            </div>
        )
    }
    else if (!user) {
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
                                            <h5>{fetchedUser?.email}</h5>
                                            <div className="edit" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="icon">
                                        <Link href="/dashboard"><i className="fa-solid fa-angle-left"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div style={{ padding: "30px" }}>
                    <h5>{"You will reieve " + constants.REFERRAL_PAYOUT + "$ per referal!"}</h5>
                    <h2>Inviation Code</h2>
                    <h5>{user?.sub}</h5>
                    <h5>{"You referred " + referred + " people"}</h5>
                </div>

                {
                    < div style={{ padding: "30px" }}>


                        <h2>{"Referred By"}</h2>
                        <input type="text" placeholder="reference" value={reference} style={{
                            backgroundColor: "transparent",
                            borderLeft: "none",
                            borderTop: "none",
                            borderRight: "none",
                            borderBottom: "1px solid black"
                        }}
                            onChange={(e) => {
                                (fetchedUser?.referredBy === null) &&
                                    setReference(e.target.value)
                            }}
                        />

                        <button
                            disabled={fetchedUser?.referredBy !== null}
                            onClick={async () => { await addReferal() }}
                            style={{ backgroundColor: "#dbdbdb", borderRadius: "25%", padding: "10px", margin: "10px" }}>
                            Add
                        </button>
                    </div>
                }


                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div className="service_item text-center" style={{ width: "max-content", backgroundColor: "#dbdbdb", margin: "10px", marginLeft: "10px", padding: "10px", borderRadius: "10px" }}>
                        <Link href="/bank_card"><i className="fa-solid fa-building"></i></Link>
                        <p>Payment</p>
                    </div>
                    <div className="service_item text-center" style={{ width: "max-content", backgroundColor: "#dbdbdb", margin: "10px", marginLeft: "10px", padding: "10px", borderRadius: "10px" }}>
                        <Link href="/api/auth/logout?federated"><i className="fa-solid fa-power-off"></i>
                        </Link>
                        <p>Logout</p>
                    </div>
                </div>




                {/* <div className="icon_item" style={{ backgroundColor: "#dbdbdb", paddingTop: "50px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>

                </div> */}


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
