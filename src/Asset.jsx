import React from 'react'
import {  useLoaderData } from "react-router-dom";
import { getAsset } from "./lib/api";

export async function loader({ params }) {

const query = `
    query{
      transactions(ids:["${params.assetId}"]) {
    edges {
      node {
        id
        owner {
          address
        }
        tags {
          name
          value
        }
        data {
          size
          type
      }
        block {
          timestamp
        }
      }
    }
    }
    }
    `
  const asset = await getAsset(query);
  return { asset };
}


function Asset() {
    const {asset } = useLoaderData();
    console.log(asset[0])
  return (
    <div>Asset</div>

  )
}

export default Asset