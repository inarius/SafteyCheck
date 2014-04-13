var debug = {
    enabled: true,
    weinre_enabled: true,
    weinre_server_id: "nfc",
    weinre_server_url: "http://169.231.51.222:8080/",
    weinre_script_url: "/js/debug/weinre-target-script.js",
    jsconsole_enabled: false,
    jsconsole_id: "VCPA"
    };
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
            payload: '{"tag":1,"login":"simonej","otp":"DGUuUj+R1loUQbLRt/OPyE52lYMM"}',
            tnf: 2
        }]
    }
};

if (debug) {
    if (debug.weinre_enabled) {
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