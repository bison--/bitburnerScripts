/** @param {NS} ns */
export async function main(ns) {
    if (ns.args.length == 0) {
        ns.alert("needs servers as parameters");
        return;
    }
    
    while (true) {
        await weakenServers(ns);
        await ns.sleep(10);
    }
}

async function weakenServers(ns) {
    for (let i = 0; i < ns.args.length; i++) {
        let server = ns.args[i];
        await weakenServer(ns, server);
    }
}

async function weakenServer(ns, server) {
    let minSecurity = await ns.getServerMinSecurityLevel(server);
    let securityLevel = await ns.getServerSecurityLevel(server);
    
    let targetSecurityLevel = minSecurity * 1.05;  // Allow a margin above the minimum security level

    // no while to spread the weakening
    if (securityLevel > targetSecurityLevel) {
        await ns.print("Weaken: ", server, " | ", securityLevel, " | ", minSecurity);
        await ns.weaken(server);
    }
}
