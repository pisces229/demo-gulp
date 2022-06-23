const CONST_DEMO_GULP_CHANNEL = 'DEMO_GULP_CHANNEL';
const CONST_USER_INFO = 'USER_INFO';
const CONST_REQ_SIGN_IN = 'REQ_SIGN_IN';
const CONST_REQ_SIGN_OUT = 'REQ_SIGN_OUT';
const CONST_RESP_SIGN_IN = 'RESP_SIGN_IN';
// work same origin: 'http://localhost:port'
const broadcastChannel = new BroadcastChannel(CONST_DEMO_GULP_CHANNEL);
broadcastChannel.onmessage = (e) => {
    console.log('onmessage', e);
    switch (e.data.action) {
        case CONST_REQ_SIGN_IN:
            if (sessionStorage.getItem(CONST_USER_INFO)) {
                broadcastChannel.postMessage({ 
                    action: CONST_RESP_SIGN_IN, 
                    data: sessionStorage.getItem(CONST_USER_INFO),
                });
            }
            break;
        case CONST_RESP_SIGN_IN: 
            if (!sessionStorage.getItem(CONST_USER_INFO)) {
                sessionStorage.setItem(CONST_USER_INFO, e.data.data);
                state();
            }
            break;
        case CONST_REQ_SIGN_OUT:
            if (sessionStorage.getItem(CONST_USER_INFO)) {
                sessionStorage.removeItem(CONST_USER_INFO);
                state();
            }
            break;
    }
}
window.setTimeout(() => {
    state();
    if (!sessionStorage.getItem(CONST_USER_INFO)) {
        console.log("postMessage CONST_REQ_SIGN_IN");
        broadcastChannel.postMessage({ 
            action: CONST_REQ_SIGN_IN 
        });
    } else {
        console.log("SIGN_IN");
    }
}, 500);
// $event
const signIn = () => {
    sessionStorage.setItem(CONST_USER_INFO, new Date());
    state();
    broadcastChannel.postMessage({ 
        action: CONST_RESP_SIGN_IN, 
        data: sessionStorage.getItem(CONST_USER_INFO),
    });
}
const signOut = () => {
    sessionStorage.removeItem(CONST_USER_INFO);
    state();
    broadcastChannel.postMessage({ 
        action: CONST_REQ_SIGN_OUT 
    });
}
const state = () => {
    var hidden = !!sessionStorage.getItem(CONST_USER_INFO);
    document.getElementById('btnSignIn').hidden = hidden;
    document.getElementById('btnSignOut').hidden = !hidden;
};