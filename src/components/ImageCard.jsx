
'use client';

import { Card } from 'flowbite-react';

export default function ImageCard(props) {
    const imageLoader = (src) => {
 
        return `https://ar-io.dev/${src}?w=200&q=75`;
      };
  return (  
    <Card 
      className="max-w-sm"
      imgAlt="image"
      imgSrc={imageLoader(props.id)}
    >
     <p className=" text-gray-800 font-semibold dark:text-gray-400">
        Asset id
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {`${props.id.slice(0,8)}....${props.id.slice(-8)}`}
      </p>
    </Card>
  );
}
