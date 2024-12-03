/** @param {NS} ns */
export function main(ns) {
    readUserInput(ns);
    weakenServers(ns);
}

function readUserInput(ns) {
    if (ns.args.length == 0) {
        let target = ns.prompt("Enter Target:", {type: "text"});
        if (target == "")
        { return; }

        ns.args.push(target);
    }
}

function weakenServers(ns) {
    for (let i = 0; i < ns.args.length; i++) {
        let server = ns.args[i];
        weakenServer(ns, server);
    }
}

async function weakenServer(ns, server) {
    //let analyzer = new AnalyserNode();
    let minSecurity = await ns.getServerMinSecurityLevel(server);
    let securityLevel = await ns.getServerSecurityLevel(server);
    while (securityLevel > minSecurity) {
        await ns.print(securityLevel, minSecurity);
        await ns.weaken(server);
    }
}
