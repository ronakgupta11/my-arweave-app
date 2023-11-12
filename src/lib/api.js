
import { queryAllTransactionsGQL } from "arweavekit/graphql";
import Arweave from 'arweave';
import Account from 'arweave-account';
export const arweave = Arweave.init({});
export const account = new Account({
  cacheIsActivated: true,
  cacheSize: 100,
  cacheTime: 3600000  // 3600000ms => 1 hour cache duration
});
// function to fetch posts create from defined contract source
export async function getAssetData(query) {
  const response = await queryAllTransactionsGQL(query, {
    gateway: "arweave.net",
    filters: {},
  });

//   console.log("response",response)
  const findTagValue = (tagName, tags) => {
    return tags.find((tag) => tag.name === tagName)?.value;
  };

  const findTopicValues = (tags) => {
    return tags.filter((tag) => tag.name.includes(tag.value)).map((tag) => tag.value);
  };

  const determineLicense = (tags) => {
    let licenses = [];

    if (findTagValue("Access", tags) === "Restricted") {
      licenses.push(findTagValue("Access", tags) ?? "");
      licenses.push(findTagValue("Access-Fee", tags) ?? "");
    } else if (findTagValue("Derivation", tags) === "Allowed-with-license-fee") {
      licenses.push(findTagValue("Derivation", tags) ?? "");
      licenses.push(findTagValue("Derivation-Fee", tags) ?? "");
    } else if (findTagValue("Commercial-Use", tags) === "Allowed") {
      licenses.push(findTagValue("Commercial-Use", tags) ?? "");
      licenses.push(findTagValue("Commercial-Fee", tags) ?? "");
    } else {
      licenses.push("Default-Public-Use");
      licenses.push("None");
    }

    return licenses;
  };

  return {
    
    
    cursor:response[9].cursor,
    data:

    
    response.map((edges) => {
    const tags = edges.node.tags;
    const height = edges.node.block ? edges.node.block.height : -1;
  const timestamp = edges.node?.block?.timestamp ? parseInt(edges.node.block.timestamp, 10) * 1000 : -1;
    return {
      node:edges.node,
      id: edges.node.id,
      title: findTagValue("Title", tags) || "",
      description: findTagValue("Description", tags) || "",
      license: determineLicense(tags),
      topics: findTopicValues(tags),
      creatorId: findTagValue("Creator", tags) || edges.node.owner.address,
      creatorName: findTagValue("Creator-Name", tags) || "",
      account: account.get(edges.node.owner.address),
      timestamp:timestamp,
      height:height,
      tags:tags,
      data:edges.node.data

    };
  })};
}



export const getAsset = async(query)=>{
  const response = await queryAllTransactionsGQL(query, {
    gateway: "arweave.net",
    filters: {},
  });
return response
}
