/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from "react";
import loadable from 'react-loadable-visibility';
import Spinner from './Spinner';
import Layout from './Layout';
import NavBar from './NavBar';

const Comments = loadable(() => import('./Comments'),{ssr:false});
const Sidebar = loadable(() => import('./Sidebar'),{ssr:true,fallback:<Spinner />});
const Post = loadable(() => import('./Post' ),{ssr:true,fallback:<Spinner />});

export default function App() {
  return (
    <Layout>
      <NavBar />
      <aside className="sidebar">
         
          <Sidebar />
          
      </aside>
      <article className="post">
         
          <Post />
          
         
          <Post />
          
         
          <Post />
          
         
          <Post />
          
         
          <Post />
          
         
          <Post />
          
         
          <Post />
          
         
          <Post />
          
         
          <Post />
          <Post />
          
         
          <Post />
          
         
          <Post />
          
         
          <Post />
          <Post />
          
         
          <Post />
          
         
          <Post />
          
         
          <Post />
          <Post />
          
         
          <Post />
          
         
          <Post />
          
         
          <Post />
          <Post />
          
         
          <Post />
          
         
          <Post />
          
         
          <Post />
          <Post />
          
         
          <Post />
          
         
          <Post />
          
         
          <Post />
          
        <section className="comments">
          <h2>Comments</h2>
           
            <Comments />
            <Comments />
            
           
            <Comments />
            
           
            <Comments />
            
           
            <Comments />
            
           
            <Comments />
            
        </section>
        <h2>Thanks for reading!</h2>
      </article>
       
          
            
    </Layout>
  );
}
