import React from "react";
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';
import { Link } from "react-router-dom";

export default function TLNavbar() {
    return (
        <div className="navbar bg-base-200">
            <div className="navbar-start">
                <div className="navbar-item">
                    <h1>Home</h1>
                    {/* <Link to="/">Home</Link> */}
                </div>
            </div>
        </div>
    );
}