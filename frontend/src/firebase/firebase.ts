async function importModule(moduleName: string):Promise<any> {
    console.log("importing ", moduleName);
    const importedModule = await import(moduleName);
    console.log("\timported ...");
    return importedModule;
}

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

let devKeys = await importModule("./keys.ts");

const firebaseConfig = {

    apiKey: devKeys.apiKey == undefined ? "" : devKeys.apiKey,

    authDomain: "trilinkt.firebaseapp.com",

    projectId: "trilinkt",

    storageBucket: "trilinkt.appspot.com",

    messagingSenderId: "872437238476",

    appId: "1:872437238476:web:8ed3c244a2c3b659a8d069",

    measurementId: "G-N2YGBP6YFF"
};
  
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);