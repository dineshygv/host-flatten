var tools = require("./tools");

var domains = [
    "apps-devdev.redmond.corp.microsoft.com",
    "apps-devdev",
    "boxbot.redmond.corp.microsoft.com",
    "clientcentermt.redmond.corp.microsoft.com",
    "appsdevdev.redmond.corp.microsoft.com",
    "appsdevdev",
    "ccui.devdev.bingads.microsoft.com",
    "clientcenterdev.redmond.corp.microsoft.com",
    "advertiseruibox.redmond.corp.microsoft.com"
];

tools.removeHostsFromList(domains);
var domain = process.argv[2];
tools.getIp(domain)
    .then((ip) => {
        console.log("Using " + domain + " : " + ip);
        tools.setDomainsFromList(domains, ip);
    })
    .catch((err) => {
        console.error(err);
    });
