import{n as i,N as s}from"./switch-theme-icon-button.astro_astro_type_script_index_0_lang.D25LzFxt.js";import"./theme-configuration.service.CHYTEQ9Q.js";const n=document.querySelector(".blog-preview"),a=document.querySelector(".blog-preview>.header"),r=document.querySelector(".article-title");window.addEventListener("scroll",e=>{const{top:o,height:c}=r.getBoundingClientRect();o+c-a.getBoundingClientRect().height<=0?n.classList.remove("at-top"):n.classList.add("at-top")});const l=document.querySelector(".back-to-all-post-page-button");l.addEventListener("click",()=>{i(s.getLinks().find(e=>e.label==="Posts").url)});const t=document.querySelector(".open-sidenav-button");t.addEventListener("click",()=>{n.classList.toggle("open-sidenav")?t.selected=!0:t.selected=!1});