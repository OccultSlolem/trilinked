// @ts-ignore
import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
import { FirebaseError } from 'firebase-admin/app';
import { CallableContext } from 'firebase-functions/v1/https';
import { cert, ServiceAccount } from 'firebase-admin/app';
import serviceAccountCert from './serviceAccountCert.json';
import Moralis from 'moralis';

export type OnCallHandler<T> = (data: T, context: CallableContext) => Promise<unknown>;

const app = admin.initializeApp({
    ...
    functions.config().firebase,
    credential: cert(serviceAccountCert as ServiceAccount),
});
const auth = admin.auth(app);


interface RequestMessageData {
    address: string;
    chain: number;
}

interface IssueTokenData {
    message: string;
    signature: string;
}

export const requestMessage = functions.https.onCall(async (data: RequestMessageData) => {
    const now = new Date();
    const expirationDays = 7;
    const expiration = new Date(now.getTime() + expirationDays * 86400000);

    const response = await Moralis.Auth.requestMessage({
        chain: 80001, // Mumbai Testnet. Polygon Mainnet ID: 137
        network: 'evm',
        timeout: 15,
        domain: 'defi.finance',
        uri: 'https://wopv1d6uy1s2.usemoralis.com:2053/server',
        statement: 'Please confirm this message',
        address: data.address,
        notBefore: now.toISOString(),
        expirationTime: expiration.toISOString(),
    });
    return response.raw;
});


export async function userExists(auth: ReturnType<typeof admin.auth>, uid: string): Promise<boolean> {
    try {
        await auth.getUser(uid);
        return true;
    } catch (e) {
        if ((e as FirebaseError).code === 'auth/user-not-found') {
            return false;
        }
        throw e;
    }
}


export const issueToken = functions.https.onCall(async (data: IssueTokenData) => {
    const response = await Moralis.Auth.verify({
        network: 'evm',
        message: data.message,
        signature: data.signature,
    });
    const uid = response.result.profileId;

    if (!await userExists(auth, uid)) {
        await auth.createUser({
            uid,
            displayName: response.result.address.checksum,
        });
    }

    const token = await auth.createCustomToken(uid);
    return { token };
});

/*
export const getSecretData = functions.https.onCall(guard(async () => {
  const secretValue = 'I am a secret';
  return {secretValue};
}));
*/

export function guard<T>(handler: OnCallHandler<T>) {
    return async (data: T, context: CallableContext) => {
        if (!context.auth?.uid) {
            throw new functions.https.HttpsError('permission-denied', 'You are not authorized to call this function');
        }
        return await handler(data, context);
    };
}

