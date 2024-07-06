import{_ as f}from"./_plugin-vue_export-helper.DlAUqK2U.js";import{d as v,o as S,c as b,f as s,t as C,s as H,g as x,h as y,a as k,w as R,b as j,i as I,j as h,k as p,p as O,l as D}from"./runtime-core.esm-bundler.B-jiQ9_c.js";import{S as m,H as _,h as P,M as L,T as w,a as M}from"./theme.service.XJS50_Xh.js";const B=v({__name:"HctSlider",props:{min:{},max:{},defaultValue:{},title:{}},emits:["change"],setup(a,{expose:r,emit:t}){r();const e=a,o=t,d={props:e,emits:o,handleInput:i=>{o("change",{[e.title]:i.target.value})}};return Object.defineProperty(d,"__isScriptSetup",{enumerable:!1,value:!0}),d}}),A={class:"slider-box"},V={class:"md-typescale-title-medium"},N=["value","min","max"];function T(a,r,t,e,o,n){return S(),b("label",A,[s("p",V,C(e.props.title),1),s("md-slider",{value:e.props.defaultValue,min:e.props.min,max:e.props.max,labeled:"",onInput:e.handleInput},null,40,N)])}const F=f(B,[["render",T],["__scopeId","data-v-2de46d92"]]);function E(a){let r=H(),t=a.subscribe(e=>{r.value=e});return x()&&y(t),r}const q=v({__name:"HctSliderPreview",props:{hct:{},isDark:{type:Boolean},contrastLevel:{},block:{},disabled:{type:Boolean,default:!1},dep:{default:null}},setup(a,{expose:r}){r();const t=a;let e=new m(_.from(t.hct.hue,t.hct.chroma,t.hct.tone),t.isDark,t.contrastLevel);const o=k(null),n=()=>{const c=d();let l="";for(let u=0;u<=3;u++)e=c(u,3),l+=` ${P(L.primary.getArgb(e))} ${100/3*u}%,`;o.value?.setAttribute("style",`background:linear-gradient(to right, ${l.slice(0,-1)});`)},d=()=>t.block===360?(c,l)=>new m(_.from(360/l*c,t.hct.chroma,t.hct.tone),t.isDark,t.contrastLevel):t.block===150?(c,l)=>new m(_.from(t.hct.hue,150/l*c,t.hct.tone),t.isDark,t.contrastLevel):(c,l)=>new m(_.from(t.hct.hue,t.hct.chroma,100/l*c),t.isDark,t.contrastLevel);R(()=>t.dep,()=>{t.disabled||n()}),j(()=>{n()});const i={props:t,get scheme(){return e},set scheme(c){e=c},previewRef:o,updatePreview:n,getNewSchemeFunction:d};return Object.defineProperty(i,"__isScriptSetup",{enumerable:!1,value:!0}),i}}),z={ref:"previewRef",class:"preview"};function G(a,r,t,e,o,n){return S(),b("div",null,[I(a.$slots,"default",{},void 0),s("div",z,null,512)])}const J=f(q,[["render",G],["__scopeId","data-v-301f5c19"]]),K=v({__name:"HctPicker",setup(a,{expose:r}){r();const t=k(null),e=()=>{o()},o=()=>{t.value?.open?t.value.close():t.value?.show()},n=E(w.getInstance().getAtom()),i={menuRef:t,handleClicked:e,toggleMenu:o,themeState:n,handleSliderChanged:c=>{w.getInstance().setSourceColorRawObject(()=>c)},HctSlider:F,get MdMenu(){return M},HctSliderPreview:J};return Object.defineProperty(i,"__isScriptSetup",{enumerable:!1,value:!0}),i}}),g=a=>(O("data-v-31511906"),a=a(),D(),a),Q={class:"hct-picker",id:"hct-picker-window-wrapper"},U=g(()=>s("md-icon",null,"palette",-1)),W=[U],X={id:"hct-picker-window",anchor:"hct-picker-window-toggle-button",ref:"menuRef"},Y=g(()=>s("div",{class:"current-color-box primary"},null,-1)),Z={class:"hct-picker-sliders"};function $(a,r,t,e,o,n){return S(),b("span",Q,[s("md-icon-button",{id:"hct-picker-window-toggle-button",onClick:e.handleClicked,"aria-labelledby":"#hct-picker-window-wrapper","aria-label":"Open HCT theme picker"},W),s("md-menu",X,[Y,s("div",Z,[h(e.HctSliderPreview,{disabled:!0,block:360,hct:{hue:0,chroma:75,tone:50},"is-dark":e.themeState.isDark,"contrast-level":e.themeState.contrastLevel},{default:p(()=>[h(e.HctSlider,{onChange:e.handleSliderChanged,"default-value":e.themeState.sourceColorHctRawObject.hue,title:"hue",min:0,max:360},null,8,["default-value"])]),_:1},8,["is-dark","contrast-level"]),h(e.HctSliderPreview,{dep:e.themeState.sourceColorHctRawObject.hue,block:150,hct:{...e.themeState.sourceColorHctRawObject,tone:50},"is-dark":e.themeState.isDark,"contrast-level":e.themeState.contrastLevel},{default:p(()=>[h(e.HctSlider,{onChange:e.handleSliderChanged,"default-value":e.themeState.sourceColorHctRawObject.chroma,title:"chroma",min:0,max:150},null,8,["default-value"])]),_:1},8,["dep","hct","is-dark","contrast-level"]),h(e.HctSliderPreview,{dep:e.themeState.sourceColorHctRawObject.hue,block:100,hct:{...e.themeState.sourceColorHctRawObject,chroma:75},"is-dark":e.themeState.isDark,"contrast-level":e.themeState.contrastLevel},{default:p(()=>[h(e.HctSlider,{onChange:e.handleSliderChanged,"default-value":e.themeState.sourceColorHctRawObject.tone,title:"tone",min:0,max:100},null,8,["default-value"])]),_:1},8,["dep","hct","is-dark","contrast-level"])])],512)])}const re=f(K,[["render",$],["__scopeId","data-v-31511906"]]);export{re as default};