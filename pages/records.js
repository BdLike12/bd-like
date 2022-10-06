import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getTasksOfUser } from "../database/functions";
import { TASK_STATUS } from "./ad";


const PAGE_STATES = {
    HISTORY: "HISTORY",
    PENDING: "PENDING",
    COMPLETED: "COMPLETED",
    REJECTED: "REJECTED",
}



const stateLinkStyle = {

};



export default function Records() {

    const [navopen, setNavopen] = useState(false);
    const [load, setLoad] = useState(false);

    const [state, setState] = useState(PAGE_STATES.HISTORY);
    const [tasks, setTasks] = useState([]);
    const { user, isLoading } = useUser();


    async function loadTasks() {

        if (!user) return;


        if (state === PAGE_STATES.PENDING) {
            setLoad(true);
            const { data, error } = await getTasksOfUser(user.sub, TASK_STATUS.PENDING);
            if (data) setTasks(data);
            setLoad(false);
            return;
        }

        if (state === PAGE_STATES.COMPLETED) {
            setLoad(true);
            const { data, error } = await getTasksOfUser(user.sub, TASK_STATUS.ACCEPTED);
            if (data) setTasks(data);
            setLoad(false);
            return;
        }

        if (state === PAGE_STATES.REJECTED) {
            setLoad(true);
            const { data, error } = await getTasksOfUser(user.sub, TASK_STATUS.DENIED);
            if (data) setTasks(data);
            setLoad(false);
            return;
        }
    }

    useEffect(() => {
        loadTasks();
    }, [state, user]);



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




                {/* <!-- HEADING PART START --> */}

                <section id="heading">
                    <div className="container">
                        <div className="heading_main">
                            <div className="row">
                                <div className="col-3">
                                    <div className="heading_item">
                                        <div href="#history"
                                            onClick={() => { setState(PAGE_STATES.HISTORY) }}>History</div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="heading_item">
                                        <div href="#pending-tasks"
                                            onClick={() => { setState(PAGE_STATES.PENDING) }}>Pending</div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="heading_item">
                                        <div href="#completed-tasks"
                                            onClick={() => { setState(PAGE_STATES.COMPLETED) }}>Completed</div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="heading_item">
                                        <div href="#rejected-tasks" 
                                            onClick={() => { setState(PAGE_STATES.REJECTED) }}>Rejected</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- HEADING PART END --> */}


                {
                    (state === PAGE_STATES.COMPLETED) &&
                    <div style={{ border: "1px solid black", width: "94%", margin: "3%", marginBottom: "10vh", height: "80vh", padding: "10px", overflowY: "scroll" }}>
                        {
                            tasks &&
                            <h3 style={{ textAlign: "center", marginBottom: "30px" }}>
                                You have {tasks.length} Completed tasks.
                            </h3>
                        }
                        {
                            tasks.map((task) => {
                                return (
                                    <div key={task.taskID} style={{
                                        maxWidth: "95%",
                                        margin: "auto",
                                        marginBottom: "10px",
                                        padding: "10px",
                                        border: "1px solid black",
                                        display: "flex",
                                        gap: "10px",
                                        alignItems: "center"
                                    }}>
                                        <h2>
                                            {"Taks ID : "}
                                        </h2>
                                        <h5 style={{ wordBreak: "break-all" }}>{task.taskID}</h5>
                                    </div>
                                )
                            })
                        }

                    </div>
                }


                {
                    (state === PAGE_STATES.REJECTED) &&
                    <div style={{ border: "1px solid black", width: "94%", margin: "3%", marginBottom: "10vh", height: "80vh", padding: "10px", overflowY: "scroll" }}>
                        {
                            tasks &&
                            <h3 style={{ textAlign: "center", marginBottom: "30px" }}>
                                You have {tasks.length} tasks denied.
                            </h3>
                        }
                        {
                            tasks.map((task) => {
                                return (
                                    <div key={task.taskID} style={{
                                        maxWidth: "95%",
                                        margin: "auto",
                                        marginBottom: "10px",
                                        padding: "10px",
                                        border: "1px solid black",
                                        display: "flex",
                                        gap: "10px",
                                        alignItems: "center"
                                    }}>
                                        <h2>
                                            {"Taks ID : "}
                                        </h2>
                                        <h5 style={{ wordBreak: "break-all" }}>{task.taskID}</h5>
                                    </div>
                                )
                            })
                        }

                    </div>
                }


                {
                    (state === PAGE_STATES.PENDING) &&
                    <div style={{ border: "1px solid black", width: "94%", margin: "3%", marginBottom: "10vh", height: "80vh", padding: "10px", overflowY: "scroll" }}>
                        {
                            tasks &&
                            <h3 style={{ textAlign: "center", marginBottom: "30px" }}>
                                You have {tasks.length} tasks pending to be reviewed.
                            </h3>
                        }
                        {
                            tasks.map((task) => {
                                return (
                                    <div key={task.taskID} style={{
                                        maxWidth: "95%",
                                        margin: "auto",
                                        marginBottom: "10px",
                                        padding: "10px",
                                        border: "1px solid black",
                                        display: "flex",
                                        gap: "10px",
                                        alignItems: "center"
                                    }}>
                                        <h2>
                                            {"Taks ID : "}
                                        </h2>
                                        <h5 style={{ wordBreak: "break-all" }}>{task.taskID}</h5>
                                    </div>
                                )
                            })
                        }

                    </div>
                }




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
                                            <Link href="#"><i className="fa-solid fa-rectangle-ad"></i></Link>
                                            <p>Ad</p>
                                        </div>
                                        <div className="icon_item active">
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
                </section >
            </div >

        )
    }
}