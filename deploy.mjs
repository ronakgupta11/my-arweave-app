import Irys from "@irys/sdk";
const DEPLOY_FOLDER = "./dist";
const IRYS_NODE = "https://node2.irys.xyz";
const jwk = JSON.parse(Buffer.from(process.env.PERMAWEB_KEY, "base64").toString("utf-8"));
const irys = new Irys({ url: IRYS_NODE, token: "arweave", key: jwk });

const result = await irys.uploadFolder(DEPLOY_FOLDER, {
	indexFile: "index.html",
});

console.log("result",result)
console.log("Deployed Cookbook, please wait 20 - 30 minutes for ArNS to update!");