import { useState, useEffect } from "react";
import { Legend, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Line, CartesianGrid } from "recharts";
import { mdiHomeRoof, mdiChevronDoubleDown } from '@mdi/js';
import { Icon } from '@mdi/react';
import { Link } from 'react-router-dom';
import { isMobile, isDesktop, getWindowDimensions } from "../../components/UserAgent";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase"

export default function Dash() {
    // State
    const [crumbs, setCrumbs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chart, setChart] = useState("Earnings");
    const winDimensions = getWindowDimensions();

    const [justifyClass, setJustifyClass] = useState("")

    const [goodEveningClass, setGEClass] = useState("bg-zinc-900 rounded-2xl pl-10 pr-10 mt-3");
    const [goodEveningChartWidth, setGEChartWidth] = useState(isMobile() ? winDimensions.width * 0.66 : winDimensions.width * 0.33);

    const [activeTab, setActiveTab] = useState(0);
    const [tabsClass, setTabClass] = useState();
    // 0: Account
    // 1: Products
    // 2: TODO

    // const unsub = onSnapshot(doc(db, "users", "0x269616D549D7e8Eaa82DFb17028d0B212D11232A"));
    // Sample data for line graph
    const data = [
        { name: '06:00', Earnings: 1320, Subscribers: 1312 },
        { name: '12:00', Earnings: 3000, Subscribers: 1324 },
        { name: '18:00', Earnings: 2000, Subscribers: 1239 },
        { name: '00:00', Earnings: 2780, Subscribers: 1630 },
        { name: '06:00', Earnings: 1890, Subscribers: 1690 },
    ];

    useEffect(() => {
        function handleResize() {
            setJustifyClass(isDesktop() ? "flex justify-around" : "");
            setGEChartWidth(isMobile() ? winDimensions.width * 0.66 : winDimensions.width * 0.33);
            // setGEClass("bg-zinc-900 rounded-2xl pl-10 pr-10 mt-3" + (isDesktop() ? "" : ""))

            setTabClass("bg-zinc-900 rounded-2xl pl-10 pr-10 mt-3" +
                (isDesktop() ?
                "w-1/4 mt-3":
                "")
            )
            
            if(isDesktop()) {
                setGEClass("bg-zinc-900 rounded-2xl pl-10 pr-10 mt-3 w-1/2 left-0 top-0");
                // setTabClass("bg-zinc-900 rounded-2xl pl-10 pr-10 mt-3 w-1/4 inset-x-0 top-0");
                return;
            }

            // Mobile classes
            setGEClass("text-sm bg-zinc-900 rounded-lg w-fit pl-5 pr-5 mb-5");
        }
    
        window.addEventListener('resize', handleResize);
        handleResize();
        console.log(window.location);
    })

    // Effects
    useEffect(() => {
        const crumbs = [
            {
                name: 'Home',
                path: '/',
                icon: mdiHomeRoof
            }
        ]

        setCrumbs(crumbs);
    }, []);

    function Tabs() {
        switch (activeTab) {
            case 0:
                return (
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <div className="avatar online">
                                <div className="w--16 rounded-full">
                                <img src="https://placeimg.com/128/128/people" />
                                </div>
                            </div>
                        </div>
                        <div className="stat-value">Ethan Hanlon</div>
                        <div className="stat-title">Tasks Done</div>
                        <div className="stat-desc text-secondary">31 tasks remaining</div>
                    </div>
                )
            case 1:
                return (
                    <p>Hello, world!</p>
                )
            default:
                activeTab = 0;
                return;
        }
    }

    
    return (
        <div className="p-8 m-2">
            {/* DashCrumbs */}
            <div className="text-sm breadcrumbs bg-zinc-900 rounded-lg w-fit pl-5 pr-5 mb-5 flex-none">
                <ul>
                    {crumbs.map(crumb => (
                        <li>
                            <Link to={crumb.link}>
                                <Icon path={crumb.icon} size={1} />
                                <span>{crumb.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={justifyClass}>
                {/* Good Evening! */}
                <div className={goodEveningClass}>
                    <h1 className="text-4xl pt-5 font-black">Good Evening, Placeholder!</h1>
                    <div className="divider"/>
                    <h1 className="text-2xl font-bold">
                        Here are your &nbsp;
                        {/* Chart data type */}
                        <div className="dropdown">
                            <label tabIndex={0} className="link">{chart}</label>
                            <ul tabIndex={0} className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <button className="btn btn-ghost" onClick={() => { setChart("Earnings") }}>Earnings</button>
                                </li>
                                <li>
                                    <button className="btn btn-ghost" onClick={() => { setChart("Subscribers") }}>Subscribers</button>
                                </li>
                            </ul>
                        </div>
                        &nbsp;for&nbsp;
                        {/* Chart company */}
                        <div className="dropdown">
                            <label tabIndex={0} className="link">Politifi</label>
                            <ul tabIndex={0} className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <a>Politifi</a>
                                </li>
                                <li>
                                    <a>TriLinked</a>
                                </li>
                            </ul>
                        </div>
                        &nbsp;over the past&nbsp;
                        {/* Chart timespan */}
                        <div className="dropdown">
                            <label tabIndex={0} className="link">24 hours</label>
                            <ul tabIndex={0} className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <button className="btn">24 hours</button>
                                </li>
                                <li>
                                    <a>7 days</a>
                                </li>
                                <li>
                                    <a>90 days</a>
                                </li>
                                <li>
                                    <a>365 days</a>
                                </li>
                            </ul>
                        </div>
                    </h1>

                    {/* Chart display */}
                    <div className="flex justify-center pt-10">
                        <LineChart data={data} width={goodEveningChartWidth} height={300}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey={chart} activeDot={{ r: 8 }} />
                        </LineChart>
                    </div>
                </div>

                {/* Tabs */}
                <div className={tabsClass}>
                    <div className="tabs w-full">
                        <a className="tab tab-lifted tab-active tab-lg">Account</a>
                        <a className="tab tab-lifted tab-lg">Tab 1</a>
                        <a className="tab tab-lifted tab-lg">Tab 3</a>
                    </div>
                    <Tabs />
                </div>
            </div>
        </div>
    )
}