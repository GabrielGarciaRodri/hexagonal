import React, { useState } from 'react';
import IllustrationSvg from "../storage/img/Illustration.svg"
import "./style/index.css"

function Index() {
  return (
    <main>
        <section class="section__imagen">
            <div class="section__container">
                <img src={IllustrationSvg}/>
            </div>
            <div class="section__text">
                <h1>Explore the app</h1>
                <small>Now your finances are in one place and always under control</small>
            </div>
        </section>
        <section class="section__button">
            <a href="./login">Sign In</a>
            <a href="./createAccount">Create account</a>
        </section>
    </main>
  );
}

export default Index;