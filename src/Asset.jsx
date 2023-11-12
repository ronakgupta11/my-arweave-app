import React from 'react'
import {  useLoaderData } from "react-router-dom";
import { getAsset } from "./lib/api";
import { FooterDivider } from 'flowbite-react/lib/esm/components/Footer/FooterDivider';
import { Card } from 'flowbite-react';
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
          height
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
    const type = asset.data.type.slice(0,5)
const videoUrl = (src)=> `https://ar-io.dev/${src}`

    const imageLoader = (src) => {
 
      return `https://ar-io.dev/${src}?w=200&q=75`;
    };
    // console.log(asset)
  return (
    <div className='flex-1 items-center justify-center m-auto w-full p-8'>
      <div className='m-auto space-y-2'>
      <p className='font-bold text-xl'>Asset Id</p>
      <p className='text-lg font-semibold text-gray'>{asset.id}</p>

      </div>
      <FooterDivider/>
      <div className=' flex space-x-2 justify-between'>
        
      <div className='w-[50%] p-8 '>
      <p className='font-semibold'> Asset Data</p>
        <Card>
          
          {type === "image"? <img src={imageLoader(asset.id)}/>:<video controls autoPlay>
          <source src = {videoUrl(asset.id)}/>
          </video>}
       
         
        </Card>

      </div>
      <div className='w-[50%] p-8'>
        <p className='font-semibold'>Details</p>
{/* {console.log(assetData)} */}
<div className=' space-y-3'>
  <div>
    <p className='font-semibold '>
    Title
    </p>
    <p className=''>
    {asset.title}
    </p>
  </div>
  <div>
    <p className='font-semibold '>
    Description
    </p>
    <p className=''>
    {asset.description}
    </p>
  </div>
  <div>
    <p className='font-semibold '>
    Creator id
    </p>
    <p className=''>
    {asset.creatorId}
    </p>
  </div>
  <div>
    <p className='font-semibold '>
    TimeStamp
    </p>
    <p className=''>
    {asset.timestamp}
    </p>
  </div>
  <div>
    <p className='font-semibold '>
    Block Height
    </p>
    <p className=''>
    {asset.height}
    </p>
  </div>
  <div>
    <p className='font-semibold '>
    Content Type
    </p>
    <p className=''>
    {asset.data.type}
    </p>
  </div>
  <div>
    <p className='font-semibold '>
    Content Size
    </p>
    <p className=''>
    {asset.data.size}
    </p>
  </div>
  <div>
    <p className='font-semibold '>
    Tags
    </p>
    <div>
      {asset.tags.map(t=>(<p>{t.name}: {t.value}</p>))}
    </div>
  </div>
  <div>
    <p className='font-semibold '>
      License
    </p>
    <p className=''>
    {asset.license[0]}
    </p>
  </div>
  <div>
    <p className='font-semibold '>
      Fee
    </p>
    <p className=''>
    {asset.license[1]}
    </p>
  </div>
</div>
      
     
      </div>
      </div>
      </div>
  )
}

export default Asset