
'use client';

import { Card } from 'flowbite-react';

export default function VideoCard(props) {
    const videoUrl = (src)=> `https://ar-io.dev/${src}`
  return (
    <Card
      className="max-w-sm h-sm"
    
    >
     <video height={"200px"}>
        <source src = {videoUrl(props.id)}/>
     </video>
     <p className=" text-gray-800 font-semibold dark:text-gray-400">
        Asset id
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {`${props.id.slice(0,8)}....${props.id.slice(-8)}`}
      </p>
    </Card>
  );
}
