import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPaymentMethods, getUser, updatePaymentMethodsOfUser, upsertUser } from "../database/functions";
import { initializeUser } from "../utils/initializeUser";


export default function Bank_card() {

    const [navopen, setNavopen] = useState(false);
    const { user, isLoading } = useUser();

    const [load, setLoad] = useState(false);

    const [availableBalance, setAvailableBalance] = useState(0.0);
    const [pendingWithdrawalBalance, setPendingWithdrawalBalance] = useState(0.0);
    const [withdrawalAmmount, setWithdrawalAmmount] = useState(0);

    const [fullName, setFullName] = useState("");
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [bkashNumber, setBkashNumber] = useState("");
    const [fetchedUser, setFetchedUser] = useState(null);



    async function updatePaymentMethod() {
        setLoad(true);
        await updatePaymentMethodsOfUser(user.sub, fullName, accountNumber, cardNumber, bkashNumber, bankName);
        setLoad(false);
    }

    async function withdrawRequest() {
        setLoad(true);
        let newPendingWithdrawalBalance = fetchedUser.pendingWithdrawalBalance + parseInt(withdrawalAmmount);
        let newBalance = fetchedUser.balance - parseInt(withdrawalAmmount);
        if(newBalance > 0)
        {
            await upsertUser(fetchedUser.userID, fetchedUser.email, newBalance, newPendingWithdrawalBalance);
        }
        setWithdrawalAmmount(0);
        setLoad(false);
    }
    async function fetchUser() {
        if (!user) return;
        const { data: fetchedUserDataArray, error } = await getUser(user.sub);
        let fetchedUserData = fetchedUserDataArray[0];
        if (fetchedUserData) {
            setFetchedUser(fetchedUserData);
            setAvailableBalance(fetchedUserData.balance);
            setPendingWithdrawalBalance(fetchedUserData.pendingWithdrawalBalance);
        }
    }
    async function fetchMethods() {
        if (!user) return;
        let { data: method, error } = await getPaymentMethods(user.sub);
        if (method) {
            if (method.fullName) setFullName(method.fullName);
            if (method.bankName) setBankName(method.bankName);
            if (method.bankAccount) setAccountNumber(method.bankAccount);
            if (method.cardNumber) setCardNumber(method.cardNumber);
            if (method.bkashNumber) setBkashNumber(method.bkashNumber);
        }
    }

    useEffect(() => {
        fetchUser();
        fetchMethods();
        initializeUser(user);
    }, [user, load])




    if (isLoading || load) {
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
                                            <h5>{"Payment Method's information"}</h5>
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
                            <div className="bank_name_item" style={{ maxWidth: "max-content" }}>
                                <p>available balance</p>
                                <input type="text" placeholder="balance" readOnly value={availableBalance} />
                            </div>
                            <div className="bank_name_item" style={{ maxWidth: "max-content" }}>
                                <p>Pending withdrawal ammount</p>
                                <input type="text" placeholder="withdraw" readOnly value={pendingWithdrawalBalance} />
                            </div>
                            <div className="bank_name_item" style={{ maxWidth: "max-content" }}>
                                <p>withdrawal ammount</p>
                                <input type="text" placeholder="withdraw" value={withdrawalAmmount}
                                    onChange={(e) => { setWithdrawalAmmount(e.target.value.replace(/\D/, '')) }}
                                />
                            </div>
                        </div>

                        <div className="bank_name_main" style={{ display: "block" }}>
                            <div className="bank_btn text-center">
                                <button onClick={async ()=>{await withdrawRequest()}}>request withdrawal</button>
                            </div>
                        </div>

                        <div className="bank_name_main">
                            <div className="bank_name_item" style={{ maxWidth: "max-content" }}>
                                <p>Full name</p>
                                <input type="text" placeholder="Enter your full Name" value={fullName}
                                    onChange={(e) => { setFullName(e.target.value) }}
                                />
                            </div>

                            <div className="bank_name_item">
                                <p>Bank name</p>
                                <input type="text" placeholder="Enter Bank Name" value={bankName}
                                    onChange={(e) => { setBankName(e.target.value) }}
                                />
                            </div>

                            <div className="bank_name_item">
                                <p>Account Number</p>
                                <input type="text" placeholder="Enter Your Account No" value={accountNumber}
                                    onChange={(e) => { setAccountNumber(e.target.value) }}
                                />
                            </div>

                            <div className="bank_name_item">
                                <p>Card</p>
                                <input type="text" placeholder="Enter you card No" value={cardNumber}
                                    onChange={(e) => { setCardNumber(e.target.value) }}
                                />
                            </div>

                            <div className="bank_name_item">
                                <p>Bkash Number</p>
                                <input type="text" placeholder="Enter your Bkash No" value={bkashNumber}
                                    onChange={(e) => { setBkashNumber(e.target.value) }}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="bank_name_main" style={{ display: "block" }}>
                        <div className="bank_btn text-center">
                            <button onClick={async () => { await updatePaymentMethod() }}>save</button>
                        </div>
                    </div>
                </section >
                {/* <!-- BANK NAME PART END --> */}



                {/* <!-- Mobile Bottom ICON BAR PART START --> */}
                <section id="icon" className="d-sm-none" style={{ backgroundColor: "#ebebeb" }}>
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
