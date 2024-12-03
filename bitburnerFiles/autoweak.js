function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let startIndex = 0;

/** @param {NS} ns */
export async function main(ns) {
    if (ns.args.length == 0) {
        let fileContent = ns.read("servers.txt");
        fileContent.split(" ").forEach((element) => ns.args.push(element));
    }
    
    startIndex = getRandomInt(ns.args.length);

    while (true) {
        await weakenServers(ns);
        await ns.sleep(10);
    }
}

async function weakenServers(ns) {
    for (let i = startIndex; i < ns.args.length; i++) {
        let server = ns.args[i];

        if (!canHackServer(ns, server))
        { continue; }

        try {
            await weakenServer(ns, server);
        } catch (error) {
            ns.print(error);
        }
    }

    startIndex = 0;
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

function canHackServer(ns, server) {
    if (ns.getHackingLevel(server) >= ns.getServerRequiredHackingLevel(server)) {
        return true;
    }

    return false;
}
