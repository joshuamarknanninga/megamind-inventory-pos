import { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';

export default function Scanner({ onScan }:{ onScan:(value:string)=>void }){
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active,setActive] = useState(false);
  useEffect(()=>{
    const codeReader = new BrowserMultiFormatReader();
    if(active && videoRef.current){
      codeReader.decodeFromVideoDevice(undefined, videoRef.current, (result,err)=>{
        if(result){ onScan(result.getText()); }
      });
    }
    return ()=> codeReader.reset();
  },[active]);
  return (
    <div>
      <div className="flex gap-2 mb-2">
        <button onClick={()=>setActive(a=>!a)} className="px-3 py-1 bg-sky-600 text-white rounded">
          {active?'Stop':'Start'} Scanner
        </button>
      </div>
      <video ref={videoRef} className="w-full rounded border" />
    </div>
  );
}
