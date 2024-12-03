/** @param {NS} ns */
export async function main(ns) {
    if (ns.args.length == 0) {
        ns.alert("needs a server as parameters");
        return;
    }

    let server = ns.args[0];

    while(true) {
        await ns.hack(server);
    }
}