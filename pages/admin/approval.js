import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useEffect, useState } from "react"
import { changeTaskStatus, getTasks, getUser, insertHistory, upsertUser } from "../../database/functions";
import { constants } from "../../utils/constants";
import { initializeUser } from "../../utils/initializeUser";
import { isNumeric } from "../../utils/isNumeric";
import { generateRandomID } from "../../utils/randomID";
import { TASK_STATUS } from "../ad";

export default function Dashboard() {

    const [navopen, setNavopen] = useState(false);
    const [load, setLoad] = useState(false);

    const { user, isLoading } = useUser();
    const [pay, setPay] = useState(0);

    const [pendingTasks, setPendingTasks] = useState([]);

    useEffect(() => {
        initializeUser(user);
    }, [user])

    async function loadPendingTasks() {
        const { data, error } = await getTasks(TASK_STATUS.PENDING);
        if (data && data.length !== 0) setPendingTasks(data);
    }

    async function approveTask(taskID, taskerID, pay) {

        if (!isNumeric(pay)) return;
        setLoad(true);
        await changeTaskStatus(taskID, TASK_STATUS.ACCEPTED);


        // pay the tasker
        const { data: fetchedUserDataArray, error } = await getUser(taskerID);
        let tasker = null;
        if (fetchedUserDataArray.length !== 0) {
            tasker = fetchedUserDataArray[0];
            await upsertUser(tasker.userID, tasker.email, (tasker.balance + parseFloat(pay)), tasker.pendingWithdrawalBalance, tasker.referredBy);
            const history = `Task ID : ${taskID}. Your task was approved. You got payed ${pay} $`;
            await insertHistory(generateRandomID("HISTORY"), tasker.userID, history);
        }

        await loadPendingTasks();
        location.reload();
        setLoad(false);
    }

    async function denyTask(taskID, taskerID) {
        setLoad(true);
        await changeTaskStatus(taskID, TASK_STATUS.DENIED);
        const history = `Task ID : ${taskID}. Your task was denied.`;
        await insertHistory(generateRandomID("HISTORY"), taskerID, history);
        await loadPendingTasks();
        location.reload();
        setLoad(false);
    }

    useEffect(() => {
        loadPendingTasks()
    }, [])

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

                {/* use database */}
                <div>
                    <div style={{ border: "1px solid black", width: "94%", margin: "3%", marginBottom: "10vh", height: "80vh", padding: "10px", overflowY: "scroll" }}>

                        {
                            (pendingTasks.length === 0) && <h1>No Tasks left to review</h1>
                        }

                        {
                            pendingTasks.map((task) => {
                                return (
                                    <div key={task.taskID} style={{
                                        maxWidth: "95%",
                                        margin: "auto",
                                        marginBottom: "10px",
                                        padding: "10px",
                                        border: "1px solid black",
                                    }}>

                                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                            <h3>Task ID</h3>
                                            <h5 style={{ wordBreak: "break-all", }}>{" " + task.taskID}</h5>
                                        </div>
                                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                            <h3>Task Secret</h3>
                                            <h5 style={{ wordBreak: "break-all", }}>{" " + task.secret}</h5>
                                        </div>

                                        <img style={{ minWidth: "90%", maxWidth: "90%", margin: "5%", border: "2px solid black" }} className="img-fluid" src={`${constants.SUPABASE_PROOF_IMAGES_URL}${task.proof}`} alt="img" />

                                        <h3>Payment ammount</h3>

                                        <input type="text" placeholder="payment ammount" style={{
                                            margin: "10px",
                                            backgroundColor: "transparent",
                                            borderLeft: "none",
                                            borderTop: "none",
                                            borderRight: "none",
                                            borderBottom: "1px solid black"
                                        }}
                                            onChange={(e) => { setPay(e.target.value) }}
                                        />


                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <button
                                                onClick={async () => { await approveTask(task.taskID, task.taskerID, pay) }}
                                                style={{ padding: "5px", margin: "10px", background: "linear-gradient(#5CB8E4, #277BC0)", color: "#ebebeb", borderRadius: "20px", maxWidth: "max-content" }}>
                                                Approve task
                                            </button>
                                            <button
                                                onClick={async () => { await denyTask(task.taskID, task.taskerID) }}
                                                style={{ padding: "5px", margin: "10px", background: "linear-gradient(#5CB8E4, #277BC0)", color: "#ebebeb", borderRadius: "20px", maxWidth: "max-content" }}>
                                                Deny task
                                            </button>

                                        </div>
                                    </div>
                                )

                            })
                        }


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
