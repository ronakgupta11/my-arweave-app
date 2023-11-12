import { useEffect, useState } from 'react'
import React from 'react';
import { Label, Select,Pagination ,TextInput, Button} from 'flowbite-react';
import VideoCard from './components/VideoCard';
import ImageCard from './components/ImageCard';
import { Link } from 'react-router-dom';
import { getAssetData } from "./lib/api";

export default function App() {

const [assets, setAssets] = React.useState([]);
const [nextId,setNextId] = useState(undefined)
const [queryId,setQueryId] = useState(`["image/png","image/jpeg","image/avif","image/gif","image/svg+xml"]`)
const [currentPage, setCurrentPage] = useState(1);
const [searchId, setSearchId] = useState("");


const onPageChange = (page) => {
  
  setCurrentPage(page)};
const query = `
query{
  transactions(tags: [
  { name: "Content-type", values: ${queryId} },
  ] ,first: 12 ,${currentPage!==1 ? `after:"${nextId}"`:""}) {
    
edges {
  cursor

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

`;

const handleOptionChange = (event) => {
  setQueryId(event.target.value);
  setCurrentPage(1)
  };

useEffect(() => {
  async function fetchData() {
    const data = await getAssetData(query);
    console.log(data)
    setAssets(data.data);
    setNextId(data.cursor)
  }
  fetchData();
}, [queryId,currentPage]);
  return (
<>
<div className="flex flex-col ">
  <section className='w-full p-2'>
    <div className='flex w-full items-center justify-between'>

    <h1 className='text-3xl font-extrabold leading-tight m-2 tracking-tighter md:text-4xl'>
      ArNet
    </h1>
    <div>
        <div className='flex items-center space-x-4'>

        <TextInput value={searchId} onChange={(e)=>setSearchId(e.target.value)} placeholder="txId"id="base" type="text" sizing="md" />
        <Link to={`/assets/${searchId}`}>
        <Button>Search</Button>
        </Link>
        </div>
      </div>
    </div>

    <div className='border-b w-full'></div>
  </section>
        <section className="container grid items-center gap-6 py-8 md:py-10 w-full m-auto">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              View Assets 🖼️ on Arweave
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">Filter on Asset Content Type.</p>
            <div>
              <div className='flex items-center space-x-24'>

<div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="Filter" value="Select Asset Type" />
      </div>
      <Select id="Filter" value={queryId} onChange={handleOptionChange}  >
        <option value={`["image/png","image/jpeg","image/avif","image/gif","image/svg+xml"]`}>Image</option>
        <option value={`["video/mp4","video/x-msvideo","video/3gpp","video/webm","video/ogg","video/mpeg"]`}>Video</option>

      </Select>
    </div>


    </div>

    
    </div>
    </div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-6">
      {assets.map((asset) => {
        const type = queryId.slice(2,7)
        return(
        <Link key={asset.id} to={`/assets/${asset.id}`}>
        {type==="image"?<ImageCard {...asset}    />:< VideoCard {...asset} />}

        </Link>
      )})}
    </div>
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination currentPage={currentPage} totalPages={100} onPageChange={onPageChange} showIcons />
    </div>
    </section>
    </div>
  
</>
  )
}








