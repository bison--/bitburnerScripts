//const SCRIPT = "onlygrab.js";
const SCRIPT = "grabber.js";
const SWARM_PREFIX = "sw-";

let swarmServerIndex = -1;
let targetServerIndex = -1;
let targetServers = [];
let _ns;

/** @param {NS} ns */
export async function main(ns) {
    if (ns.getScriptRam(SCRIPT) >= (ns.getServerMaxRam("home") - ns.getServerUsedRam("home"))) {
        ns.alert("NOT ENOUGH RAM!");
        return;
    } 

    swarmServerIndex = -1;
    targetServerIndex = -1;
    targetServers = [];
    
    _ns = ns;

    swarmServerIndex = -1;
    targetServerIndex = -1;

    if (ns.args.length == 0) {
        let fileContent = ns.read("servers.txt");
        fileContent.split(" ").forEach((element) => targetServers.push(element));
    }

    let countDeployed = 0;

    let swarmServerName = getNextSwarmServer();
    while (swarmServerName != "") {
        ns.print("Attempting Server: " + swarmServerName);
        let targetServerName = getNextTargetServer();
        let scriptPid = await ns.exec(
            "deploy_node.js",
            "home",
            1,
            swarmServerName,
            SCRIPT,
            targetServerName
        );
        
        if (scriptPid == 0) {
            await ns.alert(
                "Error deploying to '" + swarmServerName + 
                "'\nindex " + swarmServerIndex + 
                "\ntargetServerName: " + targetServerName +
                "\nscript: " + SCRIPT
            );
            //await ns.sleep(1000);
            return;
        } else {
            swarmServerName = getNextSwarmServer();
            countDeployed++;
        }
        
        await ns.sleep(100);
    }

    await ns.alert("Deployed " + countDeployed + " nodes.")
}

function getNextTargetServer() {
    targetServerIndex++;
    if (targetServerIndex >= targetServers.length) {
        targetServerIndex = 0;
    }

    targetServerIndex = getNextTargetServerWithRootIndex(targetServerIndex);
    _ns.print("getNextTargetServer: index: '" + targetServerIndex + "' name: " + targetServers[targetServerIndex]);
    return targetServers[targetServerIndex];
}

function getNextTargetServerWithRootIndex(startIndex) {
    for (let i = startIndex; i < targetServers.length; i++) {
        let possibleTargetServerName = targetServers[i];
        if (_ns.hasRootAccess(possibleTargetServerName)) {
            if (_ns.getHackingLevel(possibleTargetServerName) >= _ns.getServerRequiredHackingLevel(possibleTargetServerName)) {
                return i;
            }
        }
    }
    
    return 0;
}

function getSwarmServerName() {
    return SWARM_PREFIX + swarmServerIndex;
}

function getNextSwarmServer() {
    swarmServerIndex++;
    let serverName = getSwarmServerName();
    _ns.print("Checking Server: " + serverName);
    if (_ns.serverExists(serverName)) {
        return serverName;
    }

    return "";
}
