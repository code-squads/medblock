import { create } from "ipfs-http-client";

let ipfs;
try {
  ipfs = create({
    url: "https://ipfs.infura.io:5001/api/v0",
  });
} catch (error) {
  console.error("IPFS error ", error);
  ipfs = undefined;
}

export async function uploadFilesToIPFS(fileList) {
  if (!ipfs) {
    return console.error('IPFS service can\'t be conencted :(');
  }
  let files = fileList.map ? fileList : Array.from(fileList);
  const results = await Promise.all(files.map(ipfs.add));
  console.log("IPFS upload results", results);
  return results;
}


// // Using web3.storage
// import { Web3Storage } from 'web3.storage'

// const IPFS_TOKEN = process.env.REACT_APP_IPFS_TOKEN || null;

// const ipfsStorage = new Web3Storage({ IPFS_TOKEN });

// export async function uploadFilesToIPFS(files) {
//   if (!IPFS_TOKEN) {
//     return console.error('A token is needed. You can create one on https://web3.storage')
//   }

//   console.log(`Uploading ${files.length} files`)
//   const cid = await ipfsStorage.put(files)
//   console.log('Content added with CID:', cid)
//   return cid;
// }