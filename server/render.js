import express from "express";
import path from "path";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";

import App from '../src/App.js';

import {DataProvider} from '../src/data';

function shellEnd(extractor) {
  return `
            ${extractor.getScriptTags()}
\        </body>
        </html>
    `;
}

const app = express();

app.use(express.static(path.resolve(__dirname, "../dist")));

app.get("/*", (req, res) => {
  const context = {};

  const statsFile = path.resolve("./dist/loadable-stats.json");
  const data = createServerData();

  const extractor = new ChunkExtractor({ statsFile, entrypoints: ["app"] });
  const reactDom =()=>{ 
            return(
              <div id="app">
                <DataProvider data={data}>
                  <StaticRouter location={req.url} context={context}> 
                      <App/>
                  </StaticRouter>
                </DataProvider>
              </div>
            )
      }

  const jsx =extractor.collectChunks(reactDom())
  const documentStream = renderToPipeableStream(jsx, {
    onShellReady(){
      res.write( `
      <html lang="en">
      <head>
          <meta charset="utf-8">
          <title>Loadable components SSR</title>
      </head>
      
      <body>`)
      documentStream.pipe(res)
    },
    onAllReady() {
        // Please move this to onShellReady when we start using Suspense so that Selective Hydration
        // works as it is intended and our app starts resolving according to Suspense boundaries

        //Also this entire block with shellStart, jsx and shellEnd is synchronous in nature and might have
        // performance implications
        const shell = shellEnd(extractor)
        res.end(shell)
    },
    })
})

function createServerData() {
    let done = false;
    let promise = null;
    return {
      read() {
        if (done) {
          return;
        }
        if (promise) {
          throw promise;
        }
        promise = new Promise(resolve => {
          setTimeout(() => {
            done = true;
            promise = null;
            resolve();
          }, 1000);
        });
        throw promise;
      },
    };
  }

const port = 3000;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on port ${port}`));
