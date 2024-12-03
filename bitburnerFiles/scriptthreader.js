/** @param {NS} ns */
export async function main(ns) {
    if (ns.args.length < 3) {
        ns.alert("params: server script.js threads params[optional] \n h shorthand for home");
        return;
    }

    let serverName = ns.args[0];
    if (serverName == "h") {
        serverName = "home";
    }

    let scriptName = ns.args[1];
    let scriptThreads = ns.args[2];
    let scriptParams = [];

    for (let i = 3; i < ns.args.length; i++) {
        scriptParams.push(ns.args[i]);
    }

    let returnCode = await ns.exec(scriptName, serverName, scriptThreads, ...scriptParams);
    
    if (returnCode == 0) {
        ns.alert("COULD NOT RUN");
    }
}
