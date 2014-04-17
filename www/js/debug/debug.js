var debug = {
    enabled: true,
    weinre_enabled: true,
    weinre_server_id: "nfc",
    weinre_server_url: "http://157.145.184.4:8080/",
    weinre_script_url: "/js/debug/weinre-target-script.js",
    jsconsole_enabled: false,
    jsconsole_id: "VCPA"
};
debug.tests = [
    function step1() {
        // Perform a test user tag scan
        app.eventBus.trigger("onNfcPrismUser:login", debug.sampleNfcEvent, 0);
    },
    function step2() {
        // scan the first location
        // the proper way to call this is: app.round.type.allLocations.get(99906).set("dt_check", Date.now());
        app.round.type.allLocations.models[0].set("dt_check", Date.now());
    },
    function step3() {
        // scan the third location
        app.round.type.allLocations.models[2].set("dt_check", Date.now());
    }
];
debug.sampleNfcEvent = {
    tag: {
        isWritable: true,
        id: [4, -87, 16, -14, 69, 43, -128],
        techTypes: [
            "android.nfc.tech.MifareUltralight",
            "android.nfc.tech.NfcA",
            "android.nfc.tech.Ndef"],
        type: "NFC Forum Type 2",
        canMakeReadOnly: true,
        maxSize: 137,
        ndefMessage: [{
            id: [],
            type: "application/prismuser",
            payload: '{"tag":1,"login":"simonej","otp":"1234567890"}',
            tnf: 2
        }]
    }
};

if (debug) {
    if (debug.weinre_enabled && !modjewel) {
        window.WeinreServerId = debug.weinre_server_id; // <-- your unique identifier on the server below
        window.WeinreServerURL = debug.weinre_server_url; // <-- weinre server to use
        (function (e) {
            e.setAttribute("src", debug.weinre_script_url); document.getElementsByTagName("body")[0].appendChild(e);
        })(document.createElement("script"));
    }
    if (debug.jsconsole_enabled) {
        (function (e) {
            e.setAttribute("src", "http://jsconsole.com/remote.js?" + debug.jsconsole_id); document.getElementsByTagName("body")[0].appendChild(e);
        })(document.createElement("script"));
    }
}