//const COPY_SCRIPT = "onlygrab.js";
const COPY_SCRIPT = "grabber.js";

/** @param {NS} ns */
export async function main(ns) {
    let fileContent = ns.read("servers.txt");
    let servers = fileContent.split(" ");

    let countSuccess = 0;
    let countError = 0;

    //servers.forEach((serverName) => await hackServer(serverName));    
    for (let i = 0; i < servers.length; i++) {
        try {
            await hackServer(ns, servers[i]);
            ns.print("OK: ", servers[i]);
            countSuccess++;
        } catch (error) {
            countError++;
            ns.print("Error: ", servers[i]);
            await ns.print(error);
        } finally {

        }
    }

    ns.alert("### Stats ###\nsuccess: " + countSuccess + "\nerrors:  " + countError);
}

async function openPorts(ns, serverName) {
    try {
        await ns.brutessh(serverName);
    } catch (error) {
        ns.print("no brutessh");
        return;
    }

    try {
        await ns.ftpcrack(serverName);
    } catch (error) {
        ns.print("no ftpcrack");
        return;
    }

    try {
        await ns.relaysmtp(serverName);
    } catch (error) {
        ns.print("no relaysmtp");
        return;
    }

    try {
        await ns.httpworm(serverName);
    } catch (error) {
        ns.print("no relaysmtp");
        return;
    }
}

async function hackServer(ns, serverName) {
    await openPorts(ns, serverName);

    await ns.nuke(serverName);
    
    await ns.killall(serverName)

    await ns.scp(COPY_SCRIPT, serverName);

    let needsRam = ns.getScriptRam(COPY_SCRIPT);
    let serverAvailableRam = ns.getServerMaxRam(serverName) - ns.getServerUsedRam(serverName);
    let executes = Math.trunc(serverAvailableRam / needsRam);
    
    await ns.exec(COPY_SCRIPT, serverName, executes, serverName);
    //await ns.print(serverName + " executes grabber: " + executes);
    /*for (let i = 0; i < executes; i++) {
        await ns.exec("grabber.js", serverName, 1, serverName);
    }*/
}
