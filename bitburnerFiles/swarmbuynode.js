/** @param {NS} ns */
export async function main(ns) {
    let rams = 2;
    let serverName = "";

    if (ns.args.length == 1) {
        rams = ns.args[0];
        serverName = ns.purchaseServer("sw", rams);
        await ns.alert("Created server " + serverName);
    } else {
        serverName = ns.purchaseServer("sw", 1);
        await ns.alert("Created server " + serverName);

        while (ns.upgradePurchasedServer(serverName, rams)) {
            rams *= 2;
        }
    }

    ns.alert("Created server " + serverName + " with " + rams + " GB RAM");
}