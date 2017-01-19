var _ = require("underscore");
var Promise = require("bluebird");
var hostile = require("hostile");
var dns = require("dns");
var fs = require('fs');

/**
 * Host object format : 
 * {
 *     domain : "google.com",
 *     ip     : "127.0.0.1"
 * }
 */


/**
 * Cleans hosts file entires in the given list
 * List should be a list of domain names
 */
function removeHostsFromList(domainListToRemove) {
    var hosts = getAllHosts();

    var hostsToRemove = _.filter(hosts, (host) => {
        return _.contains(domainListToRemove, host.domain);
    });

    removeHosts(hostsToRemove);
}

/**
 * Removes list of host objects from hosts file
 */
function removeHosts(hostsListToRemove) {
    _.each(hostsListToRemove, (host) => {
        hostile.remove(host.ip, host.domain);
    });
}

/**
 * Gets all the domains and ips in the hosts file
 * Returns an array of host objects
 */
function getAllHosts(callback) {
    var hosts =  hostile.get(false);

    return hosts.map((item) => {
        return {
            domain: item[1],
            ip: item[0]
        };
    });
}

function setDomainsFromList(domainsToSet, ipAddress) {
    _.each(domainsToSet, (domain)=> {
        hostile.set(ipAddress, domain);
    });
}

/**
 * Returns promise which returns "ip address" as first param
 */
function getIp(domain) {
    return Promise.promisify(dns.lookup)(domain);
}

function writeHostToFile(filePath, hostName) {
    fs.writeFileSync(filePath, "set MACHINE=" + hostName);
}

module.exports = {
    removeHostsFromList,
    setDomainsFromList,
    getIp,
    writeHostToFile
};