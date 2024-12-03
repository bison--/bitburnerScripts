let output = "";

/** @param {NS} ns */
export async function main(ns) {
    output = "";

    let allNodes = ns.getPurchasedServers();
    for (let i = 0; i < allNodes.length; i++) {
        let nodeName = allNodes[i];
        append("### ", nodeName, "###");
        append("RAM: ", ns.getServerMaxRam(nodeName));
    }
    append("");
    append("Total nodes: ", allNodes.length);
    ns.alert(output);
}

function append(...txt) {
    for (const item of txt) {
        output += item + " ";
    }
    output += "\n";
}
