/** @param {NS} ns */
export async function main(ns) {
    if (ns.args.length == 0) {
        ns.alert("params: server script.js param");
        return;
    }

    let serverName = ns.args[0];
    let scriptName = ns.args[1];
    let scriptParam = ns.args[2];

    await ns.killall(serverName);
    await ns.sleep(100);
    await ns.scp(scriptName, serverName);

    let needsRam = ns.getScriptRam(scriptName);
    let serverAvailableRam = ns.getServerMaxRam(serverName) - ns.getServerUsedRam(serverName);
    let executes = Math.trunc(serverAvailableRam / needsRam);
    
    if (executes == 0) {
        executes = 1;
    } 
    
    await ns.exec(scriptName, serverName, executes, scriptParam);
}
