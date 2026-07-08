(()=>{var a={};a.id=3887,a.ids=[3887],a.modules={261:a=>{"use strict";a.exports=require("next/dist/shared/lib/router/utils/app-paths")},10846:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},25351:(a,b,c)=>{"use strict";a.exports=c(44870)},28185:(a,b,c)=>{"use strict";c.r(b),c.d(b,{handler:()=>C,patchFetch:()=>B,routeModule:()=>x,serverHooks:()=>A,workAsyncStorage:()=>y,workUnitAsyncStorage:()=>z});var d={};c.r(d),c.d(d,{GET:()=>w,dynamic:()=>v});var e=c(25351),f=c(68704),g=c(16063),h=c(75719),i=c(53281),j=c(261),k=c(32163),l=c(28013),m=c(55327),n=c(85308),o=c(63306),p=c(45216),q=c(38722),r=c(56327),s=c(86439),t=c(30013),u=c(35824);let v="force-static";function w(){return new Response(u._,{headers:{"content-type":"text/css; charset=utf-8","cache-control":"public, max-age=300, s-maxage=3600","access-control-allow-origin":"*","access-control-allow-methods":"GET, OPTIONS"}})}let x=new e.AppRouteRouteModule({definition:{kind:f.RouteKind.APP_ROUTE,page:"/theme.css/route",pathname:"/theme.css",filename:"route",bundlePath:"app/theme.css/route"},distDir:".next",relativeProjectDir:"",resolvedPagePath:"/home/runner/workspace/artifacts/beui/app/theme.css/route.ts",nextConfigOutput:"",userland:d}),{workAsyncStorage:y,workUnitAsyncStorage:z,serverHooks:A}=x;function B(){return(0,g.patchFetch)({workAsyncStorage:y,workUnitAsyncStorage:z})}async function C(a,b,c){var d;let e="/theme.css/route";"/index"===e&&(e="/");let g=await x.prepare(a,b,{srcPage:e,multiZoneDraftMode:!1});if(!g)return b.statusCode=400,b.end("Bad Request"),null==c.waitUntil||c.waitUntil.call(c,Promise.resolve()),null;let{buildId:u,params:v,nextConfig:w,isDraftMode:y,prerenderManifest:z,routerServerContext:A,isOnDemandRevalidate:B,revalidateOnlyGenerated:C,resolvedPathname:D}=g,E=(0,j.normalizeAppPath)(e),F=!!(z.dynamicRoutes[E]||z.routes[D]);if(F&&!y){let a=!!z.routes[D],b=z.dynamicRoutes[E];if(b&&!1===b.fallback&&!a)throw new s.NoFallbackError}let G=null;!F||x.isDev||y||(G="/index"===(G=D)?"/":G);let H=!0===x.isDev||!F,I=F&&!H,J=a.method||"GET",K=(0,i.getTracer)(),L=K.getActiveScopeSpan(),M={params:v,prerenderManifest:z,renderOpts:{experimental:{cacheComponents:!!w.experimental.cacheComponents,authInterrupts:!!w.experimental.authInterrupts},supportsDynamicResponse:H,incrementalCache:(0,h.getRequestMeta)(a,"incrementalCache"),cacheLifeProfiles:null==(d=w.experimental)?void 0:d.cacheLife,isRevalidate:I,waitUntil:c.waitUntil,onClose:a=>{b.on("close",a)},onAfterTaskError:void 0,onInstrumentationRequestError:(b,c,d)=>x.onRequestError(a,b,d,A)},sharedContext:{buildId:u}},N=new k.NodeNextRequest(a),O=new k.NodeNextResponse(b),P=l.NextRequestAdapter.fromNodeNextRequest(N,(0,l.signalFromNodeResponse)(b));try{let d=async c=>x.handle(P,M).finally(()=>{if(!c)return;c.setAttributes({"http.status_code":b.statusCode,"next.rsc":!1});let d=K.getRootSpanAttributes();if(!d)return;if(d.get("next.span_type")!==m.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${d.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let e=d.get("next.route");if(e){let a=`${J} ${e}`;c.setAttributes({"next.route":e,"http.route":e,"next.span_name":a}),c.updateName(a)}else c.updateName(`${J} ${a.url}`)}),g=async g=>{var i,j;let k=async({previousCacheEntry:f})=>{try{if(!(0,h.getRequestMeta)(a,"minimalMode")&&B&&C&&!f)return b.statusCode=404,b.setHeader("x-nextjs-cache","REVALIDATED"),b.end("This page could not be found"),null;let e=await d(g);a.fetchMetrics=M.renderOpts.fetchMetrics;let i=M.renderOpts.pendingWaitUntil;i&&c.waitUntil&&(c.waitUntil(i),i=void 0);let j=M.renderOpts.collectedTags;if(!F)return await (0,o.I)(N,O,e,M.renderOpts.pendingWaitUntil),null;{let a=await e.blob(),b=(0,p.toNodeOutgoingHttpHeaders)(e.headers);j&&(b[r.NEXT_CACHE_TAGS_HEADER]=j),!b["content-type"]&&a.type&&(b["content-type"]=a.type);let c=void 0!==M.renderOpts.collectedRevalidate&&!(M.renderOpts.collectedRevalidate>=r.INFINITE_CACHE)&&M.renderOpts.collectedRevalidate,d=void 0===M.renderOpts.collectedExpire||M.renderOpts.collectedExpire>=r.INFINITE_CACHE?void 0:M.renderOpts.collectedExpire;return{value:{kind:t.CachedRouteKind.APP_ROUTE,status:e.status,body:Buffer.from(await a.arrayBuffer()),headers:b},cacheControl:{revalidate:c,expire:d}}}}catch(b){throw(null==f?void 0:f.isStale)&&await x.onRequestError(a,b,{routerKind:"App Router",routePath:e,routeType:"route",revalidateReason:(0,n.c)({isRevalidate:I,isOnDemandRevalidate:B})},A),b}},l=await x.handleResponse({req:a,nextConfig:w,cacheKey:G,routeKind:f.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:z,isRoutePPREnabled:!1,isOnDemandRevalidate:B,revalidateOnlyGenerated:C,responseGenerator:k,waitUntil:c.waitUntil});if(!F)return null;if((null==l||null==(i=l.value)?void 0:i.kind)!==t.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==l||null==(j=l.value)?void 0:j.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});(0,h.getRequestMeta)(a,"minimalMode")||b.setHeader("x-nextjs-cache",B?"REVALIDATED":l.isMiss?"MISS":l.isStale?"STALE":"HIT"),y&&b.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let m=(0,p.fromNodeOutgoingHttpHeaders)(l.value.headers);return(0,h.getRequestMeta)(a,"minimalMode")&&F||m.delete(r.NEXT_CACHE_TAGS_HEADER),!l.cacheControl||b.getHeader("Cache-Control")||m.get("Cache-Control")||m.set("Cache-Control",(0,q.getCacheControlHeader)(l.cacheControl)),await (0,o.I)(N,O,new Response(l.value.body,{headers:m,status:l.value.status||200})),null};L?await g(L):await K.withPropagatedContext(a.headers,()=>K.trace(m.BaseServerSpan.handleRequest,{spanName:`${J} ${a.url}`,kind:i.SpanKind.SERVER,attributes:{"http.method":J,"http.target":a.url}},g))}catch(b){if(b instanceof s.NoFallbackError||await x.onRequestError(a,b,{routerKind:"App Router",routePath:E,routeType:"route",revalidateReason:(0,n.c)({isRevalidate:I,isOnDemandRevalidate:B})}),F)throw b;return await (0,o.I)(N,O,new Response(null,{status:500})),null}}},29294:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-async-storage.external.js")},35824:(a,b,c)=>{"use strict";c.d(b,{_:()=>d});let d=`@custom-variant dark (&:where(.dark, .dark *));

:root {
    /* Base palette */
    --background: oklch(99% 0 0);
    --foreground: oklch(15% 0 0);
    --card: oklch(97% 0 0);
    --muted-foreground: oklch(50% 0 0);
    --border: oklch(15% 0 0 / 0.06);
    /* beUI extensions */
    --border-strong: oklch(15% 0 0 / 0.12);
    --accent-fg: oklch(15% 0 0);
    --neon: oklch(80% 0.22 145);
    --violet: oklch(68% 0.22 295);
    --danger: oklch(62% 0.22 25);
    --success: oklch(70% 0.18 155);
    --warning: oklch(78% 0.18 75);
    --glass-bg: oklch(99% 0 0 / 0.55);
    --glass-border: oklch(15% 0 0 / 0.08);
    --glass-strong-bg: rgb(255 255 255 / 0.7);
    --glass-thin-bg: rgb(255 255 255 / 0.45);
    /* shadcn semantic tokens */
    --card-foreground: var(--foreground);
    --popover: var(--card);
    --popover-foreground: var(--foreground);
    --primary: var(--foreground);
    --primary-foreground: var(--background);
    --secondary: var(--card);
    --secondary-foreground: var(--foreground);
    --muted: var(--card);
    --accent: oklch(72% 0.18 195);
    --accent-foreground: var(--accent-fg);
    --destructive: var(--danger);
    --input: var(--border);
    --ring: var(--border-strong);
}

.dark {
    --background: #151515;
    --foreground: oklch(96% 0 0);
    --card: #1c1c1c;
    --muted-foreground: oklch(62% 0 0);
    --border: rgb(255 255 255 / 0.05);
    --border-strong: rgb(255 255 255 / 0.1);
    --accent: oklch(80% 0.18 195);
    --accent-fg: #151515;
    --glass-bg: rgb(28 28 28 / 0.55);
    --glass-border: rgb(255 255 255 / 0.08);
    --glass-strong-bg: rgb(28 28 28 / 0.6);
    --glass-thin-bg: rgb(21 21 21 / 0.45);
}

@theme inline {
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
    --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
    --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);

    --color-border: var(--border);
    --color-border-strong: var(--border-strong);
    --color-neon: var(--neon);
    --color-violet: var(--violet);
    --color-success: var(--success);
    --color-warning: var(--warning);
    --color-background: var(--background);
    --color-foreground: var(--foreground);
    --color-card: var(--card);
    --color-card-foreground: var(--card-foreground);
    --color-popover: var(--popover);
    --color-popover-foreground: var(--popover-foreground);
    --color-primary: var(--primary);
    --color-primary-foreground: var(--primary-foreground);
    --color-secondary: var(--secondary);
    --color-secondary-foreground: var(--secondary-foreground);
    --color-muted: var(--muted);
    --color-muted-foreground: var(--muted-foreground);
    --color-accent: var(--accent);
    --color-accent-foreground: var(--accent-foreground);
    --color-destructive: var(--destructive);
    --color-input: var(--input);
    --color-ring: var(--ring);
}

@theme {
    --animate-marquee: marquee 30s linear infinite;
    --animate-marquee-vertical: marquee-vertical 30s linear infinite;
    --animate-shimmer: shimmer 2.5s linear infinite;

    @keyframes marquee {
        from { transform: translateX(0); }
        to { transform: translateX(calc(-100% - var(--gap, 1rem))); }
    }
    @keyframes marquee-vertical {
        from { transform: translateY(0); }
        to { transform: translateY(calc(-100% - var(--gap, 1rem))); }
    }
    @keyframes shimmer {
        from { background-position: 200% 0; }
        to { background-position: -200% 0; }
    }
}

@layer utilities {
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { scrollbar-width: none; }

    .mask-radial-fade {
        mask-image: radial-gradient(ellipse at center, black 40%, transparent 75%);
    }
    .mask-b-fade {
        mask-image: linear-gradient(to bottom, black 60%, transparent);
    }

    .glass {
        background: var(--glass-bg);
        backdrop-filter: blur(20px) saturate(160%);
        border: 1px solid var(--glass-border);
        box-shadow:
            0 1px 0 0 rgb(255 255 255 / 0.06) inset,
            0 24px 60px -24px rgb(0 0 0 / 0.45);
    }
    .glass-strong {
        background: var(--glass-strong-bg);
        backdrop-filter: blur(16px);
    }
    .glass-thin {
        background: var(--glass-thin-bg);
        backdrop-filter: blur(12px);
        border: 1px solid var(--glass-border);
    }
}
`},39698:()=>{},44870:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},63033:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},63306:(a,b,c)=>{"use strict";Object.defineProperty(b,"I",{enumerable:!0,get:function(){return g}});let d=c(15562),e=c(64735),f=c(45216);async function g(a,b,c,g){if((0,d.isNodeNextResponse)(b)){var h;b.statusCode=c.status,b.statusMessage=c.statusText;let d=["set-cookie","www-authenticate","proxy-authenticate","vary"];null==(h=c.headers)||h.forEach((a,c)=>{if("x-middleware-set-cookie"!==c.toLowerCase())if("set-cookie"===c.toLowerCase())for(let d of(0,f.splitCookiesString)(a))b.appendHeader(c,d);else{let e=void 0!==b.getHeader(c);(d.includes(c.toLowerCase())||!e)&&b.appendHeader(c,a)}});let{originalResponse:i}=b;c.body&&"HEAD"!==a.method?await (0,e.pipeToNodeResponse)(c.body,i,g):i.end()}}},76650:()=>{},86439:a=>{"use strict";a.exports=require("next/dist/shared/lib/no-fallback-error.external")}};var b=require("../../webpack-runtime.js");b.C(a);var c=b.X(0,[7603],()=>b(b.s=28185));module.exports=c})();