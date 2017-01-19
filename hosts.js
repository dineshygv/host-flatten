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

var machineFilePath = "D:\\SOFTWARE\\machine.bat";

var domain = process.argv[2];

if(!domain) {
    console.error("Enter machine name as first arg");
    return;
}

tools.removeHostsFromList(domains);

tools.getIp(domain)
    .then((ip) => {
        console.log("Using " + domain + " : " + ip);
        tools.setDomainsFromList(domains, ip);
        tools.writeHostToFile(machineFilePath, domain);
    })
    .catch((err) => {
        console.error(err);
    });
