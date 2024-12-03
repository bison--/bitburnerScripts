/** @param {NS} ns */
export async function main(ns) {
    if (ns.args.length == 0) {
        ns.alert("params: nodeRamUpgrade");
        return;
    }

    let nodeRamUpgrade = ns.args[0];
    
    ns.getPurchasedServers().forEach((nodeName) => {
        ns.upgradePurchasedServer(nodeName, nodeRamUpgrade);
    });
}