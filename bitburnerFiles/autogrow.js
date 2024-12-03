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
        await growServers(ns);
        await ns.sleep(10);
    }
}

async function growServers(ns) {
    for (let i = startIndex; i < ns.args.length; i++) {
        let server = ns.args[i];

        if (!canHackServer(ns, server))
        { continue; }

        try {
            await growServer(ns, server);
        } catch (error) {
            ns.print(error);
        }
    }

    startIndex = 0;
}

async function growServer(ns, server) {
    let maxMoney = await ns.getServerMaxMoney(server);
    let currentMoney = await ns.getServerMoneyAvailable(server);

    // Allow for a margin
    let targetMoney = maxMoney * 0.90;

    // no while, just add up one at a time to spread the money
    if (currentMoney < targetMoney) {
        await ns.print("Grow: ", server, " | ", currentMoney, " | " , maxMoney);
        await ns.grow(server);
    }
}

function canHackServer(ns, server) {
    if (ns.getHackingLevel(server) >= ns.getServerRequiredHackingLevel(server)) {
        return true;
    }

    return false;
}
