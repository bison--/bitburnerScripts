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
        await grabServers(ns);
        await ns.sleep(1);
    }
}

async function grabServers(ns) {
    for (let i = startIndex; i < ns.args.length; i++) {
        let server = ns.args[i];

        if (!canHackServer(ns, server))
        { continue; }

        try {
            await ns.hack(server);
        } catch (error) {
            ns.print(error);
        }
    }

    startIndex = 0;
}

function canHackServer(ns, server) {
    if (ns.getHackingLevel(server) >= ns.getServerRequiredHackingLevel(server)) {
        return true;
    }

    return false;
}
