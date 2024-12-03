/** @param {NS} ns */
export async function main(ns) {
    if (ns.args.length == 0) {
        ns.args.push(await ns.getHostname());
    }

    let server = ns.args[0];

    while(true) {
        await ns.grow(server);
        await ns.weaken(server);
        await ns.hack(server);
    }
}