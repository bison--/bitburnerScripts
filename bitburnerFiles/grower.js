/** @param {NS} ns */
export async function main(ns) {
    if (ns.args.length == 0) {
        ns.alert("needs servers as parameters");
        return;
    }
    
    while (true) {
        await growServers(ns);
        await ns.sleep(10);
    }
}

async function growServers(ns) {
    for (let i = 0; i < ns.args.length; i++) {
        let server = ns.args[i];
        await growServer(ns, server);
    }
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
