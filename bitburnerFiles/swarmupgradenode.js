/** @param {NS} ns */
export async function main(ns) {
    if (ns.args.length == 0) {
        ns.alert("params: nodeName nodeRamUpgrade");
        return;
    }

    let nodeName = ns.args[0];

    if (ns.args.length == 1) {
        let infoText = "NodeInfo:\n"
        infoText += "RAM: " + ns.getServerMaxRam(nodeName) + "\n";
        ns.alert(infoText);
        return;
    }

    let nodeRamUpgrade = ns.args[1];

    await ns.upgradePurchasedServer(nodeName, nodeRamUpgrade);

}