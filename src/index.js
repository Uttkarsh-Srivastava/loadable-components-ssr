/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



import React from "react";

import { BrowserRouter,Route } from "react-router-dom";
import { loadableReady } from "@loadable/component";
import App from './App';


import {hydrateRoot} from 'react-dom/client';

loadableReady(() => {
   hydrateRoot(
    document.getElementById("app"),
        <BrowserRouter>
        <Route path="/">
            <App />
        </Route>
        </BrowserRouter>
    );
})
