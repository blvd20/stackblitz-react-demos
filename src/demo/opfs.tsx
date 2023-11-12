import React from 'react';
import { useEffectOnce } from 'react-use';

export function OpfsDemo() {
  useEffectOnce(() => {
    console.log('mount');
    tryNewApi();
  });

  return <div>Opfs</div>;
}

async function tryNewApi() {
  console.log('-'.repeat(50));
  const storageQuota = await navigator.storage.estimate();
  console.log(storageQuota);

  const rootDir = await navigator.storage.getDirectory();

  const miscDir = await rootDir.getDirectoryHandle('misc', { create: true });

  const readmeFile = await rootDir.getFileHandle('readme.md', { create: true });

  readWrite(readmeFile);

  // list fiels
  for await (let [name, handle] of rootDir) {
    console.log(name);
  }
  console.log('*'.repeat(50));
}

async function readWrite(fileHandler: FileSystemHandle) {}
