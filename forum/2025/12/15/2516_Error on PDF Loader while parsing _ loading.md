# Error on PDF Loader while parsing & loading

**Topic ID:** 2516
**Created:** 2025-12-15 15:12:40
**URL:** https://forum.langchain.com/t/2516

**Tags:** js-help

---

## Post #1 by @Ghost9841
*Posted on 2025-12-15 15:12:40*

Hi LangChain team 

I’m running into an issue with `PDFLoader` from `@langchain/community` when loading local PDFs.

[#p-4905-environment-1]()Environment


Runtime: **Node 20.x** (also reproduced with **Bun**)



Module system: **ESM**



OS: Linux



LangChain packages:




```
`    "@langchain/community": "^1.1.0",
    "@langchain/core": "^1.1.5",
    "@langchain/openai": "^1.2.0",
    "@langchain/qdrant": "^1.0.1",
    "@langchain/textsplitters": "^1.0.1",
    "@types/express": "^5.0.6",
    "@types/pdfjs-dist": "^2.10.378",
    "bullmq": "^5.66.0",
    "cors": "^2.8.5",
    "express": "^5.2.1",
    "multer": "^2.0.2",
    "pdf-parse": "^2.4.5",
    "pdfjs-dist": "^5.4.449"
`
```



Code


```
`import { Worker } from 'bullmq';
import { OpenAIEmbeddings } from "@langchain/openai";  
import { QdrantVectorStore } from "@langchain/qdrant";
import { Document } from "@langchain/core/documents";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "@langchain/textsplitters";

const worker = new Worker(
    'file-upload-queue',
    async job => {
        console.log("JOB: ", job.data);
        const data = JSON.parse(job.data);
        //Load the PDF
        
        console.log("Loading PDF from path: ", data.path);
        const loader = new PDFLoader(data.path);
        console.log(loader);
        
        const docs = await loader.load();
        console.log(docs);
        
        // const textSplitter = new CharacterTextSplitter({
        //     chunkSize: 300,
        //     chunkOverlap: 0,
        // })
        // const texts = await textSplitter.splitDocuments(docs);
        // console.log(texts);
        
}, 
{ 
    concurrency: 100,
    connection: {
        host: 'localhost',
        port: 6379,
    }
 }
);


`
```

Error


```
`Error [ERR_PACKAGE_PATH_NOT_EXPORTED]:
Package subpath './lib/pdf.js/v1.10.100/build/pdf.js'
is not defined by "exports" in
node_modules/pdf-parse/package.json

at @langchain/community/dist/document_loaders/fs/pdf.js

`
```


The error seems to come from a **deep import inside `pdf-parse`** that is no longer exposed via `"exports"`.
This fails consistently in **Node ESM** and **Bun**.
Downgrading `pdf-parse` this also didnt work neither in ^1.1.1 neither in ^2.4.5
Using `pdfjs-dist` also didnt work

---

## Post #2 by @piyushyadav0191
*Posted on 2025-12-17 05:35:05*

did you found the solution? I am facing same issues

---

## Post #3 by @Ghost9841
*Posted on 2025-12-17 14:12:57*

This post was flagged by the community and is temporarily hidden.

---
