import{d as l,i as m,c as _,a as n,e as t,u as a,B as p,o as f,h}from"./index-55555b84.js";import{I,_ as B}from"./InternForm-30be2c31.js";import{D as S}from"./DeleteButton-9e38a7a9.js";import"./isValidUrl-53c0d572.js";const b={class:"intern-add-new"},w=n("span",null,"Edit intern",-1),E=n("h2",null,"Update the form below to edit intern.",-1),V=l({__name:"InternEdit",setup(k){const r=p(),i=m(),c=h(),e=parseInt(r.params.id,10),u=async(s,o,d)=>{await i.updateIntern(e,{first_name:s,last_name:o,avatar:d}),c.push("/")};return(s,o)=>(f(),_("section",b,[n("h1",null,[t(B),w,t(S,{id:a(e)},null,8,["id"])]),E,t(I,{id:a(e),onSubmit:u},null,8,["id"])]))}});export{V as default};
