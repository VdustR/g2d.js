"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[261],{7522:function(e,n,t){t.d(n,{Zo:function(){return s},kt:function(){return m}});var r=t(9901);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function u(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var i=r.createContext({}),c=function(e){var n=r.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},s=function(e){var n=c(e.components);return r.createElement(i.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,l=e.originalType,i=e.parentName,s=u(e,["components","mdxType","originalType","parentName"]),d=c(t),m=a,f=d["".concat(i,".").concat(m)]||d[m]||p[m]||l;return t?r.createElement(f,o(o({ref:n},s),{},{components:t})):r.createElement(f,o({ref:n},s))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var l=t.length,o=new Array(l);o[0]=d;var u={};for(var i in n)hasOwnProperty.call(n,i)&&(u[i]=n[i]);u.originalType=e,u.mdxType="string"==typeof e?e:a,o[1]=u;for(var c=2;c<l;c++)o[c]=t[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},3087:function(e,n,t){t.r(n),t.d(n,{assets:function(){return y},contentTitle:function(){return b},default:function(){return w},frontMatter:function(){return v},metadata:function(){return g},toc:function(){return h}});var r=t(2994),a=t(3988),l=t(9901),o=t(7522),u=t(872),i=t(6377),c=t(5789),s="tabItem_WzpJ";function p(e){var n,t,a,o=e.lazy,u=e.block,p=e.defaultValue,d=e.values,m=e.groupId,f=e.className,v=l.Children.map(e.children,(function(e){if((0,l.isValidElement)(e)&&void 0!==e.props.value)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),b=null!=d?d:v.map((function(e){var n=e.props;return{value:n.value,label:n.label,attributes:n.attributes}})),g=(0,i.lx)(b,(function(e,n){return e.value===n.value}));if(g.length>0)throw new Error('Docusaurus error: Duplicate values "'+g.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.');var y=null===p?p:null!=(n=null!=p?p:null==(t=v.find((function(e){return e.props.default})))?void 0:t.props.value)?n:null==(a=v[0])?void 0:a.props.value;if(null!==y&&!b.some((function(e){return e.value===y})))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+y+'" but none of its children has the corresponding value. Available values are: '+b.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");var h=(0,i.UB)(),k=h.tabGroupChoices,w=h.setTabGroupChoices,O=(0,l.useState)(y),E=O[0],N=O[1],T=[],j=(0,i.o5)().blockElementScrollPositionUntilNextRender;if(null!=m){var x=k[m];null!=x&&x!==E&&b.some((function(e){return e.value===x}))&&N(x)}var I=function(e){var n=e.currentTarget,t=T.indexOf(n),r=b[t].value;r!==E&&(j(n),N(r),null!=m&&w(m,r))},P=function(e){var n,t=null;switch(e.key){case"ArrowRight":var r=T.indexOf(e.currentTarget)+1;t=T[r]||T[0];break;case"ArrowLeft":var a=T.indexOf(e.currentTarget)-1;t=T[a]||T[T.length-1]}null==(n=t)||n.focus()};return l.createElement("div",{className:"tabs-container"},l.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,c.Z)("tabs",{"tabs--block":u},f)},b.map((function(e){var n=e.value,t=e.label,a=e.attributes;return l.createElement("li",(0,r.Z)({role:"tab",tabIndex:E===n?0:-1,"aria-selected":E===n,key:n,ref:function(e){return T.push(e)},onKeyDown:P,onFocus:I,onClick:I},a,{className:(0,c.Z)("tabs__item",s,null==a?void 0:a.className,{"tabs__item--active":E===n})}),null!=t?t:n)}))),o?(0,l.cloneElement)(v.filter((function(e){return e.props.value===E}))[0],{className:"margin-vert--md"}):l.createElement("div",{className:"margin-vert--md"},v.map((function(e,n){return(0,l.cloneElement)(e,{key:n,hidden:e.props.value!==E})}))))}function d(e){var n=(0,u.Z)();return l.createElement(p,(0,r.Z)({key:String(n)},e))}function m(e){var n=e.children,t=e.hidden,r=e.className;return l.createElement("div",{role:"tabpanel",hidden:t,className:r},n)}var f=["components"],v={},b="@g2d/core",g={unversionedId:"node/lib",id:"node/lib",title:"@g2d/core",description:"Installation",source:"@site/docs/node/lib.md",sourceDirName:"node",slug:"/node/lib",permalink:"/g2d.js/node/lib",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"@g2d/cli",permalink:"/g2d.js/node/cli"},next:{title:"g2d Online",permalink:"/g2d.js/online"}},y={},h=[{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2}],k={toc:h};function w(e){var n=e.components,t=(0,a.Z)(e,f);return(0,o.kt)("wrapper",(0,r.Z)({},k,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"g2dcore"},"@g2d/core"),(0,o.kt)("h2",{id:"installation"},"Installation"),(0,o.kt)(d,{groupId:"npm2yarn",mdxType:"Tabs"},(0,o.kt)(m,{value:"npm",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"npm install @g2d/core detect-newline@4\n"))),(0,o.kt)(m,{value:"yarn",label:"Yarn",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add @g2d/core detect-newline@4\n")))),(0,o.kt)("h2",{id:"usage"},"Usage"),(0,o.kt)("p",null,"Since ",(0,o.kt)("inlineCode",{parentName:"p"},"detect-newline@4")," ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/sindresorhus/detect-newline/commit/5539419ede22892c50a898ff416845224bf6282e"},"move to ESM"),", you can only use ",(0,o.kt)("inlineCode",{parentName:"p"},"g2d/core")," in ESM:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import g2d from "@g2d/core";\n\nconst dockerignore = g2d(gitignore);\n')),(0,o.kt)("p",null,"Using with Node environment:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="./package.json"',title:'"./package.json"'},'{\n  "type": "module"\n}\n')))}w.isMDXComponent=!0}}]);