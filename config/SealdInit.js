import SealdSDK from "@seald-io/sdk";

import SealdSDKPluginSSKS2MR from '@seald-io/sdk-plugin-ssks-2mr';
import SealdSDKPluginSSKSPassword from '@seald-io/sdk-plugin-ssks-password';

let sealdSDKInstance = null;

const instantiateSealdSDK = async ({ databaseKey, sessionID, appId }) => {
    // console.log(process.env.REACT_APP_seald_apiURL);
    // console.log(process.env.REACT_APP_ssks_key_storage_url);
    sealdSDKInstance = SealdSDK({
        apiURL: "https://api.seald.io/",
        appId: appId,
        databaseKey: databaseKey, //Generated on the Server
        databasePath: `seald-seacure-message-hub-${sessionID}`,
        plugins: [SealdSDKPluginSSKS2MR(), SealdSDKPluginSSKSPassword()],
    });
    await sealdSDKInstance.initialize(); // Initialize the SealdSdk
};

const sleep = () => {
    return new Promise((res, rej) => { setTimeout(res, 1) })
}
export const retrieveIdentityFromLocalStorage = async ({
    databaseKey,
    sessionID,
    appId
}) => {
    return new Promise(async (res, rej) => {
        await instantiateSealdSDK({ databaseKey, sessionID, appId });
        await sleep()
        const status = await sealdSDKInstance.registrationStatus();
        if (status !== "registered") {
            rej(status)
        } else {
            res(status)


        }
    })

};

export const createIdentity = async ({
    userId,
    userLicenseToken,
    databaseKey,
    sessionID,
    jwt,
    appId
}) => {
    await instantiateSealdSDK({ databaseKey, sessionID, appId });
    await sealdSDKInstance.initiateIdentity({ userId, userLicenseToken });
    // await sealdSDKInstance.ssksPassword.saveIdentity({ userId, password });
};

export const saveIdentity = async ({
    userId,
    twoManRuleKey,
    emailAddress,
    twoManRuleSessionId,
    challenge = false,
    databaseKey,
    sessionID,
    appId
}) => {
    await instantiateSealdSDK({ databaseKey, sessionID, appId });
    if (!challenge) {
        await sealdSDKInstance.ssks2MR.saveIdentity({
            authFactor: {
                type: "EM",
                value: emailAddress,
            },
            twoManRuleKey,
            userId,
            sessionId: twoManRuleSessionId,
        });
    } else {
        await sealdSDKInstance.ssks2MR.saveIdentity({
            challenge,
            authFactor: {
                type: "EM",
                value: emailAddress,
            },
            twoManRuleKey,
            userId,
            sessionId: twoManRuleSessionId,
        });
    }
};

export const retrieveIdentity = async ({
    userId,
    databaseKey,
    sessionID,
    emailAddress,
    twoManRuleKey,
    twoManRuleSessionId,
    challenge = null,
    password = false,
    appId
}) => {

    await instantiateSealdSDK({ databaseKey, sessionID, appId });
    if (!password) {
        await sealdSDKInstance.ssks2MR.retrieveIdentity({
            challenge,
            authFactor: {
                type: "EM",
                value: emailAddress,
            },
            twoManRuleKey,
            userId,
            sessionId: twoManRuleSessionId,
        });
    } else {
        await sealdSDKInstance.ssksPassword.retrieveIdentity({ userId, password });
        if (challenge) {
            await sealdSDKInstance.ssks2MR.saveIdentity({
                challenge,
                authFactor: {
                    type: "EM",
                    value: emailAddress,
                },
                twoManRuleKey,
                userId,
                sessionId: twoManRuleSessionId,
            });
        } else {
            await sealdSDKInstance.ssks2MR.saveIdentity({
                authFactor: {
                    type: "EM",
                    value: emailAddress,
                },
                twoManRuleKey,
                userId,
                sessionId: twoManRuleSessionId,
            });
        }
    }
    const status = await sealdSDKInstance.registrationStatus();

};

export const getSealdSDKInstance = () => sealdSDKInstance;
