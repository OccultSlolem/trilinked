import React, { useState, useEffect, useRef } from "react";
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';
import { Link } from "react-router-dom";

import { mdiWalletOutline } from '@mdi/js';
import { mdiMenu } from '@mdi/js';
import { mdiMagnify } from '@mdi/js'; 

const TLNavbar = () => {

    //Hooks: 
    const [userAddress, setUserAddress] = useState(""); //stores the users connected address

    useEffect(() => {
        checkIfWalletIsConnected(setUserAddress);
    }, []); 

    //Accounts Changed 
    window.ethereum.on('accountsChanged', function (accounts) {
        checkIfWalletIsConnected(setUserAddress);
    })
      
   

    //Mobile:
    function isMobileDevice () {
        return 'ontouchstart' in window || 'onmsgetsturechange' in window; 
    }

    async function connect(onConnected) {  
        if (!window.ethereum) {
            alert("MetaMask is not currently installed");
            return;
        }

        const accounts = await window.ethereum.request ({
            method: "eth_requestAccounts",
        });

        onConnected(accounts[0]);
    }

    
    async function checkIfWalletIsConnected (onConnected) { //Checks if the user has already connected their wallet

        if (window.ethereum) {

            //metamask request to user wallet
            const accounts = await window.ethereum.request ({
                method: "eth_accounts",
            });

            
            //if user has metamask installed - if() sets up their logged in account to be initialized 
            if ( accounts && accounts.length > 0) {
                const account = accounts[0];
                onConnected(account);
                return; 
            } 

            onConnected(""); 

            //User only clicks once - triggers page load upon entry
            if(isMobileDevice()) {
                await connect(onConnected);
            }
            
        } 
        
    }


    //Change button to wallet icon | Top - Mobile Return | Bottom - Desktop Return
    function Connect() {

        if (isMobileDevice()) {

            const dappUrl = "metamask.app.link/dapp/opensea.io/"    //deep link for mobile users - will be set to opensea until TriLinked is hosted
            const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl; 

            return (
            <a href = {metamaskAppDeepLink}> 
                <button>Connect</button> 
            </a>    
            ); 
        }



        //Displays sliced wallet address upon connect 
        if (userAddress != "") {
            return (
                <p><Icon path={mdiWalletOutline} size={1}/> {userAddress.substring(0, 2)}...{userAddress.substring(userAddress.length - 3)}</p>
            )
        }

        return (<button onClick = {() => { connect(setUserAddress) }}> Connect </button>); 
    }

     

    return (

        <div className="navbar bg-base-300 flex">

            <div className="">
                <a className="btn btn-ghost normal-case text-xl">TriLinked.</a>
            </div>

            
            <div className= "">
                <input type= "text" placeHolder = "" className = "input input-bordered input-sm w-14"></input>
            </div>

            <div className="gap y-5">

                <ul className="menu menu-horizontal p-1">

                    <li><Connect/></li>
                    
                    <li tabIndex={0}>

                        <a><Icon path= {mdiMenu} size = {1}></Icon></a>

                        <ul className="p-2 bg-base-100">
                            <li><a>Profile</a></li>
                            <li><a>Subscriptions</a></li>
                            <li><a>Products</a></li>
                            <li><a>Settings</a></li>
                        </ul>

                    </li>

                    
                </ul>

            </div>

        </div>

    );
}

export default TLNavbar; 

//<Icon path={mdiAccount}/>
