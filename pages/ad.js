import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useEffect, useState } from "react"
import { addProofOfTask, addProveImage, getAds, insertHistory, insertTask } from "../database/functions";
import { initializeUser } from "../utils/initializeUser";
import YouTube from 'react-youtube';
import { generateRandomID } from "../utils/randomID";
import { AD_TYPES } from "./admin/ad";


const STATE = {
    NO_AD_AVAILABLE: "NO_AD_AVAILABLE",
    AD_LOADED: "AD_LOADED",
    AD_RUNNING: "AD_RUNNING",
    AD_PAUSED: "AD_PAUSED",
    TAKE_PROOF: "TAKE_PROOF",
    SUBMIT_PRROF: "SUBMIT_PROOF",
    LOAD_NEW_AD: "LOAD_NEW_AD",
}

const VIDEO_TIME = 15;

export const TASK_STATUS = {
    CREATED: "CREATED",
    PENDING: "PENDING",
    DENIED: "DENIED",
    ACCEPTED: "ACCEPTED"
}

export default function Dashboard() {

    const [navopen, setNavopen] = useState(false);
    const [load, setLoad] = useState(false);
    const [files, setFiles] = useState(null);
    const { user, isLoading } = useUser();
    const [ad, setAd] = useState(null);

    const [state, setState] = useState(STATE.NO_AD_AVAILABLE);
    const [time, setTime] = useState(VIDEO_TIME);

    const [task, setTask] = useState(null);




    useEffect(() => {
        console.log(state);
        let interval = null;
        if (state === STATE.AD_RUNNING && interval === null) {
            interval = setInterval(() => {
                setTime((time) => time - 1);
            }, 1000);
        }
        else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };

    }, [state])





    async function handleUpload(files) {
        setLoad(true);
        let file = null;
        if (files) {
            file = files[0];
        }
        if (!file) return;
        let filename = task.taskID + "." + file.name.split(".")[1];
        console.log(filename);
        const { data, error } = await addProveImage(filename, file);
        await addProofOfTask(task.taskID, filename, TASK_STATUS.PENDING);
        // insert history
        const history = `You submitted proof for "Task ${task.taskID}", review pending`;
        await insertHistory(generateRandomID("HISTORY"), user.sub, history);
        console.log(data);
        setState(STATE.LOAD_NEW_AD);
        setLoad(false);
    }


    async function loadAd() {
        const { data, error } = await getAds();
        console.log(data);
        if (data && data.length !== 0) {
            let randomAd = data[parseInt(Math.random() * data.length)];
            setAd(randomAd);
            if (randomAd.type === AD_TYPES.AD_NETWORK) {
                setState(STATE.AD_RUNNING);
            }
            else {
                setState(STATE.AD_LOADED);
            }
        }
    }

    async function createTask(user) {
        if (!user || !ad || task) return;

        let taskID = generateRandomID("TASK");
        let taskerID = user.sub;
        let secret = generateRandomID("SECRET");
        let proof = '';
        let link = ad.link;
        let status = TASK_STATUS.CREATED;

        setLoad(true);
        let { data, error } = await insertTask(taskID, taskerID, secret, proof, link, status);
        if (data && data.length !== 0) setTask(data[0]);
        setLoad(false);
    }

    useEffect(() => {
        loadAd();
    }, []);

    // useEffect(() => {
    //     createTask(user);
    // }, [user, ad]);


    useEffect(() => {
        initializeUser(user);
    }, [user]);





    if (isLoading || load) {
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


                {
                    (state === STATE.NO_AD_AVAILABLE) &&
                    <div style={{ border: "1px solid black", display: "flex", justifyContent: "center", padding: "10px", minHeight: "70vh" }}>
                        <h3>No ads available for now</h3>
                    </div>
                }

                {


                    ((state === STATE.AD_LOADED) || (state === STATE.AD_RUNNING) || (state === STATE.AD_PAUSED)) &&
                    <div style={{}}>

                        <button
                            onClick={async () => {
                                await createTask(user);
                                if (time < 0) setState(STATE.TAKE_PROOF);
                            }}
                            style={{ margin: "10px", borderRadius: "50%", backgroundColor: "black", color: "white", padding: "20px", border: "1px solid white" }}>
                            {(time > 0) ? (time + " seconds") : "X"}
                        </button>

                        {

                            (ad.type === AD_TYPES.YOUTUBE) &&
                            < YouTube
                                videoId={ad.link}                  // defaults -> ''
                                // id={string}                       // defaults -> ''
                                className="youtube-video-player"                // defaults -> ''
                                // iframeClassName={string}          // defaults -> ''
                                // style={object}                    // defaults -> { }
                                // title={string}                    // defaults -> ''
                                // loading={string}                  // defaults -> undefined
                                // opts={obj}                        // defaults -> { }
                                onReady={() => { console.log('ready') }}
                                onPlay={() => { setState(STATE.AD_RUNNING) }}
                                onPause={() => { setState(STATE.AD_PAUSED) }}
                                onEnd={async () => {
                                    await createTask(user);
                                    (time <= 0) && setState(STATE.TAKE_PROOF);
                                }}
                            // onError={func}                    // defaults -> noop
                            // onStateChange={func}              // defaults -> noop
                            // onPlaybackRateChange={func}       // defaults -> noop
                            // onPlaybackQualityChange={func}    // defaults -> noop
                            />
                        }

                        {

                            (ad.type === AD_TYPES.AD_NETWORK) &&
                            <iframe style={{
                                minHeight: "70vh",
                                width: "100%",
                            }}
                                src={ad.link} >
                            </iframe>

                        }

                    </div>
                }

                {
                    (state === STATE.TAKE_PROOF) &&
                    <div style={{ border: "1px solid black", padding: "10px", wordBreak: "break-all", padding: "10px", minHeight: "70vh" }}>
                        <h1>Take screenshot </h1>
                        <h5>Task ID : {task.taskID} </h5>
                        <h5>Task Secret : {task.secret} </h5>
                        <div className="diposite_bank_btn text-center">
                            <button
                                style={{ padding: "5px", background: "linear-gradient(#5CB8E4, #277BC0)", color: "#ebebeb", borderRadius: "20px", maxWidth: "max-content" }}
                                onClick={() => { setState(STATE.SUBMIT_PRROF) }}>
                                Done
                            </button>
                        </div>
                    </div>
                }


                {
                    (state === STATE.SUBMIT_PRROF) &&
                    <div style={{ padding: "10px" }}>

                        <h1>Upload screenshot </h1>
                        <section id="record_item">
                            <div className="container">
                                <div className="record_item_main">
                                    <div className="row">
                                        <div className="col-lg-6 m-auto">
                                            <div className="record_item_full">
                                                <div className="screenshot_item">
                                                    <div className="item_main">
                                                        <div className="tittle">
                                                            <h4></h4>
                                                        </div>
                                                        <input type="file" accept="image/*"
                                                            onChange={async (e) => setFiles(e.target.files)} />
                                                    </div>
                                                    <div className="diposite_bank_btn text-center">
                                                        <button onClick={async () => { handleUpload(files) }}>Upload</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                }


                {
                    (state === STATE.LOAD_NEW_AD) &&
                    <div style={{ border: "1px solid black", padding: "10px", minHeight: "70vh" }}>
                        <h1 style={{ textAlign: "center" }}>
                            Proof Submitted
                        </h1>
                        <div className="diposite_bank_btn text-center">
                            <button
                                style={{ padding: "5px", background: "linear-gradient(#5CB8E4, #277BC0)", color: "#ebebeb", borderRadius: "20px", maxWidth: "max-content" }}
                                onClick={() => { location.reload() }}>
                                Load New Ad
                            </button>
                        </div>
                    </div>
                }

                {/* <!--TASK HALL PART START-- > */}

                {/* < !--Mobile Bottom ICON BAR PART START-- > */}
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

                                        <div className="icon_item active">
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
