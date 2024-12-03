/** @param {NS} ns */
export async function main(ns) {
    let server = 'foodnstuff';
    while(true) {
        await ns.hack(server);
        await ns.grow(server);
        await ns.weaken(server);
        await ns.weaken(server);
    }
}