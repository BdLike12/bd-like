import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useEffect, useState } from "react"
import { getPaymentMethods, getUsersWithDuePayment } from "../../database/functions";
import { constants } from "../../utils/constants";
import { initializeUser } from "../../utils/initializeUser";

export default function Payments() {

    const [navopen, setNavopen] = useState(false);
    const { user, isLoading } = useUser();
    const [usersWithDue, setUsersWithDue] = useState([]);
    const [selected, setSelected] = useState(null);

    async function fetchUsersWithDuePayment() {
        if (!usersWithDue || (usersWithDue && usersWithDue.length === 0)) {
            const { data, error } = await getUsersWithDuePayment();
            setUsersWithDue(data);
        }
    }
    const [fullName, setFullName] = useState("");
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [bkashNumber, setBkashNumber] = useState("");

    async function fetchMethods() {
        if (!user) return;
        let { data: method, error } = await getPaymentMethods(selected.userID);
        if (method) {
            if (method.fullName) setFullName(method.fullName);
            if (method.bankName) setBankName(method.bankName);
            if (method.bankAccount) setAccountNumber(method.bankAccount);
            if (method.cardNumber) setCardNumber(method.cardNumber);
            if (method.bkashNumber) setBkashNumber(method.bkashNumber);
        }
    }

    useEffect(() => {
        fetchUsersWithDuePayment();
        initializeUser(user);
    }, [user])

    useEffect(() => {
        if (!selected) return;
        fetchMethods();
    }, [selected?.userID])

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
                                    <Link className="nav-link active" aria-current="page" href="/admin/payments">payments</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" href="/admin/approval">approval</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" href="/admin/ad">Add ad</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {/* <!-- navbar part end --> */}


                {(selected === null) &&
                    <div style={{ border: "1px solid black", width: "94%", marginLeft: "3%", height: "80vh", padding: "10px", overflowY: "scroll" }}>
                        <h3 style={{}}> Payment Due</h3>

                        {
                            usersWithDue.map((user) => {
                                return <div key={user.userID} style={{ maxWidth: "95%", marginBottom: "10px", borderBottom: "1px solid black" }}>
                                    <div>
                                        {user.email}
                                    </div>
                                    <div>
                                        {"Current Balance : " + user.balance}
                                    </div>
                                    <div>
                                        {"Withdraw Request : " + user.pendingWithdrawalBalance}
                                    </div>

                                    <div className="bank_name_main" style={{ display: "block" }}>
                                        <div className="bank_btn text-center">
                                            <button onClick={async () => { setSelected(user) }}>process</button>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                }

                {(selected !== null) &&
                    <div style={{ border: "1px solid black", width: "94%", marginLeft: "3%", height: "80vh", padding: "10px", overflowY: "scroll" }}>
                        <h3 style={{}}> Payment Processing</h3>
                        <div style={{ maxWidth: "95%", marginBottom: "10px", borderBottom: "1px solid black" }}>
                            <div>
                                {"Email : " + selected.email}
                            </div>
                            <div>
                                {"Current Balance : " + selected.balance}
                            </div>
                            <div>
                                {"Withdraw Request : " + selected.pendingWithdrawalBalance}
                            </div>

                            <div>
                                {"FullName : " + fullName}
                            </div>
                            <div>
                                {"bank-name : " + bankName}
                            </div>
                            <div>
                                {"account-number : " + accountNumber}
                            </div>
                            <div>
                                {"card-number : " + cardNumber}
                            </div>
                            <div>
                                {"bkash-number : " + bkashNumber}
                            </div>
                            <div>
                                {"Withdraw Request : " + selected.pendingWithdrawalBalance}
                            </div>
                        </div>

                    </div>
                }





                {/* < !--Mobile Bottom ICON BAR PART START-- > */}
                <section id="icon" className="d-sm-none">
                    <div className="container">
                        <div className="icon_main">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="icon_div">
                                        <div className="icon_item">
                                            <Link href="/admin/dashboard"><i className="fa-solid fa-house"></i></Link>
                                            <p>Home</p>
                                        </div>

                                        <div className="icon_item">
                                            <Link href="/admin/approval"><i className="fa-solid fa-user-cog"></i></Link>
                                            <p>approval</p>
                                        </div>
                                        <div className="icon_item active">
                                            <Link href="/admin/payments"><i className="fa-solid fa-dollar"></i></Link>
                                            <p>payments</p>
                                        </div>
                                        <div className="icon_item">
                                            <Link href="/admin/ad"><i className="fa-solid fa-rectangle-ad"></i></Link>
                                            <p>Ad</p>
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
