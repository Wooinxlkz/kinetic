exports.id=562,exports.ids=[562],exports.modules={269:(a,b,c)=>{"use strict";let d;c.d(b,{Te:()=>v});var e=c(22495),f=c(47574);function g(a,b,c){let d,e=c.initialDeps??[],f=!0;function g(){let g=a();return g.length!==e.length||g.some((a,b)=>e[b]!==a)?(e=g,d=b(...g),(null==c?void 0:c.onChange)&&!(f&&c.skipInitialOnChange)&&c.onChange(d),f=!1,d):d}return g.updateDeps=a=>{e=a},g}function h(a,b){if(void 0!==a)return a;throw Error(`Unexpected undefined${b?`: ${b}`:""}`)}let i=()=>{if(void 0!==d)return d;if("undefined"==typeof navigator)return d=!1;if(/iP(hone|od|ad)/.test(navigator.userAgent))return d=!0;let a=navigator.maxTouchPoints;return d="MacIntel"===navigator.platform&&void 0!==a&&a>0},j=a=>{let{offsetWidth:b,offsetHeight:c}=a;return{width:b,height:c}},k=a=>a,l=a=>{let b=Math.max(a.startIndex-a.overscan,0),c=Math.min(a.endIndex+a.overscan,a.count-1)-b+1,d=Array(c);for(let a=0;a<c;a++)d[a]=b+a;return d},m=(a,b)=>{let c=a.scrollElement;if(!c)return;let d=a.targetWindow;if(!d)return;let e=a=>{let{width:c,height:d}=a;b({width:Math.round(c),height:Math.round(d)})};if(e(j(c)),!d.ResizeObserver)return()=>{};let f=new d.ResizeObserver(b=>{let d=()=>{let a=b[0];if(null==a?void 0:a.borderBoxSize){let b=a.borderBoxSize[0];if(b)return void e({width:b.inlineSize,height:b.blockSize})}e(j(c))};a.options.useAnimationFrameWithResizeObserver?requestAnimationFrame(d):d()});return f.observe(c,{box:"border-box"}),()=>{f.unobserve(c)}},n={passive:!0},o="undefined"==typeof window||"onscrollend"in window,p=(a,b)=>((a,b,c)=>{let d=a.scrollElement;if(!d)return;let e=a.targetWindow;if(!e)return;let f=a.options.useScrollendEvent&&o,g=0,h=f?null:((a,b,c)=>{let d;return function(...e){a.clearTimeout(d),d=a.setTimeout(()=>b.apply(this,e),c)}})(e,()=>b(g,!1),a.options.isScrollingResetDelay),i=a=>()=>{g=c(d),null==h||h(),b(g,a)},j=i(!0),k=i(!1);return d.addEventListener("scroll",j,n),f&&d.addEventListener("scrollend",k,n),()=>{d.removeEventListener("scroll",j),f&&d.removeEventListener("scrollend",k)}})(a,b,b=>{let{horizontal:c,isRtl:d}=a.options;return c?b.scrollLeft*(d&&-1||1):b.scrollTop}),q=(a,b,c)=>{if(c.options.useCachedMeasurements){let b=c.indexFromElement(a),d=c.options.getItemKey(b);return c.itemSizeCache.get(d)??c.options.estimateSize(b)}if(null==b?void 0:b.borderBoxSize){let a=b.borderBoxSize[0];if(a)return Math.round(a[c.options.horizontal?"inlineSize":"blockSize"])}if(!b){let b=c.indexFromElement(a),d=c.options.getItemKey(b),e=c.itemSizeCache.get(d);if(void 0!==e)return e}return a[c.options.horizontal?"offsetWidth":"offsetHeight"]},r=(a,{adjustments:b=0,behavior:c},d)=>{var e,f;null==(f=null==(e=d.scrollElement)?void 0:e.scrollTo)||f.call(e,{[d.options.horizontal?"left":"top"]:a+b,behavior:c})};class s{constructor(a){this.unsubs=[],this.scrollElement=null,this.targetWindow=null,this.isScrolling=!1,this.scrollState=null,this.measurementsCache=[],this._flatMeasurements=null,this.itemSizeCache=new Map,this.itemSizeCacheVersion=0,this.laneAssignments=new Map,this.pendingMin=null,this.prevLanes=void 0,this.lanesChangedFlag=!1,this.lanesSettling=!1,this.pendingScrollAnchor=null,this.scrollRect=null,this.scrollOffset=null,this.scrollDirection=null,this.scrollAdjustments=0,this._iosDeferredAdjustment=0,this._iosTouching=!1,this._iosJustTouchEnded=!1,this._iosTouchEndTimerId=null,this._intendedScrollOffset=null,this.elementsCache=new Map,this.now=()=>{var a,b,c;return(null==(c=null==(b=null==(a=this.targetWindow)?void 0:a.performance)?void 0:b.now)?void 0:c.call(b))??Date.now()},this.observer=(()=>{let a=null,b=()=>a||(this.targetWindow&&this.targetWindow.ResizeObserver?a=new this.targetWindow.ResizeObserver(a=>{a.forEach(a=>{let b=()=>{let b=a.target,c=this.indexFromElement(b);if(!b.isConnected){for(let[a,c]of(this.observer.unobserve(b),this.elementsCache))if(c===b){this.elementsCache.delete(a);break}return}this.shouldMeasureDuringScroll(c)&&this.resizeItem(c,this.options.measureElement(b,a,this))};this.options.useAnimationFrameWithResizeObserver?requestAnimationFrame(b):b()})}):null);return{disconnect:()=>{var c;null==(c=b())||c.disconnect(),a=null},observe:a=>{var c;return null==(c=b())?void 0:c.observe(a,{box:"border-box"})},unobserve:a=>{var c;return null==(c=b())?void 0:c.unobserve(a)}}})(),this.range=null,this.setOptions=a=>{var b,c;let d={debug:!1,initialOffset:0,overscan:1,paddingStart:0,paddingEnd:0,scrollPaddingStart:0,scrollPaddingEnd:0,horizontal:!1,getItemKey:k,rangeExtractor:l,onChange:()=>{},measureElement:q,initialRect:{width:0,height:0},scrollMargin:0,gap:0,indexAttribute:"data-index",initialMeasurementsCache:[],lanes:1,anchorTo:"start",followOnAppend:!1,scrollEndThreshold:1,isScrollingResetDelay:150,enabled:!0,isRtl:!1,useScrollendEvent:!1,useAnimationFrameWithResizeObserver:!1,laneAssignmentMode:"estimate",useCachedMeasurements:!1};for(let b in a){let c=a[b];void 0!==c&&(d[b]=c)}let e=this.options,f=null,g=null,h=!1;if(void 0!==e&&e.enabled&&d.enabled&&"end"===d.anchorTo&&null!==this.scrollElement){let a=e.count,i=d.count,j=this.getMeasurements(),k=a>0?(null==(b=j[0])?void 0:b.key)??e.getItemKey(0):null,l=a>0?(null==(c=j[a-1])?void 0:c.key)??e.getItemKey(a-1):null;if(i!==a||a>0&&i>0&&(d.getItemKey(0)!==k||d.getItemKey(i-1)!==l)){h=!0;let b=a>0?this.getVirtualItemForOffset(this.getScrollOffset())??j[0]:null;b&&(f=[b.key,this.getScrollOffset()-b.start]);let c=!0===d.followOnAppend?"auto":d.followOnAppend||null;c&&i>a&&this.isAtEnd(e.scrollEndThreshold)&&(0===a||d.getItemKey(i-1)!==l)&&(g=c)}}this.options=d,h&&(this.pendingMin=0,this.itemSizeCacheVersion++);let i=!1,j=0;if(f&&null!==this.scrollOffset){let[a,b]=f,c=this.getMeasurements(),{count:d,getItemKey:e}=this.options,g=0;for(;g<d&&e(g)!==a;)g++;if(g<d){let a=c[g];if(a){let c=a.start+b;c!==this.scrollOffset&&(j=c-this.scrollOffset,this.scrollOffset=c,i=!0)}}}(i||g)&&(this.pendingScrollAnchor=[i?f[0]:null,i?f[1]:0,g,j])},this.notify=a=>{var b,c;null==(c=(b=this.options).onChange)||c.call(b,this,a)},this.maybeNotify=g(()=>(this.calculateRange(),[this.isScrolling,this.range?this.range.startIndex:null,this.range?this.range.endIndex:null]),a=>{this.notify(a)},{key:!1,debug:()=>this.options.debug,initialDeps:[this.isScrolling,this.range?this.range.startIndex:null,this.range?this.range.endIndex:null]}),this.cleanup=()=>{this.unsubs.filter(Boolean).forEach(a=>a()),this.unsubs=[],this.observer.disconnect(),null!=this.rafId&&this.targetWindow&&(this.targetWindow.cancelAnimationFrame(this.rafId),this.rafId=null),this.scrollState=null,this.scrollElement=null,this.targetWindow=null},this._didMount=()=>()=>{this.cleanup()},this._willUpdate=()=>{var a;let b=this.options.enabled?this.options.getScrollElement():null;if(this.scrollElement!==b){if(this.cleanup(),!b)return void this.maybeNotify();if(this.scrollElement=b,this.scrollElement&&"ownerDocument"in this.scrollElement?this.targetWindow=this.scrollElement.ownerDocument.defaultView:this.targetWindow=(null==(a=this.scrollElement)?void 0:a.window)??null,this.elementsCache.forEach(a=>{this.observer.observe(a)}),this.unsubs.push(this.options.observeElementRect(this,a=>{this.scrollRect=a,this.maybeNotify()})),this.unsubs.push(this.options.observeElementOffset(this,(a,b)=>{if(b&&null===this._intendedScrollOffset&&a===this.scrollOffset)return;null!==this._intendedScrollOffset&&1.5>Math.abs(a-this._intendedScrollOffset)&&(a=this._intendedScrollOffset),this._intendedScrollOffset=null,this.scrollAdjustments=0;let c=this.getScrollOffset();this.scrollDirection=b?c===a?this.scrollDirection:c<a?"forward":"backward":null,this.scrollOffset=a,this.isScrolling=b,this._flushIosDeferredIfReady(),this.scrollState&&this.scheduleScrollReconcile(),this.maybeNotify()})),"addEventListener"in this.scrollElement){let a=this.scrollElement,b=()=>{this._iosTouching=!0,this._iosJustTouchEnded=!1,null!==this._iosTouchEndTimerId&&null!=this.targetWindow&&(this.targetWindow.clearTimeout(this._iosTouchEndTimerId),this._iosTouchEndTimerId=null)},c=()=>{this._iosTouching=!1,i()&&null!=this.targetWindow&&(this._iosJustTouchEnded=!0,this._iosTouchEndTimerId=this.targetWindow.setTimeout(()=>{this._iosJustTouchEnded=!1,this._iosTouchEndTimerId=null,this._flushIosDeferredIfReady()},150))};a.addEventListener("touchstart",b,n),a.addEventListener("touchend",c,n),this.unsubs.push(()=>{a.removeEventListener("touchstart",b),a.removeEventListener("touchend",c),null!==this._iosTouchEndTimerId&&null!=this.targetWindow&&(this.targetWindow.clearTimeout(this._iosTouchEndTimerId),this._iosTouchEndTimerId=null)})}this._scrollToOffset(this.getScrollOffset(),{adjustments:void 0,behavior:void 0})}let c=this.pendingScrollAnchor;if(this.pendingScrollAnchor=null,c&&this.scrollElement&&this.options.enabled){let[a,b,d,e]=c;null===a||d||(i()&&(this.isScrolling||this._iosTouching||this._iosJustTouchEnded)?0!==e&&(this._iosDeferredAdjustment+=e):this._scrollToOffset(this.getScrollOffset(),{adjustments:void 0,behavior:void 0})),d&&this.scrollToEnd({behavior:d})}},this._flushIosDeferredIfReady=()=>{if(0===this._iosDeferredAdjustment||this.isScrolling||this._iosTouching||this._iosJustTouchEnded)return;let a=this.getScrollOffset(),b=this.getMaxScrollOffset();if(a<0||a>b)return;let c=this._iosDeferredAdjustment;this._iosDeferredAdjustment=0,this._scrollToOffset(a,{adjustments:this.scrollAdjustments+=c,behavior:void 0})},this.rafId=null,this.getSize=()=>this.options.enabled?(this.scrollRect=this.scrollRect??this.options.initialRect,this.scrollRect[this.options.horizontal?"width":"height"]):(this.scrollRect=null,0),this.getScrollOffset=()=>this.options.enabled?(this.scrollOffset=this.scrollOffset??("function"==typeof this.options.initialOffset?this.options.initialOffset():this.options.initialOffset),this.scrollOffset):(this.scrollOffset=null,0),this.getFurthestMeasurement=(a,b)=>{let c=new Map,d=new Map;for(let e=b-1;e>=0;e--){let b=a[e];if(c.has(b.lane))continue;let f=d.get(b.lane);if(null==f||b.end>f.end?d.set(b.lane,b):b.end<f.end&&c.set(b.lane,!0),c.size===this.options.lanes)break}return d.size===this.options.lanes?Array.from(d.values()).sort((a,b)=>a.end===b.end?a.index-b.index:a.end-b.end)[0]:void 0},this.getMeasurementOptions=g(()=>[this.options.count,this.options.paddingStart,this.options.scrollMargin,this.options.getItemKey,this.options.enabled,this.options.lanes,this.options.laneAssignmentMode],(a,b,c,d,e,f,g)=>(void 0!==this.prevLanes&&this.prevLanes!==f&&(this.lanesChangedFlag=!0),this.prevLanes=f,this.pendingMin=null,{count:a,paddingStart:b,scrollMargin:c,getItemKey:d,enabled:e,lanes:f,laneAssignmentMode:g}),{key:!1}),this.getMeasurements=g(()=>[this.getMeasurementOptions(),this.itemSizeCacheVersion],({count:a,paddingStart:b,scrollMargin:c,getItemKey:d,enabled:e,lanes:f,laneAssignmentMode:g},h)=>{let i=this.itemSizeCache;if(!e)return this.measurementsCache=[],this.itemSizeCache.clear(),this.laneAssignments.clear(),[];if(this.laneAssignments.size>a)for(let b of this.laneAssignments.keys())b>=a&&this.laneAssignments.delete(b);this.lanesChangedFlag&&(this.lanesChangedFlag=!1,this.lanesSettling=!0,this.measurementsCache=[],this.itemSizeCache.clear(),this.laneAssignments.clear(),this.pendingMin=null),0!==this.measurementsCache.length||this.lanesSettling||(this.measurementsCache=this.options.initialMeasurementsCache,this.measurementsCache.forEach(a=>{this.itemSizeCache.set(a.key,a.size)}));let j=this.lanesSettling?0:this.pendingMin??0;if(this.pendingMin=null,this.lanesSettling&&this.measurementsCache.length===a&&(this.lanesSettling=!1),1===f){let e,f=this.options.gap,g=2*a,h=this._flatMeasurements;if(!h||h.length<g){let a=new Float64Array(g);h&&j>0&&a.set(h.subarray(0,2*j)),h=a,this._flatMeasurements=h}if(0===j)e=b+c;else{let a=j-1;e=h[2*a]+h[2*a+1]+f}for(let b=j;b<a;b++){let a=d(b),c=i.get(a),g="number"==typeof c?c:this.options.estimateSize(b);h[2*b]=e,h[2*b+1]=g,e+=g+f}let k=function(a,b,c){return new Proxy(Array(a),{get(d,e,f){if("string"==typeof e){let f=e.charCodeAt(0);if(f>=48&&f<=57){let f=+e;if(Number.isInteger(f)&&f>=0&&f<a){let a=d[f];if(!a){let e=b[2*f];a=d[f]={index:f,key:c(f),start:e,size:b[2*f+1],end:e+b[2*f+1],lane:0}}return a}}if("length"===e)return a}return Reflect.get(d,e,f)}})}(a,h,d);return this.measurementsCache=k,k}let k=this.measurementsCache.slice(0,j),l=Array(f).fill(void 0);for(let a=0;a<j;a++){let b=k[a];b&&(l[b.lane]=a)}for(let e=j;e<a;e++){let a,f,h=d(e),j=this.laneAssignments.get(e),m="estimate"===g||i.has(h);if(void 0!==j&&this.options.lanes>1){let d=l[a=j],e=void 0!==d?k[d]:void 0;f=e?e.end+this.options.gap:b+c}else{let d=1===this.options.lanes?k[e-1]:this.getFurthestMeasurement(k,e);f=d?d.end+this.options.gap:b+c,a=d?d.lane:e%this.options.lanes,this.options.lanes>1&&m&&this.laneAssignments.set(e,a)}let n=i.get(h),o="number"==typeof n?n:this.options.estimateSize(e),p=f+o;k[e]={index:e,start:f,size:o,end:p,key:h,lane:a},l[a]=e}return this.measurementsCache=k,k},{key:!1,debug:()=>this.options.debug}),this.calculateRange=g(()=>[this.getMeasurements(),this.getSize(),this.getScrollOffset(),this.options.lanes],(a,b,c,d)=>0===a.length||0===b?(this.range=null,null):(this.range=function(a,b,c,d,e){let f=a.length-1;if(a.length<=d)return{startIndex:0,endIndex:f};if(1===d&&null!==e){let a=function(a,b,c){let d=0;for(;d<=b;){let e=(d+b)/2|0,f=a[2*e];if(f<c)d=e+1;else{if(!(f>c))return e;b=e-1}}return d>0?d-1:0}(e,f,c),d=a,g=c+b;for(;d<f&&e[2*d]+e[2*d+1]<g;)d++;return{startIndex:a,endIndex:d}}let g=t(0,f,b=>a[b].start,c),h=g;if(1===d)for(;h<f&&a[h].end<c+b;)h++;else if(d>1){let e=Array(d).fill(0);for(;h<f&&e.some(a=>a<c+b);){let b=a[h];e[b.lane]=b.end,h++}let i=Array(d).fill(c+b);for(;g>=0&&i.some(a=>a>=c);){let b=a[g];i[b.lane]=b.start,g--}g=Math.max(0,g-g%d),h=Math.min(f,h+(d-1-h%d))}return{startIndex:g,endIndex:h}}(a,b,c,d,1===d&&null!=this._flatMeasurements?this._flatMeasurements:null),this.range),{key:!1,debug:()=>this.options.debug}),this.getVirtualIndexes=g(()=>{let a=null,b=null,c=this.calculateRange();return c&&(a=c.startIndex,b=c.endIndex),this.maybeNotify.updateDeps([this.isScrolling,a,b]),[this.options.rangeExtractor,this.options.overscan,this.options.count,a,b]},(a,b,c,d,e)=>null===d||null===e?[]:a({startIndex:d,endIndex:e,overscan:b,count:c}),{key:!1,debug:()=>this.options.debug}),this.indexFromElement=a=>{let b=this.options.indexAttribute,c=a.getAttribute(b);return c?parseInt(c,10):(console.warn(`Missing attribute name '${b}={index}' on measured element.`),-1)},this.shouldMeasureDuringScroll=a=>{var b;if(!this.scrollState||"smooth"!==this.scrollState.behavior)return!0;let c=this.scrollState.index??(null==(b=this.getVirtualItemForOffset(this.scrollState.lastTargetOffset))?void 0:b.index);if(void 0!==c&&this.range){let b=Math.max(this.options.overscan,Math.ceil((this.range.endIndex-this.range.startIndex)/2)),d=Math.max(0,c-b),e=Math.min(this.options.count-1,c+b);return a>=d&&a<=e}return!0},this.measureElement=a=>{if(!a)return void this.elementsCache.forEach((a,b)=>{a.isConnected||(this.observer.unobserve(a),this.elementsCache.delete(b))});let b=this.indexFromElement(a),c=this.options.getItemKey(b),d=this.elementsCache.get(c);d!==a&&(d&&this.observer.unobserve(d),this.observer.observe(a),this.elementsCache.set(c,a)),(!this.isScrolling||this.scrollState)&&this.shouldMeasureDuringScroll(b)&&this.resizeItem(b,this.options.measureElement(a,void 0,this))},this.resizeItem=(a,b)=>{var c,d;let e,f,g;if(a<0||a>=this.options.count)return;let h=this._flatMeasurements;if(1===this.options.lanes&&null!==h)g=this.options.getItemKey(a),f=h[2*a],e=h[2*a+1];else{let b=this.measurementsCache[a];if(!b)return;g=b.key,f=b.start,e=b.size}let i=b-(this.itemSizeCache.get(g)??e);if(0!==i){let h="end"===this.options.anchorTo&&(null==(c=this.scrollState)?void 0:c.behavior)!=="smooth"&&this.getVirtualDistanceFromEnd()<=this.options.scrollEndThreshold,j=h?this.getTotalSize():0,k=(null==(d=this.scrollState)?void 0:d.behavior)!=="smooth"&&(void 0!==this.shouldAdjustScrollPositionOnItemSizeChange?this.shouldAdjustScrollPositionOnItemSizeChange(this.measurementsCache[a]??{index:a,key:g,start:f,size:e,end:f+e,lane:0},i,this):f<this.getScrollOffset()+this.scrollAdjustments&&(!this.itemSizeCache.has(g)||"backward"!==this.scrollDirection));(null===this.pendingMin||a<this.pendingMin)&&(this.pendingMin=a),this.itemSizeCache.set(g,b),this.itemSizeCacheVersion++,h?this.applyScrollAdjustment(this.getTotalSize()-j):k&&this.applyScrollAdjustment(i),this.notify(!1)}},this.getVirtualItems=g(()=>[this.getVirtualIndexes(),this.getMeasurements()],(a,b)=>{let c=[];for(let d=0,e=a.length;d<e;d++){let e=b[a[d]];c.push(e)}return c},{key:!1,debug:()=>this.options.debug}),this.getVirtualItemForOffset=a=>{let b=this.getMeasurements();if(0===b.length)return;let c=this._flatMeasurements,d=1===this.options.lanes&&null!=c,e=t(0,b.length-1,d?a=>c[2*a]:a=>h(b[a]).start,a);return h(b[e])},this.getMaxScrollOffset=()=>{if(!this.scrollElement)return 0;if("scrollHeight"in this.scrollElement)return this.options.horizontal?this.scrollElement.scrollWidth-this.scrollElement.clientWidth:this.scrollElement.scrollHeight-this.scrollElement.clientHeight;{let a=this.scrollElement.document.documentElement;return this.options.horizontal?a.scrollWidth-this.scrollElement.innerWidth:a.scrollHeight-this.scrollElement.innerHeight}},this.getVirtualDistanceFromEnd=()=>Math.max(this.getTotalSize()-this.getSize()-this.getScrollOffset(),0),this.getDistanceFromEnd=()=>Math.max(this.getMaxScrollOffset()-this.getScrollOffset(),0),this.isAtEnd=(a=this.options.scrollEndThreshold)=>this.getDistanceFromEnd()<=a,this.getOffsetForAlignment=(a,b,c=0)=>{if(!this.scrollElement)return 0;let d=this.getSize(),e=this.getScrollOffset();return"auto"===b&&(b=a>=e+d?"end":"start"),"center"===b?a+=(c-d)/2:"end"===b&&(a-=d),Math.max(Math.min(this.getMaxScrollOffset(),a),0)},this.getOffsetForIndex=(a,b="auto")=>{a=Math.max(0,Math.min(a,this.options.count-1));let c=this.getSize(),d=this.getScrollOffset(),e=this.measurementsCache[a];if(!e)return;if("auto"===b)if(e.end>=d+c-this.options.scrollPaddingEnd)b="end";else{if(!(e.start<=d+this.options.scrollPaddingStart))return[d,b];b="start"}if("end"===b&&a===this.options.count-1)return[this.getMaxScrollOffset(),b];let f="end"===b?e.end+this.options.scrollPaddingEnd:e.start-this.options.scrollPaddingStart;return[this.getOffsetForAlignment(f,b,e.size),b]},this.scrollToOffset=(a,{align:b="start",behavior:c="auto"}={})=>{let d=this.getOffsetForAlignment(a,b),e=this.now();this.scrollState={index:null,align:b,behavior:c,startedAt:e,lastTargetOffset:d,stableFrames:0},this._scrollToOffset(d,{adjustments:void 0,behavior:c}),this.scheduleScrollReconcile()},this.scrollToIndex=(a,{align:b="auto",behavior:c="auto"}={})=>{a=Math.max(0,Math.min(a,this.options.count-1));let d=this.getOffsetForIndex(a,b);if(!d)return;let[e,f]=d,g=this.now();this.scrollState={index:a,align:f,behavior:c,startedAt:g,lastTargetOffset:e,stableFrames:0},this._scrollToOffset(e,{adjustments:void 0,behavior:c}),this.scheduleScrollReconcile()},this.scrollBy=(a,{behavior:b="auto"}={})=>{let c=this.getScrollOffset()+a,d=this.now();this.scrollState={index:null,align:"start",behavior:b,startedAt:d,lastTargetOffset:c,stableFrames:0},this._scrollToOffset(c,{adjustments:void 0,behavior:b}),this.scheduleScrollReconcile()},this.scrollToEnd=({behavior:a="auto"}={})=>{if(this.options.count>0)return void this.scrollToIndex(this.options.count-1,{align:"end",behavior:a});this.scrollToOffset(Math.max(this.getTotalSize()-this.getSize(),0),{behavior:a})},this.getTotalSize=()=>{var a;let b,c=this.getMeasurements();if(0===c.length)b=this.options.paddingStart;else if(1===this.options.lanes){let d=c.length-1,e=this._flatMeasurements;b=null!=e?e[2*d]+e[2*d+1]:(null==(a=c[d])?void 0:a.end)??0}else{let a=Array(this.options.lanes).fill(null),d=c.length-1;for(;d>=0&&a.some(a=>null===a);){let b=c[d];null===a[b.lane]&&(a[b.lane]=b.end),d--}b=Math.max(...a.filter(a=>null!==a))}return Math.max(b-this.options.scrollMargin+this.options.paddingEnd,0)},this.takeSnapshot=()=>{let a=[];if(0===this.itemSizeCache.size)return a;for(let b of this.getMeasurements())b&&this.itemSizeCache.has(b.key)&&a.push({index:b.index,key:b.key,start:b.start,size:b.size,end:b.end,lane:b.lane});return a},this._scrollToOffset=(a,{adjustments:b,behavior:c})=>{this._intendedScrollOffset=a+(b??0),this.options.scrollToFn(a,{behavior:c,adjustments:b},this)},this.measure=()=>{this.pendingMin=null,this.itemSizeCache.clear(),this.laneAssignments.clear(),this.itemSizeCacheVersion++,this.notify(!1)},this.setOptions(a)}applyScrollAdjustment(a,b){0!==a&&(i()&&(this.isScrolling||this._iosTouching||this._iosJustTouchEnded)?this._iosDeferredAdjustment+=a:(this._scrollToOffset(this.getScrollOffset(),{adjustments:this.scrollAdjustments+=a,behavior:b}),null!==this.scrollOffset&&(this.scrollOffset+=this.scrollAdjustments,this.scrollAdjustments=0)))}scheduleScrollReconcile(){if(!this.targetWindow){this.scrollState=null;return}null==this.rafId&&(this.rafId=this.targetWindow.requestAnimationFrame(()=>{this.rafId=null,this.reconcileScroll()}))}reconcileScroll(){if(!this.scrollState||!this.scrollElement)return;if(this.now()-this.scrollState.startedAt>5e3){this.scrollState=null;return}let a=null!=this.scrollState.index?this.getOffsetForIndex(this.scrollState.index,this.scrollState.align):void 0,b=a?a[0]:this.scrollState.lastTargetOffset,c=b!==this.scrollState.lastTargetOffset;if(!c&&1.01>Math.abs(b-this.getScrollOffset())){if(this.scrollState.stableFrames++,this.scrollState.stableFrames>=1){this.getScrollOffset()!==b&&this._scrollToOffset(b,{adjustments:void 0,behavior:"auto"}),this.scrollState=null;return}}else if(this.scrollState.stableFrames=0,c){let a=this.getSize()||600,c=Math.abs(b-this.getScrollOffset()),d="smooth"===this.scrollState.behavior&&c>a;this.scrollState.lastTargetOffset=b,d||(this.scrollState.behavior="auto"),this._scrollToOffset(b,{adjustments:void 0,behavior:d?"smooth":"auto"})}this.scheduleScrollReconcile()}}let t=(a,b,c,d)=>{for(;a<=b;){let e=(a+b)/2|0,f=c(e);if(f<d)a=e+1;else{if(!(f>d))return e;b=e-1}}return a>0?a-1:0},u="undefined"!=typeof document?e.useLayoutEffect:e.useEffect;function v(a){return function({useFlushSync:a=!0,directDomUpdates:b=!1,directDomUpdatesMode:c="transform",...d}){let g=e.useReducer(a=>a+1,0)[1],h=e.useRef({enabled:b,mode:c,container:null,lastSize:null,lastPositions:new WeakMap,prevRange:null});h.current.enabled=b,h.current.mode=c;let i=a=>{let b=h.current;if(!b.enabled||!b.container)return;let c=a.getTotalSize();if(c!==b.lastSize){b.lastSize=c;let d=a.options.horizontal?"width":"height";b.container.style[d]=`${c}px`}let d=!!a.options.horizontal,e="transform"===b.mode,f=d?"left":"top",g=a.options.scrollMargin;for(let c of a.getVirtualItems()){let h=c.start-g,i=a.elementsCache.get(c.key);i&&b.lastPositions.get(i)!==h&&(b.lastPositions.set(i,h),e?i.style.transform=d?`translate3d(${h}px, 0, 0)`:`translate3d(0, ${h}px, 0)`:i.style[f]=`${h}px`)}},j={...d,onChange:(b,c)=>{var e;let j=h.current,k=!0;if(j.enabled){i(b);let a=b.range,c=j.prevRange;(k=!c||c.isScrolling!==b.isScrolling||c.startIndex!==(null==a?void 0:a.startIndex)||c.endIndex!==(null==a?void 0:a.endIndex))&&(j.prevRange=a?{startIndex:a.startIndex,endIndex:a.endIndex,isScrolling:b.isScrolling}:null)}k&&(a&&c?(0,f.flushSync)(g):g()),null==(e=d.onChange)||e.call(d,b,c)}},[k]=e.useState(()=>{let a=new s(j);return Object.assign(a,{containerRef:b=>{let c=h.current;if(c.container=b,c.lastSize=null,b&&c.enabled){let d=a.getTotalSize();c.lastSize=d;let e=a.options.horizontal?"width":"height";b.style[e]=`${d}px`}}})});return k.setOptions(j),u(()=>k._didMount(),[]),u(()=>k._willUpdate()),u(()=>{i(k)}),k}({observeElementRect:m,observeElementOffset:p,scrollToFn:r,...a})}},559:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("arrow-right-to-line",[["path",{d:"M17 12H3",key:"8awo09"}],["path",{d:"m11 18 6-6-6-6",key:"8c2y43"}],["path",{d:"M21 5v14",key:"nzette"}]])},933:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("chevron-up",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]])},940:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("rocket",[["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",key:"qeys4"}],["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09",key:"u4xsad"}],["path",{d:"M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z",key:"676m9"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05",key:"92ym6u"}]])},1763:(a,b,c)=>{"use strict";function d(a){return a&&a.__esModule?a:{default:a}}c.r(b),c.d(b,{_:()=>d})},2663:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("workflow",[["rect",{width:"8",height:"8",x:"3",y:"3",rx:"2",key:"by2w9f"}],["path",{d:"M7 11v4a2 2 0 0 0 2 2h4",key:"xkn7yn"}],["rect",{width:"8",height:"8",x:"13",y:"13",rx:"2",key:"1cgmvn"}]])},5264:(a,b,c)=>{"use strict";c.d(b,{kh:()=>o});var d=c(22495),e=c(46452),f=c(82247),g=c(46090),h=c(40141),i=c(32149),j=c(6983);let k={maxColorCount:10,maxNoiseIterations:8},l=`#version 300 es
precision mediump float;

uniform float u_time;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${k.maxColorCount}];
uniform float u_colorsCount;

uniform float u_thickness;
uniform float u_radius;
uniform float u_innerShape;
uniform float u_noiseScale;
uniform float u_noiseIterations;

in vec2 v_objectUV;

out vec4 fragColor;

${j.ES}
${j.nI}
float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = randomR(i);
  float b = randomR(i + vec2(1.0, 0.0));
  float c = randomR(i + vec2(0.0, 1.0));
  float d = randomR(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}
vec2 fbm(vec2 n0, vec2 n1) {
  vec2 total = vec2(0.0);
  float amplitude = .4;
  for (int i = 0; i < ${k.maxNoiseIterations}; i++) {
    if (i >= int(u_noiseIterations)) break;
    total.x += valueNoise(n0) * amplitude;
    total.y += valueNoise(n1) * amplitude;
    n0 *= 1.99;
    n1 *= 1.99;
    amplitude *= 0.65;
  }
  return total;
}

float getNoise(vec2 uv, vec2 pUv, float t) {
  vec2 pUvLeft = pUv + .03 * t;
  float period = max(abs(u_noiseScale * TWO_PI), 1e-6);
  vec2 pUvRight = vec2(fract(pUv.x / period) * period, pUv.y) + .03 * t;
  vec2 noise = fbm(pUvLeft, pUvRight);
  return mix(noise.y, noise.x, smoothstep(-.25, .25, uv.x));
}

float getRingShape(vec2 uv) {
  float radius = u_radius;
  float thickness = u_thickness;

  float distance = length(uv);
  float ringValue = 1. - smoothstep(radius, radius + thickness, distance);
  ringValue *= smoothstep(radius - pow(u_innerShape, 3.) * thickness, radius, distance);

  return ringValue;
}

void main() {
  vec2 shape_uv = v_objectUV;

  float t = u_time;

  float cycleDuration = 3.;
  float period2 = 2.0 * cycleDuration;
  float localTime1 = fract((0.1 * t + cycleDuration) / period2) * period2;
  float localTime2 = fract((0.1 * t) / period2) * period2;
  float timeBlend = .5 + .5 * sin(.1 * t * PI / cycleDuration - .5 * PI);

  float atg = atan(shape_uv.y, shape_uv.x) + .001;
  float l = length(shape_uv);
  float radialOffset = .5 * l - inversesqrt(max(1e-4, l));
  vec2 polar_uv1 = vec2(atg, localTime1 - radialOffset) * u_noiseScale;
  vec2 polar_uv2 = vec2(atg, localTime2 - radialOffset) * u_noiseScale;
  
  float noise1 = getNoise(shape_uv, polar_uv1, t);
  float noise2 = getNoise(shape_uv, polar_uv2, t);

  float noise = mix(noise1, noise2, timeBlend);

  shape_uv *= (.8 + 1.2 * noise);

  float ringShape = getRingShape(shape_uv);

  float mixer = ringShape * ringShape * (u_colorsCount - 1.);
  int idxLast = int(u_colorsCount) - 1;
  vec4 gradient = u_colors[idxLast];
  gradient.rgb *= gradient.a;
  for (int i = ${k.maxColorCount} - 2; i >= 0; i--) {
    float localT = clamp(mixer - float(idxLast - i - 1), 0., 1.);
    vec4 c = u_colors[i];
    c.rgb *= c.a;
    gradient = mix(gradient, c, localT);
  }

  vec3 color = gradient.rgb * ringShape;
  float opacity = gradient.a * ringShape;

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1. - opacity);
  opacity = opacity + u_colorBack.a * (1. - opacity);

  ${j.Km}

  fragColor = vec4(color, opacity);
}
`;var m=c(45262);let n={name:"Default",params:{...g.J7,speed:.5,frame:0,colorBack:"#000000",colors:["#ffffff"],noiseScale:3,noiseIterations:8,radius:.25,thickness:.65,innerShape:.7,scale:.8}};g.J7,g.J7,g.J7;let o=(0,d.memo)(function({speed:a=n.params.speed,frame:b=n.params.frame,colorBack:c=n.params.colorBack,colors:d=n.params.colors,noiseScale:f=n.params.noiseScale,thickness:j=n.params.thickness,radius:k=n.params.radius,innerShape:o=n.params.innerShape,noiseIterations:p=n.params.noiseIterations,fit:q=n.params.fit,scale:r=n.params.scale,rotation:s=n.params.rotation,originX:t=n.params.originX,originY:u=n.params.originY,offsetX:v=n.params.offsetX,offsetY:w=n.params.offsetY,worldWidth:x=n.params.worldWidth,worldHeight:y=n.params.worldHeight,...z}){let A={u_colorBack:(0,h.G)(c),u_colors:d.map(h.G),u_colorsCount:d.length,u_noiseScale:f,u_thickness:j,u_radius:k,u_innerShape:o,u_noiseIterations:p,u_noiseTexture:(0,i.R)(),u_fit:g.Tk[q],u_scale:r,u_rotation:s,u_offsetX:v,u_offsetY:w,u_originX:t,u_originY:u,u_worldWidth:x,u_worldHeight:y};return(0,m.jsx)(e.f,{...z,speed:a,frame:b,fragmentShader:l,uniforms:A})},f.q)},6983:(a,b,c)=>{"use strict";c.d(b,{CJ:()=>i,ES:()=>d,Km:()=>j,V2:()=>k,ZB:()=>e,m0:()=>f,nI:()=>h,tZ:()=>g});let d=`
#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846
`,e=`
vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}
`,f=`
  float hash11(float p) {
    p = fract(p * 0.3183099) + 0.1;
    p *= p + 19.19;
    return fract(p * p);
  }
`,g=`
  float hash21(vec2 p) {
    p = fract(p * vec2(0.3183099, 0.3678794)) + 0.1;
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
  }
`,h=`
  float randomR(vec2 p) {
    vec2 uv = floor(p) / 100. + .5;
    return texture(u_noiseTexture, fract(uv)).r;
  }
`,i=`
  vec2 randomGB(vec2 p) {
    vec2 uv = floor(p) / 100. + .5;
    return texture(u_noiseTexture, fract(uv)).gb;
  }
`,j=`
  color += 1. / 256. * (fract(sin(dot(.014 * gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453123) - .5);
`,k=`
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`},7196:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("download",[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]])},7339:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("ban",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M4.929 4.929 19.07 19.071",key:"196cmz"}]])},7645:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("user",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]])},9780:(a,b,c)=>{"use strict";c.d(b,{hc:()=>n});var d=c(22495),e=c(46452),f=c(82247),g=c(46090),h=c(40141),i=c(6983);let j={maxColorCount:10},k=`#version 300 es
precision mediump float;

uniform float u_time;
uniform float u_scale;

uniform vec4 u_colors[${j.maxColorCount}];
uniform float u_colorsCount;
uniform float u_stepsPerColor;
uniform float u_softness;

in vec2 v_patternUV;

out vec4 fragColor;

${i.V2}

float getNoise(vec2 uv, float t) {
  float noise = .5 * snoise(uv - vec2(0., .3 * t));
  noise += .5 * snoise(2. * uv + vec2(0., .32 * t));

  return noise;
}

float steppedSmooth(float m, float steps, float softness) {
  float stepT = floor(m * steps) / steps;
  float f = m * steps - floor(m * steps);
  float fw = steps * fwidth(m);
  float smoothed = smoothstep(.5 - softness, min(1., .5 + softness + fw), f);
  return stepT + smoothed / steps;
}

void main() {
  vec2 shape_uv = v_patternUV;
  shape_uv *= .1;

  float t = .2 * u_time;

  float shape = .5 + .5 * getNoise(shape_uv, t);

  bool u_extraSides = true;

  float mixer = shape * (u_colorsCount - 1.);
  if (u_extraSides == true) {
    mixer = (shape - .5 / u_colorsCount) * u_colorsCount;
  }

  float steps = max(1., u_stepsPerColor);

  vec4 gradient = u_colors[0];
  gradient.rgb *= gradient.a;
  for (int i = 1; i < ${j.maxColorCount}; i++) {
    if (i >= int(u_colorsCount)) break;

    float localM = clamp(mixer - float(i - 1), 0., 1.);
    localM = steppedSmooth(localM, steps, .5 * u_softness);

    vec4 c = u_colors[i];
    c.rgb *= c.a;
    gradient = mix(gradient, c, localM);
  }

  if (u_extraSides == true) {
    if ((mixer < 0.) || (mixer > (u_colorsCount - 1.))) {
      float localM = mixer + 1.;
      if (mixer > (u_colorsCount - 1.)) {
        localM = mixer - (u_colorsCount - 1.);
      }
      localM = steppedSmooth(localM, steps, .5 * u_softness);
      vec4 cFst = u_colors[0];
      cFst.rgb *= cFst.a;
      vec4 cLast = u_colors[int(u_colorsCount - 1.)];
      cLast.rgb *= cLast.a;
      gradient = mix(cLast, cFst, localM);
    }
  }

  vec3 color = gradient.rgb;
  float opacity = gradient.a;

  ${i.Km}

  fragColor = vec4(color, opacity);
}
`;var l=c(45262);let m={name:"Default",params:{...g.OZ,scale:.6,speed:.5,frame:0,colors:["#4449CF","#FFD1E0","#F94446","#FFD36B","#FFFFFF"],stepsPerColor:2,softness:0}};g.OZ,g.OZ,g.OZ;let n=(0,d.memo)(function({speed:a=m.params.speed,frame:b=m.params.frame,colors:c=m.params.colors,stepsPerColor:d=m.params.stepsPerColor,softness:f=m.params.softness,fit:i=m.params.fit,scale:j=m.params.scale,rotation:n=m.params.rotation,originX:o=m.params.originX,originY:p=m.params.originY,offsetX:q=m.params.offsetX,offsetY:r=m.params.offsetY,worldWidth:s=m.params.worldWidth,worldHeight:t=m.params.worldHeight,...u}){let v={u_colors:c.map(h.G),u_colorsCount:c.length,u_stepsPerColor:d,u_softness:f,u_fit:g.Tk[i],u_scale:j,u_rotation:n,u_offsetX:q,u_offsetY:r,u_originX:o,u_originY:p,u_worldWidth:s,u_worldHeight:t};return(0,l.jsx)(e.f,{...u,speed:a,frame:b,fragmentShader:k,uniforms:v})},f.q)},11657:(a,b,c)=>{"use strict";c.d(b,{KQ:()=>n});var d=c(22495),e=c(46452),f=c(82247),g=c(46090),h=c(40141),i=c(6983);let j=`#version 300 es
precision mediump float;

uniform vec4 u_colorBack;
uniform vec4 u_colorFill;
uniform vec4 u_colorStroke;
uniform float u_dotSize;
uniform float u_gapX;
uniform float u_gapY;
uniform float u_strokeWidth;
uniform float u_sizeRange;
uniform float u_opacityRange;
uniform float u_shape;

in vec2 v_patternUV;

out vec4 fragColor;

${i.ES}
${i.V2}

float polygon(vec2 p, float N, float rot) {
  float a = atan(p.x, p.y) + rot;
  float r = TWO_PI / float(N);

  return cos(floor(.5 + a / r) * r - a) * length(p);
}

void main() {

  // x100 is a default multiplier between vertex and fragmant shaders
  // we use it to avoid UV presision issues
  vec2 shape_uv = 100. * v_patternUV;

  vec2 gap = max(abs(vec2(u_gapX, u_gapY)), vec2(1e-6));
  vec2 grid = fract(shape_uv / gap) + 1e-4;
  vec2 grid_idx = floor(shape_uv / gap);
  float sizeRandomizer = .5 + .8 * snoise(2. * vec2(grid_idx.x * 100., grid_idx.y));
  float opacity_randomizer = .5 + .7 * snoise(2. * vec2(grid_idx.y, grid_idx.x));

  vec2 center = vec2(0.5) - 1e-3;
  vec2 p = (grid - center) * vec2(u_gapX, u_gapY);

  float baseSize = u_dotSize * (1. - sizeRandomizer * u_sizeRange);
  float strokeWidth = u_strokeWidth * (1. - sizeRandomizer * u_sizeRange);

  float dist;
  if (u_shape < 0.5) {
    // Circle
    dist = length(p);
  } else if (u_shape < 1.5) {
    // Diamond
    strokeWidth *= 1.5;
    dist = polygon(1.5 * p, 4., .25 * PI);
  } else if (u_shape < 2.5) {
    // Square
    dist = polygon(1.03 * p, 4., 1e-3);
  } else {
    // Triangle
    strokeWidth *= 1.5;
    p = p * 2. - 1.;
    p *= .9;
    p.y = 1. - p.y;
    p.y -= .75 * baseSize;
    dist = polygon(p, 3., 1e-3);
  }

  float edgeWidth = fwidth(dist);
  float shapeOuter = 1. - smoothstep(baseSize - edgeWidth, baseSize + edgeWidth, dist - strokeWidth);
  float shapeInner = 1. - smoothstep(baseSize - edgeWidth, baseSize + edgeWidth, dist);
  float stroke = shapeOuter - shapeInner;

  float dotOpacity = max(0., 1. - opacity_randomizer * u_opacityRange);
  stroke *= dotOpacity;
  shapeInner *= dotOpacity;

  stroke *= u_colorStroke.a;
  shapeInner *= u_colorFill.a;

  vec3 color = vec3(0.);
  color += stroke * u_colorStroke.rgb;
  color += shapeInner * u_colorFill.rgb;
  color += (1. - shapeInner - stroke) * u_colorBack.rgb * u_colorBack.a;

  float opacity = 0.;
  opacity += stroke;
  opacity += shapeInner;
  opacity += (1. - opacity) * u_colorBack.a;

  fragColor = vec4(color, opacity);
}
`,k={circle:0,diamond:1,square:2,triangle:3};var l=c(45262);let m={name:"Default",params:{...g.OZ,colorBack:"#000000",colorFill:"#ffffff",colorStroke:"#ffaa00",size:2,gapX:32,gapY:32,strokeWidth:0,sizeRange:0,opacityRange:0,shape:"circle"}};g.OZ,g.OZ,g.OZ;let n=(0,d.memo)(function({colorBack:a=m.params.colorBack,colorFill:b=m.params.colorFill,colorStroke:c=m.params.colorStroke,size:d=m.params.size,gapX:f=m.params.gapX,gapY:i=m.params.gapY,strokeWidth:n=m.params.strokeWidth,sizeRange:o=m.params.sizeRange,opacityRange:p=m.params.opacityRange,shape:q=m.params.shape,fit:r=m.params.fit,scale:s=m.params.scale,rotation:t=m.params.rotation,originX:u=m.params.originX,originY:v=m.params.originY,offsetX:w=m.params.offsetX,offsetY:x=m.params.offsetY,worldWidth:y=m.params.worldWidth,worldHeight:z=m.params.worldHeight,maxPixelCount:A=0x136a400,...B}){let C={u_colorBack:(0,h.G)(a),u_colorFill:(0,h.G)(b),u_colorStroke:(0,h.G)(c),u_dotSize:d,u_gapX:f,u_gapY:i,u_strokeWidth:n,u_sizeRange:o,u_opacityRange:p,u_shape:k[q],u_fit:g.Tk[r],u_scale:s,u_rotation:t,u_offsetX:w,u_offsetY:x,u_originX:u,u_originY:v,u_worldWidth:y,u_worldHeight:z};return(0,l.jsx)(e.f,{...B,maxPixelCount:A,fragmentShader:j,uniforms:C})},f.q)},11995:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("grip-vertical",[["circle",{cx:"9",cy:"12",r:"1",key:"1vctgf"}],["circle",{cx:"9",cy:"5",r:"1",key:"hp0tcf"}],["circle",{cx:"9",cy:"19",r:"1",key:"fkjjf6"}],["circle",{cx:"15",cy:"12",r:"1",key:"1tmaij"}],["circle",{cx:"15",cy:"5",r:"1",key:"19l28e"}],["circle",{cx:"15",cy:"19",r:"1",key:"f4zoj3"}]])},12142:(a,b,c)=>{"use strict";c.d(b,{x:()=>i});var d=c(45262),e=c(22495),f=c(4957),g=c(73959),h=c(44268);function i({children:a,isValidProp:b,...c}){b&&(0,g.D)(b),(c={...(0,e.useContext)(f.Q),...c}).isStatic=(0,h.M)(()=>c.isStatic);let i=(0,e.useMemo)(()=>c,[JSON.stringify(c.transition),c.transformPagePoint,c.reducedMotion]);return(0,d.jsx)(f.Q.Provider,{value:i,children:a})}},12749:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("clipboard-check",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"m9 14 2 2 4-4",key:"df797q"}]])},14086:(a,b,c)=>{"use strict";c.d(b,{j:()=>g});var d=c(21606),e=c(3483),f=c(69175);function g(a,b){let c=(0,d.d)(b()),g=()=>c.set(b());return g(),(0,e.E)(()=>{let b=()=>f.Gt.preRender(g,!1,!0),c=a.map(a=>a.on("change",b));return()=>{c.forEach(a=>a()),(0,f.WG)(g)}}),c}},14092:(a,b,c)=>{"use strict";c.d(b,{W:()=>e});var d=c(22495);function e(a,{root:b,margin:c,amount:f,once:g=!1}={}){let[h,i]=(0,d.useState)(!1);return h}c(16979)},14241:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("radio-tower",[["path",{d:"M4.9 16.1C1 12.2 1 5.8 4.9 1.9",key:"s0qx1y"}],["path",{d:"M7.8 4.7a6.14 6.14 0 0 0-.8 7.5",key:"1idnkw"}],["circle",{cx:"12",cy:"9",r:"2",key:"1092wv"}],["path",{d:"M16.2 4.8c2 2 2.26 5.11.8 7.47",key:"ojru2q"}],["path",{d:"M19.1 1.9a9.96 9.96 0 0 1 0 14.1",key:"rhi7fg"}],["path",{d:"M9.5 18h5",key:"mfy3pd"}],["path",{d:"m8 22 4-11 4 11",key:"25yftu"}]])},14482:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("file",[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}]])},17468:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("circle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]])},17784:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]])},18093:(a,b,c)=>{"use strict";c.d(b,{nJ:()=>m});var d=c(22495),e=c(46452),f=c(82247),g=c(46090),h=c(40141),i=c(6983);let j=`#version 300 es
precision mediump float;

uniform vec4 u_colorFront;
uniform vec4 u_colorBack;
uniform float u_shape;
uniform float u_frequency;
uniform float u_amplitude;
uniform float u_spacing;
uniform float u_proportion;
uniform float u_softness;

in vec2 v_patternUV;

out vec4 fragColor;

${i.ES}

void main() {
  vec2 shape_uv = v_patternUV;
  shape_uv *= 4.;

  float wave = .5 * cos(shape_uv.x * u_frequency * TWO_PI);
  float zigzag = 2. * abs(fract(shape_uv.x * u_frequency) - .5);
  float irregular = sin(shape_uv.x * .25 * u_frequency * TWO_PI) * cos(shape_uv.x * u_frequency * TWO_PI);
  float irregular2 = .75 * (sin(shape_uv.x * u_frequency * TWO_PI) + .5 * cos(shape_uv.x * .5 * u_frequency * TWO_PI));

  float offset = mix(zigzag, wave, smoothstep(0., 1., u_shape));
  offset = mix(offset, irregular, smoothstep(1., 2., u_shape));
  offset = mix(offset, irregular2, smoothstep(2., 3., u_shape));
  offset *= 2. * u_amplitude;

  float spacing = (.001 + u_spacing);
  float shape = .5 + .5 * sin((shape_uv.y + offset) * PI / spacing);

  float aa = .0001 + fwidth(shape);
  float dc = 1. - clamp(u_proportion, 0., 1.);
  float e0 = dc - u_softness - aa;
  float e1 = dc + u_softness + aa;
  float res = smoothstep(min(e0, e1), max(e0, e1), shape);

  vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
  float fgOpacity = u_colorFront.a;
  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  float bgOpacity = u_colorBack.a;

  vec3 color = fgColor * res;
  float opacity = fgOpacity * res;

  color += bgColor * (1. - opacity);
  opacity += bgOpacity * (1. - opacity);

  fragColor = vec4(color, opacity);
}
`;var k=c(45262);let l={name:"Default",params:{...g.OZ,scale:.6,colorFront:"#ffbb00",colorBack:"#000000",shape:0,frequency:.5,amplitude:.5,spacing:1.2,proportion:.1,softness:0}};g.OZ,g.OZ,g.OZ;let m=(0,d.memo)(function({colorFront:a=l.params.colorFront,colorBack:b=l.params.colorBack,shape:c=l.params.shape,frequency:d=l.params.frequency,amplitude:f=l.params.amplitude,spacing:i=l.params.spacing,proportion:m=l.params.proportion,softness:n=l.params.softness,fit:o=l.params.fit,scale:p=l.params.scale,rotation:q=l.params.rotation,offsetX:r=l.params.offsetX,offsetY:s=l.params.offsetY,originX:t=l.params.originX,originY:u=l.params.originY,worldWidth:v=l.params.worldWidth,worldHeight:w=l.params.worldHeight,maxPixelCount:x=0x136a400,...y}){let z={u_colorFront:(0,h.G)(a),u_colorBack:(0,h.G)(b),u_shape:c,u_frequency:d,u_amplitude:f,u_spacing:i,u_proportion:m,u_softness:n,u_fit:g.Tk[o],u_scale:p,u_rotation:q,u_offsetX:r,u_offsetY:s,u_originX:t,u_originY:u,u_worldWidth:v,u_worldHeight:w};return(0,k.jsx)(e.f,{...y,fragmentShader:j,uniforms:z})},f.q)},18921:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("triangle-alert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]])},19016:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("folder-kanban",[["path",{d:"M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z",key:"1fr9dc"}],["path",{d:"M8 10v4",key:"tgpxqk"}],["path",{d:"M12 10v2",key:"hh53o1"}],["path",{d:"M16 10v6",key:"1d6xys"}]])},19818:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]])},19931:(a,b,c)=>{"use strict";c.d(b,{tH:()=>p});var d=c(22495),e=c(46452),f=c(82247),g=c(46090),h=c(40141),i=c(32149),j=c(6983);let k={maxColorCount:5,maxSpots:4},l=`#version 300 es
precision lowp float;

uniform float u_time;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${k.maxColorCount}];
uniform float u_colorsCount;
uniform float u_roundness;
uniform float u_thickness;
uniform float u_marginLeft;
uniform float u_marginRight;
uniform float u_marginTop;
uniform float u_marginBottom;
uniform float u_aspectRatio;
uniform float u_softness;
uniform float u_intensity;
uniform float u_bloom;
uniform float u_spotSize;
uniform float u_spots;
uniform float u_pulse;
uniform float u_smoke;
uniform float u_smokeSize;

uniform sampler2D u_noiseTexture;

in vec2 v_responsiveUV;
in vec2 v_responsiveBoxGivenSize;
in vec2 v_patternUV;

out vec4 fragColor;

${j.ES}

float beat(float time) {
  float first = pow(abs(sin(time * TWO_PI)), 10.);
  float second = pow(abs(sin((time - .15) * TWO_PI)), 10.);

  return clamp(first + 0.6 * second, 0.0, 1.0);
}

float sst(float edge0, float edge1, float x) {
  return smoothstep(edge0, edge1, x);
}

float roundedBox(vec2 uv, vec2 halfSize, float distance, float cornerDistance, float thickness, float softness) {
  float borderDistance = abs(distance);
  float aa = 2. * fwidth(distance);
  float border = 1. - sst(min(mix(thickness, -thickness, softness), thickness + aa), max(mix(thickness, -thickness, softness), thickness + aa), borderDistance);
  float cornerFadeCircles = 0.;
  cornerFadeCircles = mix(1., cornerFadeCircles, sst(0., 1., length((uv + halfSize) / thickness)));
  cornerFadeCircles = mix(1., cornerFadeCircles, sst(0., 1., length((uv - vec2(-halfSize.x, halfSize.y)) / thickness)));
  cornerFadeCircles = mix(1., cornerFadeCircles, sst(0., 1., length((uv - vec2(halfSize.x, -halfSize.y)) / thickness)));
  cornerFadeCircles = mix(1., cornerFadeCircles, sst(0., 1., length((uv - halfSize) / thickness)));
  aa = fwidth(cornerDistance);
  float cornerFade = sst(0., mix(aa, thickness, softness), cornerDistance);
  cornerFade *= cornerFadeCircles;
  border += cornerFade;
  return border;
}

${j.CJ}

float randomG(vec2 p) {
  vec2 uv = floor(p) / 100. + .5;
  return texture(u_noiseTexture, fract(uv)).g;
}
float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = randomG(i);
  float b = randomG(i + vec2(1.0, 0.0));
  float c = randomG(i + vec2(0.0, 1.0));
  float d = randomG(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

void main() {
  const float firstFrameOffset = 109.;
  float t = 1.2 * (u_time + firstFrameOffset);

  vec2 borderUV = v_responsiveUV;
  float pulse = u_pulse * beat(.18 * u_time);

  float canvasRatio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
  vec2 halfSize = vec2(.5);
  borderUV.x *= max(canvasRatio, 1.);
  borderUV.y /= min(canvasRatio, 1.);
  halfSize.x *= max(canvasRatio, 1.);
  halfSize.y /= min(canvasRatio, 1.);

  float mL = u_marginLeft;
  float mR = u_marginRight;
  float mT = u_marginTop;
  float mB = u_marginBottom;
  float mX = mL + mR;
  float mY = mT + mB;

  if (u_aspectRatio > 0.) {
    float shapeRatio = canvasRatio * (1. - mX) / max(1. - mY, 1e-6);
    float freeX = shapeRatio > 1. ? (1. - mX) * (1. - 1. / max(abs(shapeRatio), 1e-6)) : 0.;
    float freeY = shapeRatio < 1. ? (1. - mY) * (1. - shapeRatio) : 0.;
    mL += freeX * 0.5;
    mR += freeX * 0.5;
    mT += freeY * 0.5;
    mB += freeY * 0.5;
    mX = mL + mR;
    mY = mT + mB;
  }

  float thickness = .5 * u_thickness * min(halfSize.x, halfSize.y);

  halfSize.x *= (1. - mX);
  halfSize.y *= (1. - mY);

  vec2 centerShift = vec2(
  (mL - mR) * max(canvasRatio, 1.) * 0.5,
  (mB - mT) / min(canvasRatio, 1.) * 0.5
  );

  borderUV -= centerShift;
  halfSize -= mix(thickness, 0., u_softness);

  float radius = mix(0., min(halfSize.x, halfSize.y), u_roundness);
  vec2 d = abs(borderUV) - halfSize + radius;
  float outsideDistance = length(max(d, .0001)) - radius;
  float insideDistance = min(max(d.x, d.y), .0001);
  float cornerDistance = abs(min(max(d.x, d.y) - .45 * radius, .0));
  float distance = outsideDistance + insideDistance;

  float borderThickness = mix(thickness, 3. * thickness, u_softness);
  float border = roundedBox(borderUV, halfSize, distance, cornerDistance, borderThickness, u_softness);
  border = pow(border, 1. + u_softness);

  vec2 smokeUV = .3 * u_smokeSize * v_patternUV;
  float smoke = clamp(3. * valueNoise(2.7 * smokeUV + .5 * t), 0., 1.);
  smoke -= valueNoise(3.4 * smokeUV - .5 * t);
  float smokeThickness = thickness + .2;
  smokeThickness = min(.4, max(smokeThickness, .1));
  smoke *= roundedBox(borderUV, halfSize, distance, cornerDistance, smokeThickness, 1.);
  smoke = 30. * smoke * smoke;
  smoke *= mix(0., .5, pow(u_smoke, 2.));
  smoke *= mix(1., pulse, u_pulse);
  smoke = clamp(smoke, 0., 1.);
  border += smoke;

  border = clamp(border, 0., 1.);

  vec3 blendColor = vec3(0.);
  float blendAlpha = 0.;
  vec3 addColor = vec3(0.);
  float addAlpha = 0.;

  float bloom = 4. * u_bloom;
  float intensity = 1. + (1. + 4. * u_softness) * u_intensity;

  float angle = atan(borderUV.y, borderUV.x) / TWO_PI;

  for (int colorIdx = 0; colorIdx < ${k.maxColorCount}; colorIdx++) {
    if (colorIdx >= int(u_colorsCount)) break;
    float colorIdxF = float(colorIdx);

    vec3 c = u_colors[colorIdx].rgb * u_colors[colorIdx].a;
    float a = u_colors[colorIdx].a;

    for (int spotIdx = 0; spotIdx < ${k.maxSpots}; spotIdx++) {
      if (spotIdx >= int(u_spots)) break;
      float spotIdxF = float(spotIdx);

      vec2 randVal = randomGB(vec2(spotIdxF * 10. + 2., 40. + colorIdxF));

      float time = (.1 + .15 * abs(sin(spotIdxF * (2. + colorIdxF)) * cos(spotIdxF * (2. + 2.5 * colorIdxF)))) * t + randVal.x * 3.;
      time *= mix(1., -1., step(.5, randVal.y));

      float mask = .5 + .5 * mix(
      sin(t + spotIdxF * (5. - 1.5 * colorIdxF)),
      cos(t + spotIdxF * (3. + 1.3 * colorIdxF)),
      step(mod(colorIdxF, 2.), .5)
      );

      float p = clamp(2. * u_pulse - randVal.x, 0., 1.);
      mask = mix(mask, pulse, p);

      float atg1 = fract(angle + time);
      float spotSize = .05 + .6 * pow(u_spotSize, 2.) + .05 * randVal.x;
      spotSize = mix(spotSize, .1, p);
      float sector = sst(.5 - spotSize, .5, atg1) * (1. - sst(.5, .5 + spotSize, atg1));

      sector *= mask;
      sector *= border;
      sector *= intensity;
      sector = clamp(sector, 0., 1.);

      vec3 srcColor = c * sector;
      float srcAlpha = a * sector;

      blendColor += ((1. - blendAlpha) * srcColor);
      blendAlpha = blendAlpha + (1. - blendAlpha) * srcAlpha;
      addColor += srcColor;
      addAlpha += srcAlpha;
    }
  }

  vec3 accumColor = mix(blendColor, addColor, bloom);
  float accumAlpha = mix(blendAlpha, addAlpha, bloom);
  accumAlpha = clamp(accumAlpha, 0., 1.);

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  vec3 color = accumColor + (1. - accumAlpha) * bgColor;
  float opacity = accumAlpha + (1. - accumAlpha) * u_colorBack.a;

  ${j.Km}

  fragColor = vec4(color, opacity);
}`,m={auto:0,square:1};var n=c(45262);let o={name:"Default",params:{...g.J7,speed:1,frame:0,scale:.6,colorBack:"#000000",colors:["#0dc1fd","#d915ef","#ff3f2ecc"],roundness:.25,thickness:.1,margin:0,marginLeft:0,marginRight:0,marginTop:0,marginBottom:0,aspectRatio:"auto",softness:.75,intensity:.2,bloom:.25,spots:5,spotSize:.5,pulse:.25,smoke:.3,smokeSize:.6}};g.J7,g.J7,g.J7;let p=(0,d.memo)(function({speed:a=o.params.speed,frame:b=o.params.frame,colors:c=o.params.colors,colorBack:d=o.params.colorBack,roundness:f=o.params.roundness,thickness:j=o.params.thickness,aspectRatio:k=o.params.aspectRatio,softness:p=o.params.softness,bloom:q=o.params.bloom,intensity:r=o.params.intensity,spots:s=o.params.spots,spotSize:t=o.params.spotSize,pulse:u=o.params.pulse,smoke:v=o.params.smoke,smokeSize:w=o.params.smokeSize,margin:x,marginLeft:y=x??o.params.marginLeft,marginRight:z=x??o.params.marginRight,marginTop:A=x??o.params.marginTop,marginBottom:B=x??o.params.marginBottom,fit:C=o.params.fit,rotation:D=o.params.rotation,scale:E=o.params.scale,originX:F=o.params.originX,originY:G=o.params.originY,offsetX:H=o.params.offsetX,offsetY:I=o.params.offsetY,worldWidth:J=o.params.worldWidth,worldHeight:K=o.params.worldHeight,...L}){let M={u_colorBack:(0,h.G)(d),u_colors:c.map(h.G),u_colorsCount:c.length,u_roundness:f,u_thickness:j,u_marginLeft:y,u_marginRight:z,u_marginTop:A,u_marginBottom:B,u_aspectRatio:m[k],u_softness:p,u_intensity:r,u_bloom:q,u_spots:s,u_spotSize:t,u_pulse:u,u_smoke:v,u_smokeSize:w,u_noiseTexture:(0,i.R)(),u_fit:g.Tk[C],u_rotation:D,u_scale:E,u_offsetX:H,u_offsetY:I,u_originX:F,u_originY:G,u_worldWidth:J,u_worldHeight:K};return(0,n.jsx)(e.f,{...L,speed:a,frame:b,fragmentShader:l,uniforms:M})},f.q)},24628:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("phone",[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]])},25380:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("ellipsis-vertical",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"12",cy:"5",r:"1",key:"gxeob9"}],["circle",{cx:"12",cy:"19",r:"1",key:"lyex9k"}]])},26575:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]])},27251:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("eye-off",[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]])},29061:(a,b,c)=>{"use strict";c.d(b,{q9:()=>o});var d=c(22495),e=c(46452),f=c(82247),g=c(46090),h=c(40141),i=c(32149),j=c(6983);let k={maxColorCount:8,maxBallsCount:20},l=`#version 300 es
precision mediump float;

uniform float u_time;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${k.maxColorCount}];
uniform float u_colorsCount;
uniform float u_size;
uniform float u_sizeRange;
uniform float u_count;

in vec2 v_objectUV;

out vec4 fragColor;

${j.ES}
${j.nI}
float noise(float x) {
  float i = floor(x);
  float f = fract(x);
  float u = f * f * (3.0 - 2.0 * f);
  vec2 p0 = vec2(i, 0.0);
  vec2 p1 = vec2(i + 1.0, 0.0);
  return mix(randomR(p0), randomR(p1), u);
}

float getBallShape(vec2 uv, vec2 c, float p) {
  float s = .5 * length(uv - c);
  s = 1. - clamp(s, 0., 1.);
  s = pow(s, p);
  return s;
}

void main() {
  vec2 shape_uv = v_objectUV;

  shape_uv += .5;

  const float firstFrameOffset = 2503.4;
  float t = .2 * (u_time + firstFrameOffset);

  vec3 totalColor = vec3(0.);
  float totalShape = 0.;
  float totalOpacity = 0.;

  for (int i = 0; i < ${k.maxBallsCount}; i++) {
    if (i >= int(ceil(u_count))) break;

    float idxFract = float(i) / float(${k.maxBallsCount});
    float angle = TWO_PI * idxFract;

    float speed = 1. - .2 * idxFract;
    float noiseX = noise(angle * 10. + float(i) + t * speed);
    float noiseY = noise(angle * 20. + float(i) - t * speed);

    vec2 pos = vec2(.5) + 1e-4 + .9 * (vec2(noiseX, noiseY) - .5);

    int safeIndex = i % int(u_colorsCount + 0.5);
    vec4 ballColor = u_colors[safeIndex];
    ballColor.rgb *= ballColor.a;

    float sizeFrac = 1.;
    if (float(i) > floor(u_count - 1.)) {
      sizeFrac *= fract(u_count);
    }

    float shape = getBallShape(shape_uv, pos, 45. - 30. * u_size * sizeFrac);
    shape *= pow(u_size, .2);
    shape = smoothstep(0., 1., shape);

    totalColor += ballColor.rgb * shape;
    totalShape += shape;
    totalOpacity += ballColor.a * shape;
  }

  totalColor /= max(totalShape, 1e-4);
  totalOpacity /= max(totalShape, 1e-4);

  float edge_width = fwidth(totalShape);
  float finalShape = smoothstep(.4, .4 + edge_width, totalShape);

  vec3 color = totalColor * finalShape;
  float opacity = totalOpacity * finalShape;

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1. - opacity);
  opacity = opacity + u_colorBack.a * (1. - opacity);

  ${j.Km}

  fragColor = vec4(color, opacity);
}
`;var m=c(45262);let n={name:"Default",params:{...g.J7,scale:1,speed:1,frame:0,colorBack:"#000000",colors:["#6e33cc","#ff5500","#ffc105","#ffc800","#f585ff"],count:10,size:.83}};g.J7,g.J7,g.J7;let o=(0,d.memo)(function({speed:a=n.params.speed,frame:b=n.params.frame,colorBack:c=n.params.colorBack,colors:d=n.params.colors,size:f=n.params.size,count:j=n.params.count,fit:k=n.params.fit,rotation:o=n.params.rotation,scale:p=n.params.scale,originX:q=n.params.originX,originY:r=n.params.originY,offsetX:s=n.params.offsetX,offsetY:t=n.params.offsetY,worldWidth:u=n.params.worldWidth,worldHeight:v=n.params.worldHeight,...w}){let x={u_colorBack:(0,h.G)(c),u_colors:d.map(h.G),u_colorsCount:d.length,u_size:f,u_count:j,u_noiseTexture:(0,i.R)(),u_fit:g.Tk[k],u_rotation:o,u_scale:p,u_offsetX:s,u_offsetY:t,u_originX:q,u_originY:r,u_worldWidth:u,u_worldHeight:v};return(0,m.jsx)(e.f,{...w,speed:a,frame:b,fragmentShader:l,uniforms:x})},f.q)},30058:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("badge-check",[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]])},30243:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("siren",[["path",{d:"M7 18v-6a5 5 0 1 1 10 0v6",key:"pcx96s"}],["path",{d:"M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z",key:"1b4s83"}],["path",{d:"M21 12h1",key:"jtio3y"}],["path",{d:"M18.5 4.5 18 5",key:"g5sp9y"}],["path",{d:"M2 12h1",key:"1uaihz"}],["path",{d:"M12 2v1",key:"11qlp1"}],["path",{d:"m4.929 4.929.707.707",key:"1i51kw"}],["path",{d:"M12 12v6",key:"3ahymv"}]])},30298:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("chevron-down",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]])},30591:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("cloud-upload",[["path",{d:"M12 13v8",key:"1l5pq0"}],["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"m8 17 4-4 4 4",key:"1quai1"}]])},32149:(a,b,c)=>{"use strict";function d(){if("undefined"==typeof window)return;let a=new Image;return a.src=e,a}c.d(b,{R:()=>d});let e="data:image/png;base64,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"},32294:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("archive",[["rect",{width:"20",height:"5",x:"2",y:"3",rx:"1",key:"1wp1u1"}],["path",{d:"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8",key:"1s80jp"}],["path",{d:"M10 12h4",key:"a56b0p"}]])},33989:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("folder-closed",[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}],["path",{d:"M2 10h20",key:"1ir3d8"}]])},34102:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("file-code-corner",[["path",{d:"M4 12.15V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3.35",key:"1wthlu"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"m5 16-3 3 3 3",key:"331omg"}],["path",{d:"m9 22 3-3-3-3",key:"lsp7cz"}]])},34840:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("table",[["path",{d:"M12 3v18",key:"108xh3"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M3 15h18",key:"5xshup"}]])},36081:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("package-open",[["path",{d:"M12 22v-9",key:"x3hkom"}],["path",{d:"M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z",key:"2ntwy6"}],["path",{d:"M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13",key:"1pmm1c"}],["path",{d:"M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z",key:"12ttoo"}]])},36311:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("file-archive",[["path",{d:"M13.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v11.5",key:"4pqfef"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M8 12v-1",key:"1ej8lb"}],["path",{d:"M8 18v-2",key:"qcmpov"}],["path",{d:"M8 7V6",key:"1nbb54"}],["circle",{cx:"8",cy:"20",r:"2",key:"ckkr5m"}]])},36435:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("settings",[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]])},36711:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("wallet",[["path",{d:"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",key:"18etb6"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",key:"xoc0q4"}]])},37137:(a,b,c)=>{"use strict";c.d(b,{E:()=>f});var d=c(14086),e=c(35655);function f(a,...b){let c=a.length;return(0,d.j)(b.filter(e.S),function(){let d="";for(let f=0;f<c;f++){d+=a[f];let c=b[f];c&&(d+=(0,e.S)(c)?c.get():c)}return d})}},38379:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("calendar-clock",[["path",{d:"M16 14v2.2l1.6 1",key:"fo4ql5"}],["path",{d:"M16 2v4",key:"4m81vk"}],["path",{d:"M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5",key:"1osxxc"}],["path",{d:"M3 10h5",key:"r794hk"}],["path",{d:"M8 2v4",key:"1cmpym"}],["circle",{cx:"16",cy:"16",r:"6",key:"qoo3c4"}]])},38387:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("package-check",[["path",{d:"M12 22V12",key:"d0xqtd"}],["path",{d:"m16 17 2 2 4-4",key:"uh5qu3"}],["path",{d:"M21 11.127V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.32-.753",key:"kpkbpo"}],["path",{d:"M3.29 7 12 12l8.71-5",key:"19ckod"}],["path",{d:"m7.5 4.27 8.997 5.148",key:"9yrvtv"}]])},38446:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("chart-spline",[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7",key:"lw07rv"}]])},38866:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("arrow-down-up",[["path",{d:"m3 16 4 4 4-4",key:"1co6wj"}],["path",{d:"M7 20V4",key:"1yoxec"}],["path",{d:"m21 8-4-4-4 4",key:"1c9v7m"}],["path",{d:"M17 4v16",key:"7dpous"}]])},40141:(a,b,c)=>{"use strict";function d(a){if(Array.isArray(a))return 4===a.length?a:3===a.length?[...a,1]:f;if("string"!=typeof a)return f;let b,c,d,g=1;if(a.startsWith("#"))[b,c,d,g]=function(a){3===(a=a.replace(/^#/,"")).length&&(a=a.split("").map(a=>a+a).join("")),6===a.length&&(a+="ff");let b=parseInt(a.slice(0,2),16)/255,c=parseInt(a.slice(2,4),16)/255;return[b,c,parseInt(a.slice(4,6),16)/255,parseInt(a.slice(6,8),16)/255]}(a);else if(a.startsWith("rgb"))[b,c,d,g]=function(a){let b=a.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)$/i);return b?[parseInt(b[1]??"0")/255,parseInt(b[2]??"0")/255,parseInt(b[3]??"0")/255,void 0===b[4]?1:parseFloat(b[4])]:[0,0,0,1]}(a);else{if(!a.startsWith("hsl"))return console.error("Unsupported color format",a),f;[b,c,d,g]=function(a){let b,c,d,[e,f,g,h]=a,i=e/360,j=f/100,k=g/100;if(0===f)b=c=d=k;else{let a=(a,b,c)=>(c<0&&(c+=1),c>1&&(c-=1),c<1/6)?a+(b-a)*6*c:c<.5?b:c<2/3?a+(b-a)*(2/3-c)*6:a,e=k<.5?k*(1+j):k+j-k*j,f=2*k-e;b=a(f,e,i+1/3),c=a(f,e,i),d=a(f,e,i-1/3)}return[b,c,d,h]}(function(a){let b=a.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([0-9.]+))?\s*\)$/i);return b?[parseInt(b[1]??"0"),parseInt(b[2]??"0"),parseInt(b[3]??"0"),void 0===b[4]?1:parseFloat(b[4])]:[0,0,0,1]}(a))}return[e(b,0,1),e(c,0,1),e(d,0,1),e(g,0,1)]}c.d(b,{G:()=>d});let e=(a,b,c)=>Math.min(Math.max(a,b),c),f=[0,0,0,1]},42007:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("message-square",[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]])},42508:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("trending-down",[["path",{d:"M16 17h6v-6",key:"t6n2it"}],["path",{d:"m22 17-8.5-8.5-5 5L2 7",key:"x473p"}]])},43484:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("history",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]])},46090:(a,b,c)=>{"use strict";c.d(b,{J7:()=>d,OZ:()=>e,Tk:()=>f});let d={fit:"contain",scale:1,rotation:0,offsetX:0,offsetY:0,originX:.5,originY:.5,worldWidth:0,worldHeight:0},e={fit:"none",scale:1,rotation:0,offsetX:0,offsetY:0,originX:.5,originY:.5,worldWidth:0,worldHeight:0},f={none:0,contain:1,cover:2}},46452:(a,b,c)=>{"use strict";c.d(b,{f:()=>m});var d=c(22495);let e=`#version 300 es
precision mediump float;

layout(location = 0) in vec4 a_position;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_imageAspectRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

out vec2 v_objectUV;
out vec2 v_objectBoxSize;
out vec2 v_responsiveUV;
out vec2 v_responsiveBoxGivenSize;
out vec2 v_patternUV;
out vec2 v_patternBoxSize;
out vec2 v_imageUV;

vec3 getBoxSize(float boxRatio, vec2 givenBoxSize) {
  vec2 box = vec2(0.);
  // fit = none
  box.x = boxRatio * min(givenBoxSize.x / boxRatio, givenBoxSize.y);
  float noFitBoxWidth = box.x;
  if (u_fit == 1.) { // fit = contain
    box.x = boxRatio * min(u_resolution.x / boxRatio, u_resolution.y);
  } else if (u_fit == 2.) { // fit = cover
    box.x = boxRatio * max(u_resolution.x / boxRatio, u_resolution.y);
  }
  box.y = box.x / boxRatio;
  return vec3(box, noFitBoxWidth);
}

void main() {
  gl_Position = a_position;

  vec2 uv = gl_Position.xy * .5;
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  float r = u_rotation * 3.14159265358979323846 / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);


  // ===================================================

  float fixedRatio = 1.;
  vec2 fixedRatioBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );

  v_objectBoxSize = getBoxSize(fixedRatio, fixedRatioBoxGivenSize).xy;
  vec2 objectWorldScale = u_resolution.xy / v_objectBoxSize;

  v_objectUV = uv;
  v_objectUV *= objectWorldScale;
  v_objectUV += boxOrigin * (objectWorldScale - 1.);
  v_objectUV += graphicOffset;
  v_objectUV /= u_scale;
  v_objectUV = graphicRotation * v_objectUV;

  // ===================================================

  v_responsiveBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  float responsiveRatio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
  vec2 responsiveBoxSize = getBoxSize(responsiveRatio, v_responsiveBoxGivenSize).xy;
  vec2 responsiveBoxScale = u_resolution.xy / responsiveBoxSize;

  #ifdef ADD_HELPERS
  v_responsiveHelperBox = uv;
  v_responsiveHelperBox *= responsiveBoxScale;
  v_responsiveHelperBox += boxOrigin * (responsiveBoxScale - 1.);
  #endif

  v_responsiveUV = uv;
  v_responsiveUV *= responsiveBoxScale;
  v_responsiveUV += boxOrigin * (responsiveBoxScale - 1.);
  v_responsiveUV += graphicOffset;
  v_responsiveUV /= u_scale;
  v_responsiveUV.x *= responsiveRatio;
  v_responsiveUV = graphicRotation * v_responsiveUV;
  v_responsiveUV.x /= responsiveRatio;

  // ===================================================

  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 patternBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  patternBoxRatio = patternBoxGivenSize.x / patternBoxGivenSize.y;

  vec3 boxSizeData = getBoxSize(patternBoxRatio, patternBoxGivenSize);
  v_patternBoxSize = boxSizeData.xy;
  float patternBoxNoFitBoxWidth = boxSizeData.z;
  vec2 patternBoxScale = u_resolution.xy / v_patternBoxSize;

  v_patternUV = uv;
  v_patternUV += graphicOffset / patternBoxScale;
  v_patternUV += boxOrigin;
  v_patternUV -= boxOrigin / patternBoxScale;
  v_patternUV *= u_resolution.xy;
  v_patternUV /= u_pixelRatio;
  if (u_fit > 0.) {
    v_patternUV *= (patternBoxNoFitBoxWidth / v_patternBoxSize.x);
  }
  v_patternUV /= u_scale;
  v_patternUV = graphicRotation * v_patternUV;
  v_patternUV += boxOrigin / patternBoxScale;
  v_patternUV -= boxOrigin;
  // x100 is a default multiplier between vertex and fragmant shaders
  // we use it to avoid UV presision issues
  v_patternUV *= .01;

  // ===================================================

  vec2 imageBoxSize;
  if (u_fit == 1.) { // contain
    imageBoxSize.x = min(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else if (u_fit == 2.) { // cover
    imageBoxSize.x = max(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else {
    imageBoxSize.x = min(10.0, 10.0 / u_imageAspectRatio * u_imageAspectRatio);
  }
  imageBoxSize.y = imageBoxSize.x / u_imageAspectRatio;
  vec2 imageBoxScale = u_resolution.xy / imageBoxSize;

  v_imageUV = uv;
  v_imageUV *= imageBoxScale;
  v_imageUV += boxOrigin * (imageBoxScale - 1.);
  v_imageUV += graphicOffset;
  v_imageUV /= u_scale;
  v_imageUV.x *= u_imageAspectRatio;
  v_imageUV = graphicRotation * v_imageUV;
  v_imageUV.x /= u_imageAspectRatio;

  v_imageUV += .5;
  v_imageUV.y = 1. - v_imageUV.y;
}`,f=8294400;class g{parentElement;canvasElement;gl;program=null;uniformLocations={};fragmentShader;rafId=null;lastRenderTime=0;currentFrame=0;speed=0;currentSpeed=0;providedUniforms;mipmaps=[];hasBeenDisposed=!1;resolutionChanged=!0;textures=new Map;minPixelRatio;maxPixelCount;isSafari=(function(){let a=navigator.userAgent.toLowerCase();return a.includes("safari")&&!a.includes("chrome")&&!a.includes("android")})();uniformCache={};textureUnitMap=new Map;ownerDocument;constructor(a,b,c,d,e=0,g=0,h=2,j=f,k=[]){if(a?.nodeType===1)this.parentElement=a;else throw Error("Paper Shaders: parent element must be an HTMLElement");if(this.ownerDocument=a.ownerDocument,!this.ownerDocument.querySelector("style[data-paper-shader]")){let a=this.ownerDocument.createElement("style");a.innerHTML=i,a.setAttribute("data-paper-shader",""),this.ownerDocument.head.prepend(a)}let l=this.ownerDocument.createElement("canvas");this.canvasElement=l,this.parentElement.prepend(l),this.fragmentShader=b,this.providedUniforms=c,this.mipmaps=k,this.currentFrame=g,this.minPixelRatio=h,this.maxPixelCount=j;let m=l.getContext("webgl2",d);if(!m)throw Error("Paper Shaders: WebGL is not supported in this browser");this.gl=m,this.initProgram(),this.setupPositionAttribute(),this.setupUniforms(),this.setUniformValues(this.providedUniforms),this.setupResizeObserver(),visualViewport?.addEventListener("resize",this.handleVisualViewportChange),this.setSpeed(e),this.parentElement.setAttribute("data-paper-shader",""),this.parentElement.paperShaderMount=this,this.ownerDocument.addEventListener("visibilitychange",this.handleDocumentVisibilityChange)}initProgram=()=>{let a=function(a,b,c){let d=a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.MEDIUM_FLOAT),e=d?d.precision:null;e&&e<23&&(b=b.replace(/precision\s+(lowp|mediump)\s+float;/g,"precision highp float;"),c=c.replace(/precision\s+(lowp|mediump)\s+float/g,"precision highp float").replace(/\b(uniform|varying|attribute)\s+(lowp|mediump)\s+(\w+)/g,"$1 highp $3"));let f=h(a,a.VERTEX_SHADER,b),g=h(a,a.FRAGMENT_SHADER,c);if(!f||!g)return null;let i=a.createProgram();return i?(a.attachShader(i,f),a.attachShader(i,g),a.linkProgram(i),a.getProgramParameter(i,a.LINK_STATUS))?(a.detachShader(i,f),a.detachShader(i,g),a.deleteShader(f),a.deleteShader(g),i):(console.error("Unable to initialize the shader program: "+a.getProgramInfoLog(i)),a.deleteProgram(i),a.deleteShader(f),a.deleteShader(g),null):null}(this.gl,e,this.fragmentShader);a&&(this.program=a)};setupPositionAttribute=()=>{let a=this.gl.getAttribLocation(this.program,"a_position"),b=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,b),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),this.gl.STATIC_DRAW),this.gl.enableVertexAttribArray(a),this.gl.vertexAttribPointer(a,2,this.gl.FLOAT,!1,0,0)};setupUniforms=()=>{let a={u_time:this.gl.getUniformLocation(this.program,"u_time"),u_pixelRatio:this.gl.getUniformLocation(this.program,"u_pixelRatio"),u_resolution:this.gl.getUniformLocation(this.program,"u_resolution")};Object.entries(this.providedUniforms).forEach(([b,c])=>{if(a[b]=this.gl.getUniformLocation(this.program,b),c instanceof HTMLImageElement){let c=`${b}AspectRatio`;a[c]=this.gl.getUniformLocation(this.program,c)}}),this.uniformLocations=a};renderScale=1;parentWidth=0;parentHeight=0;parentDevicePixelWidth=0;parentDevicePixelHeight=0;devicePixelsSupported=!1;resizeObserver=null;setupResizeObserver=()=>{this.resizeObserver=new ResizeObserver(([a])=>{if(a?.borderBoxSize[0]){let b=a.devicePixelContentBoxSize?.[0];void 0!==b&&(this.devicePixelsSupported=!0,this.parentDevicePixelWidth=b.inlineSize,this.parentDevicePixelHeight=b.blockSize),this.parentWidth=a.borderBoxSize[0].inlineSize,this.parentHeight=a.borderBoxSize[0].blockSize}this.handleResize()}),this.resizeObserver.observe(this.parentElement)};handleVisualViewportChange=()=>{this.resizeObserver?.disconnect(),this.setupResizeObserver()};handleResize=()=>{let a=0,b=0,c=Math.max(1,window.devicePixelRatio),d=visualViewport?.scale??1;if(this.devicePixelsSupported){let e=Math.max(1,this.minPixelRatio/c);a=this.parentDevicePixelWidth*e*d,b=this.parentDevicePixelHeight*e*d}else{let e=Math.max(c,this.minPixelRatio)*d;this.isSafari&&(e*=Math.max(1,function(a){let b=visualViewport?.scale??1,c=visualViewport?.width??window.innerWidth,d=outerWidth/(b*c+(window.innerWidth-a.documentElement.clientWidth)),e=Math.round(100*d);return e%5==0?e/100:33===e?1/3:67===e?2/3:133===e?4/3:d}(this.ownerDocument))),a=Math.round(this.parentWidth)*e,b=Math.round(this.parentHeight)*e}let e=Math.min(1,Math.sqrt(this.maxPixelCount)/Math.sqrt(a*b)),f=Math.round(a*e),g=Math.round(b*e),h=f/Math.round(this.parentWidth);(this.canvasElement.width!==f||this.canvasElement.height!==g||this.renderScale!==h)&&(this.renderScale=h,this.canvasElement.width=f,this.canvasElement.height=g,this.resolutionChanged=!0,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.render(performance.now()))};render=a=>{if(this.hasBeenDisposed)return;if(null===this.program)return void console.warn("Tried to render before program or gl was initialized");let b=a-this.lastRenderTime;this.lastRenderTime=a,0!==this.currentSpeed&&(this.currentFrame+=b*this.currentSpeed),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.useProgram(this.program),this.gl.uniform1f(this.uniformLocations.u_time,.001*this.currentFrame),this.resolutionChanged&&(this.gl.uniform2f(this.uniformLocations.u_resolution,this.gl.canvas.width,this.gl.canvas.height),this.gl.uniform1f(this.uniformLocations.u_pixelRatio,this.renderScale),this.resolutionChanged=!1),this.gl.drawArrays(this.gl.TRIANGLES,0,6),0!==this.currentSpeed?this.requestRender():this.rafId=null};requestRender=()=>{null!==this.rafId&&cancelAnimationFrame(this.rafId),this.rafId=requestAnimationFrame(this.render)};setTextureUniform=(a,b)=>{if(!b.complete||0===b.naturalWidth)throw Error(`Paper Shaders: image for uniform ${a} must be fully loaded`);let c=this.textures.get(a);c&&this.gl.deleteTexture(c),this.textureUnitMap.has(a)||this.textureUnitMap.set(a,this.textureUnitMap.size);let d=this.textureUnitMap.get(a);this.gl.activeTexture(this.gl.TEXTURE0+d);let e=this.gl.createTexture();this.gl.bindTexture(this.gl.TEXTURE_2D,e),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,b),this.mipmaps.includes(a)&&(this.gl.generateMipmap(this.gl.TEXTURE_2D),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR_MIPMAP_LINEAR));let f=this.gl.getError();if(f!==this.gl.NO_ERROR||null===e)return void console.error("Paper Shaders: WebGL error when uploading texture:",f);this.textures.set(a,e);let g=this.uniformLocations[a];if(g){this.gl.uniform1i(g,d);let c=`${a}AspectRatio`,e=this.uniformLocations[c];if(e){let a=b.naturalWidth/b.naturalHeight;this.gl.uniform1f(e,a)}}};areUniformValuesEqual=(a,b)=>a===b||!!(Array.isArray(a)&&Array.isArray(b))&&a.length===b.length&&a.every((a,c)=>this.areUniformValuesEqual(a,b[c]));setUniformValues=a=>{this.gl.useProgram(this.program),Object.entries(a).forEach(([a,b])=>{let c=b;if(b instanceof HTMLImageElement&&(c=`${b.src.slice(0,200)}|${b.naturalWidth}x${b.naturalHeight}`),this.areUniformValuesEqual(this.uniformCache[a],c))return;this.uniformCache[a]=c;let d=this.uniformLocations[a];if(!d)return void console.warn(`Uniform location for ${a} not found`);if(b instanceof HTMLImageElement)this.setTextureUniform(a,b);else if(Array.isArray(b)){let c=null,e=null;if(void 0!==b[0]&&Array.isArray(b[0])){let d=b[0].length;if(!b.every(a=>a.length===d))return void console.warn(`All child arrays must be the same length for ${a}`);c=b.flat(),e=d}else e=(c=b).length;switch(e){case 2:this.gl.uniform2fv(d,c);break;case 3:this.gl.uniform3fv(d,c);break;case 4:this.gl.uniform4fv(d,c);break;case 9:this.gl.uniformMatrix3fv(d,!1,c);break;case 16:this.gl.uniformMatrix4fv(d,!1,c);break;default:console.warn(`Unsupported uniform array length: ${e}`)}}else"number"==typeof b?this.gl.uniform1f(d,b):"boolean"==typeof b?this.gl.uniform1i(d,+!!b):console.warn(`Unsupported uniform type for ${a}: ${typeof b}`)})};getCurrentFrame=()=>this.currentFrame;setFrame=a=>{this.currentFrame=a,this.lastRenderTime=performance.now(),this.render(performance.now())};setSpeed=(a=1)=>{this.speed=a,this.setCurrentSpeed(this.ownerDocument.hidden?0:a)};setCurrentSpeed=a=>{this.currentSpeed=a,null===this.rafId&&0!==a&&(this.lastRenderTime=performance.now(),this.rafId=requestAnimationFrame(this.render)),null!==this.rafId&&0===a&&(cancelAnimationFrame(this.rafId),this.rafId=null)};setMaxPixelCount=(a=f)=>{this.maxPixelCount=a,this.handleResize()};setMinPixelRatio=(a=2)=>{this.minPixelRatio=a,this.handleResize()};setUniforms=a=>{this.setUniformValues(a),this.providedUniforms={...this.providedUniforms,...a},this.render(performance.now())};handleDocumentVisibilityChange=()=>{this.setCurrentSpeed(this.ownerDocument.hidden?0:this.speed)};dispose=()=>{this.hasBeenDisposed=!0,null!==this.rafId&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.gl&&this.program&&(this.textures.forEach(a=>{this.gl.deleteTexture(a)}),this.textures.clear(),this.gl.deleteProgram(this.program),this.program=null,this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,null),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.getError()),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),visualViewport?.removeEventListener("resize",this.handleVisualViewportChange),this.ownerDocument.removeEventListener("visibilitychange",this.handleDocumentVisibilityChange),this.uniformLocations={},this.canvasElement.remove(),delete this.parentElement.paperShaderMount}}function h(a,b,c){let d=a.createShader(b);return d?(a.shaderSource(d,c),a.compileShader(d),a.getShaderParameter(d,a.COMPILE_STATUS))?d:(console.error("An error occurred compiling the shaders: "+a.getShaderInfoLog(d)),a.deleteShader(d),null):null}let i=`@layer paper-shaders {
  :where([data-paper-shader]) {
    isolation: isolate;
    position: relative;

    & canvas {
      contain: strict;
      display: block;
      position: absolute;
      inset: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      corner-shape: inherit;
    }
  }
}`;function j(a){if(a.naturalWidth<1024&&a.naturalHeight<1024){if(a.naturalWidth<1||a.naturalHeight<1)return;let b=a.naturalWidth/a.naturalHeight;a.width=Math.round(b>1?1024*b:1024),a.height=Math.round(b>1?1024:1024/b)}}var k=c(45262);async function l(a){let b={},c=[];return Object.entries(a).forEach(([a,d])=>{if("string"==typeof d){let e=d||"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";if(!(a=>{try{if(a.startsWith("/"))return!0;return new URL(a),!0}catch{return!1}})(e))return void console.warn(`Uniform "${a}" has invalid URL "${e}". Skipping image loading.`);let f=new Promise((c,d)=>{let f=new Image;(a=>{try{if(a.startsWith("/"))return!1;return new URL(a,window.location.origin).origin!==window.location.origin}catch{return!1}})(e)&&(f.crossOrigin="anonymous"),f.onload=()=>{j(f),b[a]=f,c()},f.onerror=()=>{console.error(`Could not set uniforms. Failed to load image at ${e}`),d()},f.src=e});c.push(f)}else d instanceof HTMLImageElement&&j(d),b[a]=d}),await Promise.all(c),b}let m=(0,d.forwardRef)(function({fragmentShader:a,uniforms:b,webGlContextAttributes:c,speed:e=0,frame:f=0,width:h,height:i,minPixelRatio:j,maxPixelCount:m,mipmaps:n,style:o,...p},q){let[r,s]=(0,d.useState)(!1),t=(0,d.useRef)(null),u=(0,d.useRef)(null),v=(0,d.useRef)(c);(0,d.useEffect)(()=>((async()=>{let c=await l(b);t.current&&!u.current&&(u.current=new g(t.current,a,c,v.current,e,f,j,m,n),s(!0))})(),()=>{u.current?.dispose(),u.current=null}),[a]),(0,d.useEffect)(()=>{let a=!1;return(async()=>{let c=await l(b);a||u.current?.setUniforms(c)})(),()=>{a=!0}},[b,r]),(0,d.useEffect)(()=>{u.current?.setSpeed(e)},[e,r]),(0,d.useEffect)(()=>{u.current?.setMaxPixelCount(m)},[m,r]),(0,d.useEffect)(()=>{u.current?.setMinPixelRatio(j)},[j,r]),(0,d.useEffect)(()=>{u.current?.setFrame(f)},[f,r]);let w=function(a){let b=d.useRef(void 0),c=d.useCallback(b=>{let c=a.map(a=>{if(null!=a){if("function"==typeof a){let c=a(b);return"function"==typeof c?c:()=>{a(null)}}return a.current=b,()=>{a.current=null}}});return()=>{c.forEach(a=>a?.())}},a);return d.useMemo(()=>a.every(a=>null==a)?null:a=>{b.current&&(b.current(),b.current=void 0),null!=a&&(b.current=c(a))},a)}([t,q]);return(0,k.jsx)("div",{ref:w,style:void 0!==h||void 0!==i?{width:"string"==typeof h&&!1===isNaN(+h)?+h:h,height:"string"==typeof i&&!1===isNaN(+i)?+i:i,...o}:o,...p})});m.displayName="ShaderMount"},47176:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0}),Object.defineProperty(b,"default",{enumerable:!0,get:function(){return j}});let d=c(5136),e=c(86449),f=c(59011),g=c(53550);function h(a){return{default:a&&"default"in a?a.default:a}}let i={loader:()=>Promise.resolve(h(()=>null)),loading:null,ssr:!0},j=function(a){let b={...i,...a},c=(0,e.lazy)(()=>b.loader().then(h)),j=b.loading;function k(a){let h=j?(0,d.jsx)(j,{isLoading:!0,pastDelay:!0,error:null}):null,i=!b.ssr||!!b.loading,k=i?e.Suspense:e.Fragment,l=b.ssr?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(g.PreloadChunks,{moduleIds:b.modules}),(0,d.jsx)(c,{...a})]}):(0,d.jsx)(f.BailoutToCSR,{reason:"next/dynamic",children:(0,d.jsx)(c,{...a})});return(0,d.jsx)(k,{...i?{fallback:h}:{},children:l})}return k.displayName="LoadableComponent",k}},47526:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("clock-3",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 6v6h4",key:"135r8i"}]])},47557:(a,b,c)=>{"use strict";c.d(b,{uz:()=>m});var d=c(22495),e=c(46452),f=c(82247),g=c(46090),h=c(40141),i=c(6983);let j=`#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_pixelRatio;

uniform vec4 u_colorFront;
uniform vec4 u_colorMid;
uniform vec4 u_colorBack;
uniform float u_brightness;
uniform float u_contrast;

in vec2 v_patternUV;

out vec4 fragColor;

${i.ZB}

float neuroShape(vec2 uv, float t) {
  vec2 sine_acc = vec2(0.);
  vec2 res = vec2(0.);
  float scale = 8.;

  for (int j = 0; j < 15; j++) {
    uv = rotate(uv, 1.);
    sine_acc = rotate(sine_acc, 1.);
    vec2 layer = uv * scale + float(j) + sine_acc - t;
    sine_acc += sin(layer);
    res += (.5 + .5 * cos(layer)) / scale;
    scale *= (1.2);
  }
  return res.x + res.y;
}

void main() {
  vec2 shape_uv = v_patternUV;
  shape_uv *= .13;

  float t = .5 * u_time;

  float noise = neuroShape(shape_uv, t);

  noise = (1. + u_brightness) * noise * noise;
  noise = pow(noise, .7 + 6. * u_contrast);
  noise = min(1.4, noise);

  float blend = smoothstep(0.7, 1.4, noise);

  vec4 frontC = u_colorFront;
  frontC.rgb *= frontC.a;
  vec4 midC = u_colorMid;
  midC.rgb *= midC.a;
  vec4 blendFront = mix(midC, frontC, blend);

  float safeNoise = max(noise, 0.0);
  vec3 color = blendFront.rgb * safeNoise;
  float opacity = clamp(blendFront.a * safeNoise, 0., 1.);

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1. - opacity);
  opacity = opacity + u_colorBack.a * (1. - opacity);

  ${i.Km}

  fragColor = vec4(color, opacity);
}
`;var k=c(45262);let l={name:"Default",params:{...g.OZ,speed:1,frame:0,colorFront:"#ffffff",colorMid:"#47a6ff",colorBack:"#000000",brightness:.05,contrast:.3}};g.OZ,g.OZ,g.OZ;let m=(0,d.memo)(function({speed:a=l.params.speed,frame:b=l.params.frame,colorFront:c=l.params.colorFront,colorMid:d=l.params.colorMid,colorBack:f=l.params.colorBack,brightness:i=l.params.brightness,contrast:m=l.params.contrast,fit:n=l.params.fit,scale:o=l.params.scale,rotation:p=l.params.rotation,originX:q=l.params.originX,originY:r=l.params.originY,offsetX:s=l.params.offsetX,offsetY:t=l.params.offsetY,worldWidth:u=l.params.worldWidth,worldHeight:v=l.params.worldHeight,...w}){let x={u_colorFront:(0,h.G)(c),u_colorMid:(0,h.G)(d),u_colorBack:(0,h.G)(f),u_brightness:i,u_contrast:m,u_fit:g.Tk[n],u_scale:o,u_rotation:p,u_offsetX:s,u_offsetY:t,u_originX:q,u_originY:r,u_worldWidth:u,u_worldHeight:v};return(0,k.jsx)(e.f,{...w,speed:a,frame:b,fragmentShader:j,uniforms:x})},f.q)},48185:(a,b,c)=>{"use strict";c.d(b,{default:()=>e.a});var d=c(90336),e=c.n(d)},48637:(a,b,c)=>{"use strict";c.d(b,{An:()=>m});var d=c(22495),e=c(46452),f=c(82247),g=c(46090),h=c(40141),i=c(6983);let j=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colorBack;
uniform vec4 u_colorFront;
uniform float u_density;
uniform float u_distortion;
uniform float u_strokeWidth;
uniform float u_strokeCap;
uniform float u_strokeTaper;
uniform float u_noise;
uniform float u_noiseFrequency;
uniform float u_softness;

in vec2 v_patternUV;

out vec4 fragColor;

${i.ES}
${i.V2}

void main() {
  vec2 uv = 2. * v_patternUV;

  float t = u_time;
  float l = length(uv);
  float density = clamp(u_density, 0., 1.);
  l = pow(max(l, 1e-6), density);
  float angle = atan(uv.y, uv.x) - t;
  float angleNormalised = angle / TWO_PI;

  angleNormalised += .125 * u_noise * snoise(16. * pow(u_noiseFrequency, 3.) * uv);

  float offset = l + angleNormalised;
  offset -= u_distortion * (sin(4. * l - .5 * t) * cos(PI + l + .5 * t));
  float stripe = fract(offset);

  float shape = 2. * abs(stripe - .5);
  float width = 1. - clamp(u_strokeWidth, .005 * u_strokeTaper, 1.);


  float wCap = mix(width, (1. - stripe) * (1. - step(.5, stripe)), (1. - clamp(l, 0., 1.)));
  width = mix(width, wCap, u_strokeCap);
  width *= (1. - clamp(u_strokeTaper, 0., 1.) * l);

  float fw = fwidth(offset);
  float fwMult = 4. - 3. * (smoothstep(.05, .4, 2. * u_strokeWidth) * smoothstep(.05, .4, 2. * (1. - u_strokeWidth)));
  float pixelSize = mix(fwMult * fw, fwidth(shape), clamp(fw, 0., 1.));
  pixelSize = mix(pixelSize, .002, u_strokeCap * (1. - clamp(l, 0., 1.)));

  float res = smoothstep(width - pixelSize - u_softness, width + pixelSize + u_softness, shape);

  vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
  float fgOpacity = u_colorFront.a;
  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  float bgOpacity = u_colorBack.a;

  vec3 color = fgColor * res;
  float opacity = fgOpacity * res;

  color += bgColor * (1. - opacity);
  opacity += bgOpacity * (1. - opacity);

  ${i.Km}

  fragColor = vec4(color, opacity);
}
`;var k=c(45262);let l={name:"Default",params:{...g.OZ,scale:1,colorBack:"#001429",colorFront:"#79D1FF",density:1,distortion:0,strokeWidth:.5,strokeTaper:0,strokeCap:0,noise:0,noiseFrequency:0,softness:0,speed:1,frame:0}};g.OZ,g.OZ,g.OZ;let m=(0,d.memo)(function({speed:a=l.params.speed,frame:b=l.params.frame,colorBack:c=l.params.colorBack,colorFront:d=l.params.colorFront,density:f=l.params.density,distortion:i=l.params.distortion,strokeWidth:m=l.params.strokeWidth,strokeTaper:n=l.params.strokeTaper,strokeCap:o=l.params.strokeCap,noiseFrequency:p=l.params.noiseFrequency,noise:q=l.params.noise,softness:r=l.params.softness,fit:s=l.params.fit,rotation:t=l.params.rotation,scale:u=l.params.scale,originX:v=l.params.originX,originY:w=l.params.originY,offsetX:x=l.params.offsetX,offsetY:y=l.params.offsetY,worldWidth:z=l.params.worldWidth,worldHeight:A=l.params.worldHeight,...B}){let C={u_colorBack:(0,h.G)(c),u_colorFront:(0,h.G)(d),u_density:f,u_distortion:i,u_strokeWidth:m,u_strokeTaper:n,u_strokeCap:o,u_noiseFrequency:p,u_noise:q,u_softness:r,u_fit:g.Tk[s],u_scale:u,u_rotation:t,u_offsetX:x,u_offsetY:y,u_originX:v,u_originY:w,u_worldWidth:z,u_worldHeight:A};return(0,k.jsx)(e.f,{...B,speed:a,frame:b,fragmentShader:j,uniforms:C})},f.q)},49028:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("phone-off",[["path",{d:"M10.1 13.9a14 14 0 0 0 3.732 2.668 1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2 18 18 0 0 1-12.728-5.272",key:"1wngk7"}],["path",{d:"M22 2 2 22",key:"y4kqgn"}],["path",{d:"M4.76 13.582A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 .244.473",key:"10hv5p"}]])},52909:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("sparkles",[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]])},53550:(a,b,c)=>{let{createProxy:d}=c(40339);a.exports=d("/home/runner/workspace/node_modules/.pnpm/next@15.5.20_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/shared/lib/lazy-dynamic/preload-chunks.js")},55050:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("images",[["path",{d:"m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16",key:"9kzy35"}],["path",{d:"M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2",key:"1t0f0t"}],["circle",{cx:"13",cy:"7",r:"1",fill:"currentColor",key:"1obus6"}],["rect",{x:"8",y:"2",width:"14",height:"14",rx:"2",key:"1gvhby"}]])},57817:(a,b,c)=>{"use strict";c.d(b,{le:()=>o});var d=c(22495),e=c(46452),f=c(82247),g=c(46090),h=c(40141),i=c(32149),j=c(6983);let k={maxColorCount:5},l=`#version 300 es
precision mediump float;

uniform float u_time;

uniform float u_scale;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colors[${k.maxColorCount}];
uniform float u_colorsCount;

uniform float u_stepsPerColor;
uniform vec4 u_colorGlow;
uniform vec4 u_colorGap;
uniform float u_distortion;
uniform float u_gap;
uniform float u_glow;

in vec2 v_patternUV;

out vec4 fragColor;

${j.ES}
${j.CJ}

vec4 voronoi(vec2 x, float t) {
  vec2 ip = floor(x);
  vec2 fp = fract(x);

  vec2 mg, mr;
  float md = 8.;
  float rand = 0.;

  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 o = randomGB(ip + g);
      float raw_hash = o.x;
      o = .5 + u_distortion * sin(t + TWO_PI * o);
      vec2 r = g + o - fp;
      float d = dot(r, r);

      if (d < md) {
        md = d;
        mr = r;
        mg = g;
        rand = raw_hash;
      }
    }
  }

  md = 8.;
  for (int j = -2; j <= 2; j++) {
    for (int i = -2; i <= 2; i++) {
      vec2 g = mg + vec2(float(i), float(j));
      vec2 o = randomGB(ip + g);
      o = .5 + u_distortion * sin(t + TWO_PI * o);
      vec2 r = g + o - fp;
      if (dot(mr - r, mr - r) > .00001) {
        md = min(md, dot(.5 * (mr + r), normalize(r - mr)));
      }
    }
  }

  return vec4(md, mr, rand);
}

void main() {
  vec2 shape_uv = v_patternUV;
  shape_uv *= 1.25;

  float t = u_time;

  vec4 voronoiRes = voronoi(shape_uv, t);

  float shape = clamp(voronoiRes.w, 0., 1.);
  float mixer = shape * (u_colorsCount - 1.);
  mixer = (shape - .5 / u_colorsCount) * u_colorsCount;
  float steps = max(1., u_stepsPerColor);

  vec4 gradient = u_colors[0];
  gradient.rgb *= gradient.a;
  for (int i = 1; i < ${k.maxColorCount}; i++) {
    if (i >= int(u_colorsCount)) break;
    float localT = clamp(mixer - float(i - 1), 0.0, 1.0);
    localT = round(localT * steps) / steps;
    vec4 c = u_colors[i];
    c.rgb *= c.a;
    gradient = mix(gradient, c, localT);
  }

  if ((mixer < 0.) || (mixer > (u_colorsCount - 1.))) {
    float localT = mixer + 1.;
    if (mixer > (u_colorsCount - 1.)) {
      localT = mixer - (u_colorsCount - 1.);
    }
    localT = round(localT * steps) / steps;
    vec4 cFst = u_colors[0];
    cFst.rgb *= cFst.a;
    vec4 cLast = u_colors[int(u_colorsCount - 1.)];
    cLast.rgb *= cLast.a;
    gradient = mix(cLast, cFst, localT);
  }

  vec3 cellColor = gradient.rgb;
  float cellOpacity = gradient.a;

  float glows = length(voronoiRes.yz * u_glow);
  glows = pow(glows, 1.5);

  vec3 color = mix(cellColor, u_colorGlow.rgb * u_colorGlow.a, u_colorGlow.a * glows);
  float opacity = cellOpacity + u_colorGlow.a * glows;

  float edge = voronoiRes.x;
  float smoothEdge = .02 / (2. * u_scale) * (1. + .5 * u_gap);
  edge = smoothstep(u_gap - smoothEdge, u_gap + smoothEdge, edge);

  color = mix(u_colorGap.rgb * u_colorGap.a, color, edge);
  opacity = mix(u_colorGap.a, opacity, edge);

  fragColor = vec4(color, opacity);
}
`;var m=c(45262);let n={name:"Default",params:{...g.OZ,speed:.5,frame:0,colors:["#ff8247","#ffe53d"],stepsPerColor:3,colorGlow:"#ffffff",colorGap:"#2e0000",distortion:.4,gap:.04,glow:0,scale:.5}};g.OZ,g.OZ,g.OZ;let o=(0,d.memo)(function({speed:a=n.params.speed,frame:b=n.params.frame,colors:c=n.params.colors,stepsPerColor:d=n.params.stepsPerColor,colorGlow:f=n.params.colorGlow,colorGap:j=n.params.colorGap,distortion:k=n.params.distortion,gap:o=n.params.gap,glow:p=n.params.glow,fit:q=n.params.fit,scale:r=n.params.scale,rotation:s=n.params.rotation,originX:t=n.params.originX,originY:u=n.params.originY,offsetX:v=n.params.offsetX,offsetY:w=n.params.offsetY,worldWidth:x=n.params.worldWidth,worldHeight:y=n.params.worldHeight,...z}){let A={u_colors:c.map(h.G),u_colorsCount:c.length,u_stepsPerColor:d,u_colorGlow:(0,h.G)(f),u_colorGap:(0,h.G)(j),u_distortion:k,u_gap:o,u_glow:p,u_noiseTexture:(0,i.R)(),u_fit:g.Tk[q],u_scale:r,u_rotation:s,u_offsetX:v,u_offsetY:w,u_originX:t,u_originY:u,u_worldWidth:x,u_worldHeight:y};return(0,m.jsx)(e.f,{...z,speed:a,frame:b,fragmentShader:l,uniforms:A})},f.q)},57985:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("gauge",[["path",{d:"m12 14 4-4",key:"9kzdfg"}],["path",{d:"M3.34 19a10 10 0 1 1 17.32 0",key:"19p75a"}]])},58623:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("arrow-up",[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]])},58760:(a,b,c)=>{"use strict";c.d(b,{EJ:()=>m});var d=c(22495),e=c(46452),f=c(82247),g=c(46090),h=c(40141),i=c(6983);let j=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colorBack;
uniform vec4 u_colorHighlight;

uniform sampler2D u_image;
uniform float u_imageAspectRatio;

uniform float u_size;
uniform float u_highlights;
uniform float u_layering;
uniform float u_edges;
uniform float u_caustic;
uniform float u_waves;

in vec2 v_imageUV;

out vec4 fragColor;

${i.ES}
${i.ZB}
${i.V2}

float getUvFrame(vec2 uv) {
  float aax = 2. * fwidth(uv.x);
  float aay = 2. * fwidth(uv.y);

  float left   = smoothstep(0., aax, uv.x);
  float right = 1.0 - smoothstep(1. - aax, 1., uv.x);
  float bottom = smoothstep(0., aay, uv.y);
  float top = 1.0 - smoothstep(1. - aay, 1., uv.y);

  return left * right * bottom * top;
}

mat2 rotate2D(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

float getCausticNoise(vec2 uv, float t, float scale) {
  vec2 n = vec2(.1);
  vec2 N = vec2(.1);
  mat2 m = rotate2D(.5);
  for (int j = 0; j < 6; j++) {
    uv *= m;
    n *= m;
    vec2 q = uv * scale + float(j) + n + (.5 + .5 * float(j)) * (mod(float(j), 2.) - 1.) * t;
    n += sin(q);
    N += cos(q) / scale;
    scale *= 1.1;
  }
  return (N.x + N.y + 1.);
}

void main() {
  vec2 imageUV = v_imageUV;
  vec2 patternUV = v_imageUV - .5;
  patternUV = (patternUV * vec2(u_imageAspectRatio, 1.));
  patternUV /= (.01 + .09 * u_size);

  float t = u_time;

  float wavesNoise = snoise((.3 + .1 * sin(t)) * .1 * patternUV + vec2(0., .4 * t));

  float causticNoise = getCausticNoise(patternUV + u_waves * vec2(1., -1.) * wavesNoise, 2. * t, 1.5);

  causticNoise += u_layering * getCausticNoise(patternUV + 2. * u_waves * vec2(1., -1.) * wavesNoise, 1.5 * t, 2.);
  causticNoise = causticNoise * causticNoise;

  float edgesDistortion = smoothstep(0., .1, imageUV.x);
  edgesDistortion *= smoothstep(0., .1, imageUV.y);
  edgesDistortion *= (smoothstep(1., 1.1, imageUV.x) + (1.0 - smoothstep(.8, .95, imageUV.x)));
  edgesDistortion *= (1.0 - smoothstep(.9, 1., imageUV.y));
  edgesDistortion = mix(edgesDistortion, 1., u_edges);

  float causticNoiseDistortion = .02 * causticNoise * edgesDistortion;

  float wavesDistortion = .1 * u_waves * wavesNoise;

  imageUV += vec2(wavesDistortion, -wavesDistortion);
  imageUV += (u_caustic * causticNoiseDistortion);

  float frame = getUvFrame(imageUV);

  vec4 image = texture(u_image, imageUV);
  vec4 backColor = u_colorBack;
  backColor.rgb *= backColor.a;

  vec3 color = mix(backColor.rgb, image.rgb, image.a * frame);
  float opacity = backColor.a + image.a * frame;

  causticNoise = max(-.2, causticNoise);

  float hightlight = .025 * u_highlights * causticNoise;
  hightlight *= u_colorHighlight.a;
  color = mix(color, u_colorHighlight.rgb, .05 * u_highlights * causticNoise);
  opacity += hightlight;

  color += hightlight * (.5 + .5 * wavesNoise);
  opacity += hightlight * (.5 + .5 * wavesNoise);

  opacity = clamp(opacity, 0., 1.);

  fragColor = vec4(color, opacity);
}
`;var k=c(45262);let l={name:"Default",params:{...g.J7,scale:.8,speed:1,frame:0,colorBack:"#909090",colorHighlight:"#ffffff",highlights:.07,layering:.5,edges:.8,waves:.3,caustic:.1,size:1}};g.J7,g.J7,g.J7;let m=(0,d.memo)(function({speed:a=l.params.speed,frame:b=l.params.frame,colorBack:c=l.params.colorBack,colorHighlight:d=l.params.colorHighlight,image:f="",highlights:i=l.params.highlights,layering:m=l.params.layering,waves:n=l.params.waves,edges:o=l.params.edges,caustic:p=l.params.caustic,effectScale:q,size:r=void 0===q?l.params.size:10/9/q-1/9,fit:s=l.params.fit,scale:t=l.params.scale,rotation:u=l.params.rotation,originX:v=l.params.originX,originY:w=l.params.originY,offsetX:x=l.params.offsetX,offsetY:y=l.params.offsetY,worldWidth:z=l.params.worldWidth,worldHeight:A=l.params.worldHeight,...B}){let C={u_image:f,u_colorBack:(0,h.G)(c),u_colorHighlight:(0,h.G)(d),u_highlights:i,u_layering:m,u_waves:n,u_edges:o,u_caustic:p,u_size:r,u_fit:g.Tk[s],u_rotation:u,u_scale:t,u_offsetX:x,u_offsetY:y,u_originX:v,u_originY:w,u_worldWidth:z,u_worldHeight:A};return(0,k.jsx)(e.f,{...B,speed:a,frame:b,fragmentShader:j,mipmaps:["u_image"],uniforms:C})},f.q)},58773:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("arrow-down-to-line",[["path",{d:"M12 17V3",key:"1cwfxf"}],["path",{d:"m6 11 6 6 6-6",key:"12ii2o"}],["path",{d:"M19 21H5",key:"150jfl"}]])},59011:(a,b,c)=>{let{createProxy:d}=c(40339);a.exports=d("/home/runner/workspace/node_modules/.pnpm/next@15.5.20_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/shared/lib/lazy-dynamic/dynamic-bailout-to-csr.js")},59173:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]])},59852:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]])},61470:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("megaphone",[["path",{d:"M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",key:"q8bfy3"}],["path",{d:"M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14",key:"1853fq"}],["path",{d:"M8 6v8",key:"15ugcq"}]])},61524:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("chevron-right",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]])},63764:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]])},63768:(a,b,c)=>{"use strict";c.d(b,{$8:()=>n});var d=c(22495),e=c(46452),f=c(82247),g=c(46090),h=c(40141),i=c(6983);let j={maxColorCount:7},k=`#version 300 es
precision lowp float;

uniform float u_time;
uniform mediump float u_scale;

uniform vec4 u_colors[${j.maxColorCount}];
uniform float u_colorsCount;
uniform vec4 u_colorBack;
uniform float u_density;
uniform float u_angle1;
uniform float u_angle2;
uniform float u_length;
uniform bool u_edges;
uniform float u_blur;
uniform float u_fadeIn;
uniform float u_fadeOut;
uniform float u_gradient;

in vec2 v_objectUV;

out vec4 fragColor;

${i.ES}

const float zLimit = .5;

vec2 getPanel(float angle, vec2 uv, float invLength, float aa) {
  float sinA = sin(angle);
  float cosA = cos(angle);

  float denom = sinA - uv.y * cosA;
  if (abs(denom) < .01) return vec2(0.);

  float z = uv.y / denom;

  if (z <= 0. || z > zLimit) return vec2(0.);

  float zRatio = z / zLimit;
  float panelMap = 1. - zRatio;
  float x = uv.x * (cosA * z + 1.) * invLength;

  float zOffset = zRatio - .5;
  float left = -.5 + zOffset * u_angle1;
  float right = .5 - zOffset * u_angle2;
  float blurX = aa + 2. * panelMap * u_blur;

  float leftEdge1 = left - blurX;
  float leftEdge2 = left + .25 * blurX;
  float rightEdge1 = right - .25 * blurX;
  float rightEdge2 = right + blurX;

  float panel = smoothstep(leftEdge1, leftEdge2, x) * (1.0 - smoothstep(rightEdge1, rightEdge2, x));
  panel *= mix(0., panel, smoothstep(0., .01 / max(u_scale, 1e-6), panelMap));

  float midScreen = abs(sinA);
  if (u_edges == true) {
    panelMap = mix(.99, panelMap, panel * clamp(panelMap / (.15 * (1. - pow(midScreen, .1))), 0.0, 1.0));
  } else if (midScreen < .07) {
    panel *= (midScreen * 15.);
  }

  return vec2(panel, panelMap);
}

vec4 blendColor(vec4 colorA, float panelMask, float panelMap) {
  float fade = 1. - smoothstep(.97 - .97 * u_fadeIn, 1., panelMap);

  fade *= smoothstep(-.2 * (1. - u_fadeOut), u_fadeOut, panelMap);

  vec3 blendedRGB = mix(vec3(0.), colorA.rgb, fade);
  float blendedAlpha = mix(0., colorA.a, fade);

  return vec4(blendedRGB, blendedAlpha) * panelMask;
}

void main() {
  vec2 uv = v_objectUV;
  uv *= 1.25;

  float t = .02 * u_time;
  t = fract(t);
  bool reverseTime = (t < 0.5);

  vec3 color = vec3(0.);
  float opacity = 0.;

  float aa = .005 / u_scale;
  int colorsCount = int(u_colorsCount);

  vec4 premultipliedColors[${j.maxColorCount}];
  for (int i = 0; i < ${j.maxColorCount}; i++) {
    if (i >= colorsCount) break;
    vec4 c = u_colors[i];
    c.rgb *= c.a;
    premultipliedColors[i] = c;
  }

  float invLength = 1.5 / max(u_length, .001);

  float totalColorWeight = 0.;
  int panelsNumber = 12;

  float densityNormalizer = 1.;
  if (colorsCount == 4) {
    panelsNumber = 16;
    densityNormalizer = 1.34;
  } else if (colorsCount == 5) {
    panelsNumber = 20;
    densityNormalizer = 1.67;
  } else if (colorsCount == 7) {
    panelsNumber = 14;
    densityNormalizer = 1.17;
  }

  float fPanelsNumber = float(panelsNumber);

  float totalPanelsShape = 0.;
  float panelGrad = 1. - clamp(u_gradient, 0., 1.);

  for (int set = 0; set < 2; set++) {
    bool isForward = (set == 0 && !reverseTime) || (set == 1 && reverseTime);
    if (!isForward) continue;

    for (int i = 0; i <= 20; i++) {
      if (i >= panelsNumber) break;

      int idx = panelsNumber - 1 - i;

      float offset = float(idx) / fPanelsNumber;
      if (set == 1) {
        offset += .5;
      }

      float densityFract = densityNormalizer * fract(t + offset);
      float angleNorm = densityFract / u_density;
      if (densityFract >= .5 || angleNorm >= .3) continue;

      float smoothDensity = clamp((.5 - densityFract) / .1, 0., 1.) * clamp(densityFract / .01, 0., 1.);
      float smoothAngle = clamp((.3 - angleNorm) / .05, 0., 1.);
      if (smoothDensity * smoothAngle < .001) continue;

      if (angleNorm > .5) {
        angleNorm = 0.5;
      }
      vec2 panel = getPanel(angleNorm * TWO_PI + PI, uv, invLength, aa);
      if (panel[0] <= .001) continue;
      float panelMask = panel[0] * smoothDensity * smoothAngle;
      float panelMap = panel[1];

      int colorIdx = idx % colorsCount;
      int nextColorIdx = (idx + 1) % colorsCount;

      vec4 colorA = premultipliedColors[colorIdx];
      vec4 colorB = premultipliedColors[nextColorIdx];

      colorA = mix(colorA, colorB, max(0., smoothstep(.0, .45, panelMap) - panelGrad));
      vec4 blended = blendColor(colorA, panelMask, panelMap);
      color = blended.rgb + color * (1. - blended.a);
      opacity = blended.a + opacity * (1. - blended.a);
    }


    for (int i = 0; i <= 20; i++) {
      if (i >= panelsNumber) break;

      int idx = panelsNumber - 1 - i;

      float offset = float(idx) / fPanelsNumber;
      if (set == 0) {
        offset += .5;
      }

      float densityFract = densityNormalizer * fract(-t + offset);
      float angleNorm = -densityFract / u_density;
      if (densityFract >= .5 || angleNorm < -.3) continue;

      float smoothDensity = clamp((.5 - densityFract) / .1, 0., 1.) * clamp(densityFract / .01, 0., 1.);
      float smoothAngle = clamp((angleNorm + .3) / .05, 0., 1.);
      if (smoothDensity * smoothAngle < .001) continue;

      vec2 panel = getPanel(angleNorm * TWO_PI + PI, uv, invLength, aa);
      float panelMask = panel[0] * smoothDensity * smoothAngle;
      if (panelMask <= .001) continue;
      float panelMap = panel[1];

      int colorIdx = (colorsCount - (idx % colorsCount)) % colorsCount;
      if (colorIdx < 0) colorIdx += colorsCount;
      int nextColorIdx = (colorIdx + 1) % colorsCount;

      vec4 colorA = premultipliedColors[colorIdx];
      vec4 colorB = premultipliedColors[nextColorIdx];

      colorA = mix(colorA, colorB, max(0., smoothstep(.0, .45, panelMap) - panelGrad));
      vec4 blended = blendColor(colorA, panelMask, panelMap);
      color = blended.rgb + color * (1. - blended.a);
      opacity = blended.a + opacity * (1. - blended.a);
    }
  }

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1.0 - opacity);
  opacity = opacity + u_colorBack.a * (1.0 - opacity);

  ${i.Km}

  fragColor = vec4(color, opacity);
}
`;var l=c(45262);let m={name:"Default",params:{...g.J7,speed:.5,frame:0,colors:["#ff9d00","#fd4f30","#809bff","#6d2eff","#333aff","#f15cff","#ffd557"],colorBack:"#000000",angle1:0,angle2:0,length:1.1,edges:!1,blur:0,fadeIn:1,fadeOut:.3,gradient:0,density:3,scale:.8}};g.J7,g.J7,g.J7;let n=(0,d.memo)(function({speed:a=m.params.speed,frame:b=m.params.frame,colors:c=m.params.colors,colorBack:d=m.params.colorBack,angle1:f=m.params.angle1,angle2:i=m.params.angle2,length:j=m.params.length,edges:n=m.params.edges,blur:o=m.params.blur,fadeIn:p=m.params.fadeIn,fadeOut:q=m.params.fadeOut,density:r=m.params.density,gradient:s=m.params.gradient,fit:t=m.params.fit,scale:u=m.params.scale,rotation:v=m.params.rotation,originX:w=m.params.originX,originY:x=m.params.originY,offsetX:y=m.params.offsetX,offsetY:z=m.params.offsetY,worldWidth:A=m.params.worldWidth,worldHeight:B=m.params.worldHeight,...C}){let D={u_colors:c.map(h.G),u_colorsCount:c.length,u_colorBack:(0,h.G)(d),u_angle1:f,u_angle2:i,u_length:j,u_edges:n,u_blur:o,u_fadeIn:p,u_fadeOut:q,u_density:r,u_gradient:s,u_fit:g.Tk[t],u_scale:u,u_rotation:v,u_offsetX:y,u_offsetY:z,u_originX:w,u_originY:x,u_worldWidth:A,u_worldHeight:B};return(0,l.jsx)(e.f,{...C,speed:a,frame:b,fragmentShader:k,uniforms:D})},f.q)},65439:(a,b,c)=>{"use strict";c.d(b,{D_:()=>n});var d=c(22495),e=c(46452),f=c(46090),g=c(40141),h=c(6983);let i=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

uniform float u_pxSize;
uniform vec4 u_colorBack;
uniform vec4 u_colorFront;
uniform float u_shape;
uniform float u_type;

out vec4 fragColor;

${h.V2}
${h.ES}
${h.m0}
${h.tZ}

float getSimplexNoise(vec2 uv, float t) {
  float noise = .5 * snoise(uv - vec2(0., .3 * t));
  noise += .5 * snoise(2. * uv + vec2(0., .32 * t));

  return noise;
}

const int bayer2x2[4] = int[4](0, 2, 3, 1);
const int bayer4x4[16] = int[16](
0, 8, 2, 10,
12, 4, 14, 6,
3, 11, 1, 9,
15, 7, 13, 5
);

const int bayer8x8[64] = int[64](
0, 32, 8, 40, 2, 34, 10, 42,
48, 16, 56, 24, 50, 18, 58, 26,
12, 44, 4, 36, 14, 46, 6, 38,
60, 28, 52, 20, 62, 30, 54, 22,
3, 35, 11, 43, 1, 33, 9, 41,
51, 19, 59, 27, 49, 17, 57, 25,
15, 47, 7, 39, 13, 45, 5, 37,
63, 31, 55, 23, 61, 29, 53, 21
);

float getBayerValue(vec2 uv, int size) {
  ivec2 pos = ivec2(fract(uv / float(size)) * float(size));
  int index = pos.y * size + pos.x;

  if (size == 2) {
    return float(bayer2x2[index]) / 4.0;
  } else if (size == 4) {
    return float(bayer4x4[index]) / 16.0;
  } else if (size == 8) {
    return float(bayer8x8[index]) / 64.0;
  }
  return 0.0;
}


void main() {
  float t = .5 * u_time;

  float pxSize = u_pxSize * u_pixelRatio;
  vec2 pxSizeUV = gl_FragCoord.xy - .5 * u_resolution;
  pxSizeUV /= pxSize;
  vec2 canvasPixelizedUV = (floor(pxSizeUV) + .5) * pxSize;
  vec2 normalizedUV = canvasPixelizedUV / u_resolution;

  vec2 ditheringNoiseUV = canvasPixelizedUV;
  vec2 shapeUV = normalizedUV;

  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  float r = u_rotation * PI / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);

  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 boxSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  
  if (u_shape > 3.5) {
    vec2 objectBoxSize = vec2(0.);
    // fit = none
    objectBoxSize.x = min(boxSize.x, boxSize.y);
    if (u_fit == 1.) { // fit = contain
      objectBoxSize.x = min(u_resolution.x, u_resolution.y);
    } else if (u_fit == 2.) { // fit = cover
      objectBoxSize.x = max(u_resolution.x, u_resolution.y);
    }
    objectBoxSize.y = objectBoxSize.x;
    vec2 objectWorldScale = u_resolution.xy / objectBoxSize;

    shapeUV *= objectWorldScale;
    shapeUV += boxOrigin * (objectWorldScale - 1.);
    shapeUV += vec2(-u_offsetX, u_offsetY);
    shapeUV /= u_scale;
    shapeUV = graphicRotation * shapeUV;
  } else {
    vec2 patternBoxSize = vec2(0.);
    // fit = none
    patternBoxSize.x = patternBoxRatio * min(boxSize.x / patternBoxRatio, boxSize.y);
    float patternWorldNoFitBoxWidth = patternBoxSize.x;
    if (u_fit == 1.) { // fit = contain
      patternBoxSize.x = patternBoxRatio * min(u_resolution.x / patternBoxRatio, u_resolution.y);
    } else if (u_fit == 2.) { // fit = cover
      patternBoxSize.x = patternBoxRatio * max(u_resolution.x / patternBoxRatio, u_resolution.y);
    }
    patternBoxSize.y = patternBoxSize.x / patternBoxRatio;
    vec2 patternWorldScale = u_resolution.xy / patternBoxSize;

    shapeUV += vec2(-u_offsetX, u_offsetY) / patternWorldScale;
    shapeUV += boxOrigin;
    shapeUV -= boxOrigin / patternWorldScale;
    shapeUV *= u_resolution.xy;
    shapeUV /= u_pixelRatio;
    if (u_fit > 0.) {
      shapeUV *= (patternWorldNoFitBoxWidth / patternBoxSize.x);
    }
    shapeUV /= u_scale;
    shapeUV = graphicRotation * shapeUV;
    shapeUV += boxOrigin / patternWorldScale;
    shapeUV -= boxOrigin;
    shapeUV += .5;
  }

  float shape = 0.;
  if (u_shape < 1.5) {
    // Simplex noise
    shapeUV *= .001;

    shape = 0.5 + 0.5 * getSimplexNoise(shapeUV, t);
    shape = smoothstep(0.3, 0.9, shape);

  } else if (u_shape < 2.5) {
    // Warp
    shapeUV *= .003;

    for (float i = 1.0; i < 6.0; i++) {
      shapeUV.x += 0.6 / i * cos(i * 2.5 * shapeUV.y + t);
      shapeUV.y += 0.6 / i * cos(i * 1.5 * shapeUV.x + t);
    }

    shape = .15 / max(0.001, abs(sin(t - shapeUV.y - shapeUV.x)));
    shape = smoothstep(0.02, 1., shape);

  } else if (u_shape < 3.5) {
    // Dots
    shapeUV *= .05;

    float stripeIdx = floor(2. * shapeUV.x / TWO_PI);
    float rand = hash11(stripeIdx * 10.);
    rand = sign(rand - .5) * pow(.1 + abs(rand), .4);
    shape = sin(shapeUV.x) * cos(shapeUV.y - 5. * rand * t);
    shape = pow(abs(shape), 6.);

  } else if (u_shape < 4.5) {
    // Sine wave
    shapeUV *= 4.;

    float wave = cos(.5 * shapeUV.x - 2. * t) * sin(1.5 * shapeUV.x + t) * (.75 + .25 * cos(3. * t));
    shape = 1. - smoothstep(-1., 1., shapeUV.y + wave);

  } else if (u_shape < 5.5) {
    // Ripple

    float dist = length(shapeUV);
    float waves = sin(pow(dist, 1.7) * 7. - 3. * t) * .5 + .5;
    shape = waves;

  } else if (u_shape < 6.5) {
    // Swirl

    float l = length(shapeUV);
    float angle = 6. * atan(shapeUV.y, shapeUV.x) + 4. * t;
    float twist = 1.2;
    float offset = 1. / pow(max(l, 1e-6), twist) + angle / TWO_PI;
    float mid = smoothstep(0., 1., pow(l, twist));
    shape = mix(0., fract(offset), mid);

  } else {
    // Sphere
    shapeUV *= 2.;

    float d = 1. - pow(length(shapeUV), 2.);
    vec3 pos = vec3(shapeUV, sqrt(max(0., d)));
    vec3 lightPos = normalize(vec3(cos(1.5 * t), .8, sin(1.25 * t)));
    shape = .5 + .5 * dot(lightPos, pos);
    shape *= step(0., d);
  }


  int type = int(floor(u_type));
  float dithering = 0.0;

  switch (type) {
    case 1: {
      dithering = step(hash21(ditheringNoiseUV), shape);
    } break;
    case 2:
    dithering = getBayerValue(pxSizeUV, 2);
    break;
    case 3:
    dithering = getBayerValue(pxSizeUV, 4);
    break;
    default :
    dithering = getBayerValue(pxSizeUV, 8);
    break;
  }

  dithering -= .5;
  float res = step(.5, shape + dithering);

  vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
  float fgOpacity = u_colorFront.a;
  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  float bgOpacity = u_colorBack.a;

  vec3 color = fgColor * res;
  float opacity = fgOpacity * res;

  color += bgColor * (1. - opacity);
  opacity += bgOpacity * (1. - opacity);

  fragColor = vec4(color, opacity);
}
`,j={simplex:1,warp:2,dots:3,wave:4,ripple:5,swirl:6,sphere:7},k={random:1,"2x2":2,"4x4":3,"8x8":4};var l=c(45262);let m={name:"Default",params:{...f.OZ,speed:1,frame:0,scale:.6,colorBack:"#000000",colorFront:"#00b2ff",shape:"sphere",type:"4x4",size:2}};f.OZ,f.OZ,f.J7,f.J7,f.J7;let n=(0,d.memo)(function({speed:a=m.params.speed,frame:b=m.params.frame,colorBack:c=m.params.colorBack,colorFront:d=m.params.colorFront,shape:h=m.params.shape,type:n=m.params.type,pxSize:o,size:p=void 0===o?m.params.size:o,fit:q=m.params.fit,scale:r=m.params.scale,rotation:s=m.params.rotation,originX:t=m.params.originX,originY:u=m.params.originY,offsetX:v=m.params.offsetX,offsetY:w=m.params.offsetY,worldWidth:x=m.params.worldWidth,worldHeight:y=m.params.worldHeight,...z}){let A={u_colorBack:(0,g.G)(c),u_colorFront:(0,g.G)(d),u_shape:j[h],u_type:k[n],u_pxSize:p,u_fit:f.Tk[q],u_scale:r,u_rotation:s,u_offsetX:v,u_offsetY:w,u_originX:t,u_originY:u,u_worldWidth:x,u_worldHeight:y};return(0,l.jsx)(e.f,{...z,speed:a,frame:b,fragmentShader:i,uniforms:A})})},65569:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("share",[["path",{d:"M12 2v13",key:"1km8f5"}],["path",{d:"m16 6-4-4-4 4",key:"13yo43"}],["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}]])},65602:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("arrow-right",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]])},66370:(a,b,c)=>{"use strict";c.d(b,{K6:()=>n});var d=c(22495),e=c(46452),f=c(82247),g=c(46090),h=c(40141),i=c(6983);let j={maxColorCount:10},k=`#version 300 es
precision mediump float;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${j.maxColorCount}];
uniform float u_colorsCount;

uniform float u_radius;
uniform float u_focalDistance;
uniform float u_focalAngle;
uniform float u_falloff;
uniform float u_mixing;
uniform float u_distortion;
uniform float u_distortionShift;
uniform float u_distortionFreq;
uniform float u_grainMixer;
uniform float u_grainOverlay;

in vec2 v_objectUV;
out vec4 fragColor;

${i.ES}
${i.ZB}
${i.tZ}

float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

float noise(vec2 n, vec2 seedOffset) {
  return valueNoise(n + seedOffset);
}

vec2 getPosition(int i, float t) {
  float a = float(i) * .37;
  float b = .6 + mod(float(i), 3.) * .3;
  float c = .8 + mod(float(i + 1), 4.) * 0.25;

  float x = sin(t * b + a);
  float y = cos(t * c + a * 1.5);

  return .5 + .5 * vec2(x, y);
}

void main() {
  vec2 uv = 2. * v_objectUV;
  vec2 grainUV = uv * 1000.;

  vec2 center = vec2(0.);
  float angleRad = -radians(u_focalAngle + 90.);
  vec2 focalPoint = vec2(cos(angleRad), sin(angleRad)) * u_focalDistance;
  float radius = u_radius;

  vec2 c_to_uv = uv - center;
  vec2 f_to_uv = uv - focalPoint;
  vec2 f_to_c = center - focalPoint;
  float r = length(c_to_uv);

  float fragAngle = atan(c_to_uv.y, c_to_uv.x);
  float angleDiff = fract((fragAngle - angleRad + PI) / TWO_PI) * TWO_PI - PI;

  float halfAngle = acos(clamp(radius / max(u_focalDistance, 1e-4), 0.0, 1.0));
  float e0 = 0.6 * PI, e1 = halfAngle;
  float lo = min(e0, e1), hi = max(e0, e1);
  float s  = smoothstep(lo, hi, abs(angleDiff));
  float isInSector = (e1 >= e0) ? (1.0 - s) : s;

  float a = dot(f_to_uv, f_to_uv);
  float b = -2.0 * dot(f_to_uv, f_to_c);
  float c = dot(f_to_c, f_to_c) - radius * radius;

  float discriminant = b * b - 4.0 * a * c;
  float t = 1.0;

  if (discriminant >= 0.0) {
    float sqrtD = sqrt(discriminant);
    float div = max(1e-4, 2.0 * a);
    float t0 = (-b - sqrtD) / div;
    float t1 = (-b + sqrtD) / div;
    t = max(t0, t1);
    if (t < 0.0) t = 0.0;
  }

  float dist = length(f_to_uv);
  float normalized = dist / max(1e-4, length(f_to_uv * t));
  float shape = clamp(normalized, 0.0, 1.0);

  float falloffMapped = mix(.2 + .8 * max(0., u_falloff + 1.), mix(1., 15., u_falloff * u_falloff), step(.0, u_falloff));

  float falloffExp = mix(falloffMapped, 1., shape);
  shape = pow(shape, falloffExp);
  shape = 1. - clamp(shape, 0., 1.);


  float outerMask = .002;
  float outer = 1.0 - smoothstep(radius - outerMask, radius + outerMask, r);
  outer = mix(outer, 1., isInSector);

  shape = mix(0., shape, outer);
  shape *= 1. - smoothstep(radius - .01, radius, r);

  float angle = atan(f_to_uv.y, f_to_uv.x);
  shape -= pow(u_distortion, 2.) * shape * pow(abs(sin(PI * clamp(length(f_to_uv) - 0.2 + u_distortionShift, 0.0, 1.0))), 4.0) * (sin(u_distortionFreq * angle) + cos(floor(0.65 * u_distortionFreq) * angle));

  float grain = noise(grainUV, vec2(0.));
  float mixerGrain = .4 * u_grainMixer * (grain - .5);

  float mixer = shape * u_colorsCount + mixerGrain;
  vec4 gradient = u_colors[0];
  gradient.rgb *= gradient.a;

  float outerShape = 0.;
  for (int i = 1; i < ${j.maxColorCount+1}; i++) {
    if (i > int(u_colorsCount)) break;
    float mLinear = clamp(mixer - float(i - 1), 0.0, 1.0);

    float aa = fwidth(mLinear);
    float width = min(u_mixing, 0.5);
    float t = clamp((mLinear - (0.5 - width - aa)) / (2. * width + 2. * aa), 0., 1.);
    float p = mix(2., 1., clamp((u_mixing - 0.5) * 2., 0., 1.));
    float m = t < 0.5
      ? 0.5 * pow(2. * t, p)
      : 1. - 0.5 * pow(2. * (1. - t), p);

    float quadBlend = clamp((u_mixing - 0.5) * 2., 0., 1.);
    m = mix(m, m * m, 0.5 * quadBlend);
    
    if (i == 1) {
      outerShape = m;
    }

    vec4 c = u_colors[i - 1];
    c.rgb *= c.a;
    gradient = mix(gradient, c, m);
  }

  vec3 color = gradient.rgb * outerShape;
  float opacity = gradient.a * outerShape;

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1.0 - opacity);
  opacity = opacity + u_colorBack.a * (1.0 - opacity);

  float grainOverlay = valueNoise(rotate(grainUV, 1.) + vec2(3.));
  grainOverlay = mix(grainOverlay, valueNoise(rotate(grainUV, 2.) + vec2(-1.)), .5);
  grainOverlay = pow(grainOverlay, 1.3);

  float grainOverlayV = grainOverlay * 2. - 1.;
  vec3 grainOverlayColor = vec3(step(0., grainOverlayV));
  float grainOverlayStrength = u_grainOverlay * abs(grainOverlayV);
  grainOverlayStrength = pow(grainOverlayStrength, .8);
  color = mix(color, grainOverlayColor, .35 * grainOverlayStrength);

  opacity += .5 * grainOverlayStrength;
  opacity = clamp(opacity, 0., 1.);

  fragColor = vec4(color, opacity);
}
`;var l=c(45262);let m={name:"Default",params:{...g.J7,scale:1,speed:0,frame:0,colorBack:"#000000",colors:["#00bbff","#00ffe1","#ffffff"],radius:.8,focalDistance:.99,focalAngle:0,falloff:.24,mixing:.5,distortion:0,distortionShift:0,distortionFreq:12,grainMixer:0,grainOverlay:0}};g.J7,g.J7,g.J7;let n=(0,d.memo)(function({speed:a=m.params.speed,frame:b=m.params.frame,colorBack:c=m.params.colorBack,colors:d=m.params.colors,radius:f=m.params.radius,focalDistance:i=m.params.focalDistance,focalAngle:j=m.params.focalAngle,falloff:n=m.params.falloff,grainMixer:o=m.params.grainMixer,mixing:p=m.params.mixing,distortion:q=m.params.distortion,distortionShift:r=m.params.distortionShift,distortionFreq:s=m.params.distortionFreq,grainOverlay:t=m.params.grainOverlay,fit:u=m.params.fit,rotation:v=m.params.rotation,scale:w=m.params.scale,originX:x=m.params.originX,originY:y=m.params.originY,offsetX:z=m.params.offsetX,offsetY:A=m.params.offsetY,worldWidth:B=m.params.worldWidth,worldHeight:C=m.params.worldHeight,...D}){let E={u_colorBack:(0,h.G)(c),u_colors:d.map(h.G),u_colorsCount:d.length,u_radius:f,u_focalDistance:i,u_focalAngle:j,u_falloff:n,u_mixing:p,u_distortion:q,u_distortionShift:r,u_distortionFreq:s,u_grainMixer:o,u_grainOverlay:t,u_fit:g.Tk[u],u_rotation:v,u_scale:w,u_offsetX:z,u_offsetY:A,u_originX:x,u_originY:y,u_worldWidth:B,u_worldHeight:C};return(0,l.jsx)(e.f,{...D,speed:a,frame:b,fragmentShader:k,uniforms:E})},f.q)},66623:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("webhook",[["path",{d:"M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2",key:"q3hayz"}],["path",{d:"m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06",key:"1go1hn"}],["path",{d:"m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8",key:"qlwsc0"}]])},68542:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("user-round",[["circle",{cx:"12",cy:"8",r:"5",key:"1hypcn"}],["path",{d:"M20 21a8 8 0 0 0-16 0",key:"rfgkzh"}]])},69271:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("timer",[["line",{x1:"10",x2:"14",y1:"2",y2:"2",key:"14vaq8"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11",key:"17fdiu"}],["circle",{cx:"12",cy:"14",r:"8",key:"1e1u0o"}]])},70145:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0}),Object.defineProperty(b,"BailoutToCSR",{enumerable:!0,get:function(){return e}});let d=c(47501);function e(a){let{reason:b,children:c}=a;throw Object.defineProperty(new d.BailoutToCSRError(b),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0})}},70984:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("refresh-cw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]])},71134:(a,b,c)=>{"use strict";c.d(b,{FF:()=>m});var d=c(22495),e=c(46452),f=c(82247),g=c(46090),h=c(40141),i=c(6983);let j=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colorFront;
uniform vec4 u_colorBack;
uniform float u_proportion;
uniform float u_softness;
uniform float u_octaveCount;
uniform float u_persistence;
uniform float u_lacunarity;

in vec2 v_patternUV;

out vec4 fragColor;

${i.ES}
${i.m0}
${i.tZ}

float hash31(vec3 p) {
  p = fract(p * 0.3183099) + 0.1;
  p += dot(p, p.yzx + 19.19);
  return fract(p.x * (p.y + p.z));
}

vec3 gradientPredefined(float hash) {
  int idx = int(hash * 12.0) % 12;

  if (idx == 0) return vec3(1, 1, 0);
  if (idx == 1) return vec3(-1, 1, 0);
  if (idx == 2) return vec3(1, -1, 0);
  if (idx == 3) return vec3(-1, -1, 0);
  if (idx == 4) return vec3(1, 0, 1);
  if (idx == 5) return vec3(-1, 0, 1);
  if (idx == 6) return vec3(1, 0, -1);
  if (idx == 7) return vec3(-1, 0, -1);
  if (idx == 8) return vec3(0, 1, 1);
  if (idx == 9) return vec3(0, -1, 1);
  if (idx == 10) return vec3(0, 1, -1);
  return vec3(0, -1, -1);// idx == 11
}

float interpolateSafe(float v000, float v001, float v010, float v011,
float v100, float v101, float v110, float v111, vec3 t) {
  t = clamp(t, 0.0, 1.0);

  float v00 = mix(v000, v100, t.x);
  float v01 = mix(v001, v101, t.x);
  float v10 = mix(v010, v110, t.x);
  float v11 = mix(v011, v111, t.x);

  float v0 = mix(v00, v10, t.y);
  float v1 = mix(v01, v11, t.y);

  return mix(v0, v1, t.z);
}

vec3 fade(vec3 t) {
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float perlinNoise(vec3 position, float seed) {
  position += vec3(seed * 127.1, seed * 311.7, seed * 74.7);

  vec3 i = floor(position);
  vec3 f = fract(position);
  float h000 = hash31(i);
  float h001 = hash31(i + vec3(0, 0, 1));
  float h010 = hash31(i + vec3(0, 1, 0));
  float h011 = hash31(i + vec3(0, 1, 1));
  float h100 = hash31(i + vec3(1, 0, 0));
  float h101 = hash31(i + vec3(1, 0, 1));
  float h110 = hash31(i + vec3(1, 1, 0));
  float h111 = hash31(i + vec3(1, 1, 1));
  vec3 g000 = gradientPredefined(h000);
  vec3 g001 = gradientPredefined(h001);
  vec3 g010 = gradientPredefined(h010);
  vec3 g011 = gradientPredefined(h011);
  vec3 g100 = gradientPredefined(h100);
  vec3 g101 = gradientPredefined(h101);
  vec3 g110 = gradientPredefined(h110);
  vec3 g111 = gradientPredefined(h111);
  float v000 = dot(g000, f - vec3(0, 0, 0));
  float v001 = dot(g001, f - vec3(0, 0, 1));
  float v010 = dot(g010, f - vec3(0, 1, 0));
  float v011 = dot(g011, f - vec3(0, 1, 1));
  float v100 = dot(g100, f - vec3(1, 0, 0));
  float v101 = dot(g101, f - vec3(1, 0, 1));
  float v110 = dot(g110, f - vec3(1, 1, 0));
  float v111 = dot(g111, f - vec3(1, 1, 1));

  vec3 u = fade(f);
  return interpolateSafe(v000, v001, v010, v011, v100, v101, v110, v111, u);
}

float p_noise(vec3 position, int octaveCount, float persistence, float lacunarity) {
  float value = 0.0;
  float amplitude = 1.0;
  float frequency = 10.0;
  float maxValue = 0.0;
  octaveCount = clamp(octaveCount, 1, 8);

  for (int i = 0; i < octaveCount; i++) {
    float seed = float(i) * 0.7319;
    value += perlinNoise(position * frequency, seed) * amplitude;
    maxValue += amplitude;
    amplitude *= persistence;
    frequency *= lacunarity;
  }
  return value;
}

float get_max_amp(float persistence, float octaveCount) {
  persistence = clamp(persistence * 0.999, 0.0, 0.999);
  octaveCount = clamp(octaveCount, 1.0, 8.0);

  if (abs(persistence - 1.0) < 0.001) {
    return octaveCount;
  }

  return (1.0 - pow(persistence, octaveCount)) / max(1e-4, (1.0 - persistence));
}

void main() {
  vec2 uv = v_patternUV;
  uv *= .5;

  float t = .2 * u_time;

  vec3 p = vec3(uv, t);

  float octCount = floor(u_octaveCount);
  float noise = p_noise(p, int(octCount), u_persistence, u_lacunarity);

  float max_amp = get_max_amp(u_persistence, octCount);
  float noise_normalized = clamp((noise + max_amp) / max(1e-4, (2. * max_amp)) + (u_proportion - .5), 0.0, 1.0);
  float sharpness = clamp(u_softness, 0., 1.);
  float smooth_w = 0.5 * max(fwidth(noise_normalized), 0.001);
  float res = smoothstep(
  .5 - .5 * sharpness - smooth_w,
  .5 + .5 * sharpness + smooth_w,
  noise_normalized
  );

  vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
  float fgOpacity = u_colorFront.a;
  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  float bgOpacity = u_colorBack.a;

  vec3 color = fgColor * res;
  float opacity = fgOpacity * res;

  color += bgColor * (1. - opacity);
  opacity += bgOpacity * (1. - opacity);

  ${i.Km}

  fragColor = vec4(color, opacity);
}
`;var k=c(45262);let l={name:"Default",params:{...g.OZ,speed:.5,frame:0,colorBack:"#632ad5",colorFront:"#fccff7",proportion:.35,softness:.1,octaveCount:1,persistence:1,lacunarity:1.5}};g.OZ,g.OZ,g.OZ;let m=(0,d.memo)(function({speed:a=l.params.speed,frame:b=l.params.frame,colorFront:c=l.params.colorFront,colorBack:d=l.params.colorBack,proportion:f=l.params.proportion,softness:i=l.params.softness,octaveCount:m=l.params.octaveCount,persistence:n=l.params.persistence,lacunarity:o,fit:p=l.params.fit,worldWidth:q=l.params.worldWidth,worldHeight:r=l.params.worldHeight,scale:s=l.params.scale,rotation:t=l.params.rotation,originX:u=l.params.originX,originY:v=l.params.originY,offsetX:w=l.params.offsetX,offsetY:x=l.params.offsetY,...y}){let z={u_colorBack:(0,h.G)(d),u_colorFront:(0,h.G)(c),u_proportion:f,u_softness:i??l.params.softness,u_octaveCount:m??l.params.octaveCount,u_persistence:n??l.params.persistence,u_lacunarity:o??l.params.lacunarity,u_fit:g.Tk[p],u_scale:s,u_rotation:t,u_offsetX:w,u_offsetY:x,u_originX:u,u_originY:v,u_worldWidth:q,u_worldHeight:r};return(0,k.jsx)(e.f,{...y,speed:a,frame:b,fragmentShader:j,uniforms:z})},f.q)},71456:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("heart",[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}]])},72858:(a,b,c)=>{"use strict";c.d(b,{WL:()=>n});var d=c(22495),e=c(46452),f=c(82247),g=c(46090),h=c(40141),i=c(6983);let j={maxColorCount:10},k=`#version 300 es
precision mediump float;

uniform vec4 u_colors[${j.maxColorCount}];
uniform float u_colorsCount;

uniform float u_positions;
uniform float u_waveX;
uniform float u_waveXShift;
uniform float u_waveY;
uniform float u_waveYShift;
uniform float u_mixing;
uniform float u_grainMixer;
uniform float u_grainOverlay;

in vec2 v_objectUV;
out vec4 fragColor;

${i.ES}
${i.ZB}
${i.tZ}

float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

float noise(vec2 n, vec2 seedOffset) {
  return valueNoise(n + seedOffset);
}

vec2 getPosition(int i, float t) {
  float a = float(i) * .37;
  float b = .6 + mod(float(i), 3.) * .3;
  float c = .8 + mod(float(i + 1), 4.) * 0.25;

  float x = sin(t * b + a);
  float y = cos(t * c + a * 1.5);

  return .5 + .5 * vec2(x, y);
}

void main() {
  vec2 uv = v_objectUV;
  uv += .5;
  vec2 grainUV = uv * 1000.;

  float grain = noise(grainUV, vec2(0.));
  float mixerGrain = .4 * u_grainMixer * (grain - .5);

  float radius = smoothstep(0., 1., length(uv - .5));
  float center = 1. - radius;
  for (float i = 1.; i <= 2.; i++) {
    uv.x += u_waveX * center / i * cos(TWO_PI * u_waveXShift + i * 2. * smoothstep(.0, 1., uv.y));
    uv.y += u_waveY * center / i * cos(TWO_PI * u_waveYShift + i * 2. * smoothstep(.0, 1., uv.x));
  }

  vec3 color = vec3(0.);
  float opacity = 0.;
  float totalWeight = 0.;
  float positionSeed = 25. + .33 * u_positions;

  for (int i = 0; i < ${j.maxColorCount}; i++) {
    if (i >= int(u_colorsCount)) break;

    vec2 pos = getPosition(i, positionSeed) + mixerGrain;
    float dist = length(uv - pos);
    dist = length(uv - pos);

    vec3 colorFraction = u_colors[i].rgb * u_colors[i].a;
    float opacityFraction = u_colors[i].a;

    float mixing = pow(u_mixing, .7);
    float power = mix(2., 1., mixing);
    dist = pow(dist, power);

    float w = 1. / (dist + 1e-3);
    float baseSharpness = mix(.0, 8., clamp(w, 0., 1.));
    float sharpness = mix(baseSharpness, 1., mixing);
    w = pow(w, sharpness);
    color += colorFraction * w;
    opacity += opacityFraction * w;
    totalWeight += w;
  }

  color /= max(1e-4, totalWeight);
  opacity /= max(1e-4, totalWeight);

  float grainOverlay = valueNoise(rotate(grainUV, 1.) + vec2(3.));
  grainOverlay = mix(grainOverlay, valueNoise(rotate(grainUV, 2.) + vec2(-1.)), .5);
  grainOverlay = pow(grainOverlay, 1.3);

  float grainOverlayV = grainOverlay * 2. - 1.;
  vec3 grainOverlayColor = vec3(step(0., grainOverlayV));
  float grainOverlayStrength = u_grainOverlay * abs(grainOverlayV);
  grainOverlayStrength = pow(grainOverlayStrength, .8);
  color = mix(color, grainOverlayColor, .35 * grainOverlayStrength);

  opacity += .5 * grainOverlayStrength;
  opacity = clamp(opacity, 0., 1.);

  fragColor = vec4(color, opacity);
}
`;var l=c(45262);let m={name:"Default",params:{...g.J7,rotation:270,speed:0,frame:0,colors:["#ffad0a","#6200ff","#e2a3ff","#ff99fd"],positions:2,waveX:1,waveXShift:.6,waveY:1,waveYShift:.21,mixing:.93,grainMixer:0,grainOverlay:0}};g.J7,g.J7,g.J7;let n=(0,d.memo)(function({speed:a=m.params.speed,frame:b=m.params.frame,colors:c=m.params.colors,positions:d=m.params.positions,waveX:f=m.params.waveX,waveXShift:i=m.params.waveXShift,waveY:j=m.params.waveY,waveYShift:n=m.params.waveYShift,mixing:o=m.params.mixing,grainMixer:p=m.params.grainMixer,grainOverlay:q=m.params.grainOverlay,fit:r=m.params.fit,rotation:s=m.params.rotation,scale:t=m.params.scale,originX:u=m.params.originX,originY:v=m.params.originY,offsetX:w=m.params.offsetX,offsetY:x=m.params.offsetY,worldWidth:y=m.params.worldWidth,worldHeight:z=m.params.worldHeight,...A}){let B={u_colors:c.map(h.G),u_colorsCount:c.length,u_positions:d,u_waveX:f,u_waveXShift:i,u_waveY:j,u_waveYShift:n,u_mixing:o,u_grainMixer:p,u_grainOverlay:q,u_fit:g.Tk[r],u_rotation:s,u_scale:t,u_offsetX:w,u_offsetY:x,u_originX:u,u_originY:v,u_worldWidth:y,u_worldHeight:z};return(0,l.jsx)(e.f,{...A,speed:a,frame:b,fragmentShader:k,uniforms:B})},f.q)},73860:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("brush",[["path",{d:"m11 10 3 3",key:"fzmg1i"}],["path",{d:"M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z",key:"p4q2r7"}],["path",{d:"M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031",key:"wy6l02"}]])},74604:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("link",[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]])},74839:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("file-headphone",[["path",{d:"M4 6.835V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-.343",key:"1vfytu"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M2 19a2 2 0 0 1 4 0v1a2 2 0 0 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 0 1-4 0v-1a2 2 0 0 1 4 0",key:"1etmh7"}]])},75285:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("git-branch",[["path",{d:"M15 6a9 9 0 0 0-9 9V3",key:"1cii5b"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}]])},75790:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("banknote",[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2",key:"9lu3g6"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M6 12h.01M18 12h.01",key:"113zkx"}]])},77499:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("bell",[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}]])},78833:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("music",[["path",{d:"M9 18V5l12-2v13",key:"1jmyc2"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["circle",{cx:"18",cy:"16",r:"3",key:"1hluhg"}]])},79366:(a,b,c)=>{"use strict";c.d(b,{Yb:()=>o});var d=c(22495),e=c(46452),f=c(82247),g=c(46090),h=c(40141),i=c(32149),j=c(6983);let k={maxColorCount:10},l=`#version 300 es
precision mediump float;

uniform float u_time;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${k.maxColorCount}];
uniform float u_colorsCount;
uniform float u_stepsPerColor;
uniform float u_size;
uniform float u_sizeRange;
uniform float u_spreading;

in vec2 v_patternUV;

out vec4 fragColor;

${j.ES}
${j.ZB}
${j.nI}
${j.CJ}


vec3 voronoiShape(vec2 uv, float time) {
  vec2 i_uv = floor(uv);
  vec2 f_uv = fract(uv);

  float spreading = .25 * clamp(u_spreading, 0., 1.);

  float minDist = 1.;
  vec2 randomizer = vec2(0.);
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 tileOffset = vec2(float(x), float(y));
      vec2 rand = randomGB(i_uv + tileOffset);
      vec2 cellCenter = vec2(.5 + 1e-4);
      cellCenter += spreading * cos(time + TWO_PI * rand);
      cellCenter -= .5;
      cellCenter = rotate(cellCenter, randomR(vec2(rand.x, rand.y)) + .1 * time);
      cellCenter += .5;
      float dist = length(tileOffset + cellCenter - f_uv);
      if (dist < minDist) {
        minDist = dist;
        randomizer = rand;
      }
    }
  }

  return vec3(minDist, randomizer);
}

void main() {

  vec2 shape_uv = v_patternUV;
  shape_uv *= 1.5;

  const float firstFrameOffset = -10.;
  float t = u_time + firstFrameOffset;

  vec3 voronoi = voronoiShape(shape_uv, t) + 1e-4;

  float radius = .25 * clamp(u_size, 0., 1.) - .5 * clamp(u_sizeRange, 0., 1.) * voronoi[2];
  float dist = voronoi[0];
  float edgeWidth = fwidth(dist);
  float dots = 1. - smoothstep(radius - edgeWidth, radius + edgeWidth, dist);

  float shape = voronoi[1];

  float mixer = shape * (u_colorsCount - 1.);
  mixer = (shape - .5 / u_colorsCount) * u_colorsCount;
  float steps = max(1., u_stepsPerColor);

  vec4 gradient = u_colors[0];
  gradient.rgb *= gradient.a;
  for (int i = 1; i < ${k.maxColorCount}; i++) {
    if (i >= int(u_colorsCount)) break;
    float localT = clamp(mixer - float(i - 1), 0.0, 1.0);
    localT = round(localT * steps) / steps;
    vec4 c = u_colors[i];
    c.rgb *= c.a;
    gradient = mix(gradient, c, localT);
  }

  if ((mixer < 0.) || (mixer > (u_colorsCount - 1.))) {
    float localT = mixer + 1.;
    if (mixer > (u_colorsCount - 1.)) {
      localT = mixer - (u_colorsCount - 1.);
    }
    localT = round(localT * steps) / steps;
    vec4 cFst = u_colors[0];
    cFst.rgb *= cFst.a;
    vec4 cLast = u_colors[int(u_colorsCount - 1.)];
    cLast.rgb *= cLast.a;
    gradient = mix(cLast, cFst, localT);
  }

  vec3 color = gradient.rgb * dots;
  float opacity = gradient.a * dots;

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1. - opacity);
  opacity = opacity + u_colorBack.a * (1. - opacity);

  fragColor = vec4(color, opacity);
}
`;var m=c(45262);let n={name:"Default",params:{...g.OZ,speed:1.5,frame:0,colorBack:"#000000",colors:["#ffc96b","#ff6200","#ff2f00","#421100","#1a0000"],size:1,sizeRange:0,spreading:1,stepsPerColor:4}};g.OZ,g.OZ,g.OZ;let o=(0,d.memo)(function({speed:a=n.params.speed,frame:b=n.params.frame,colorBack:c=n.params.colorBack,colors:d=n.params.colors,size:f=n.params.size,sizeRange:j=n.params.sizeRange,spreading:k=n.params.spreading,stepsPerColor:o=n.params.stepsPerColor,fit:p=n.params.fit,scale:q=n.params.scale,rotation:r=n.params.rotation,originX:s=n.params.originX,originY:t=n.params.originY,offsetX:u=n.params.offsetX,offsetY:v=n.params.offsetY,worldWidth:w=n.params.worldWidth,worldHeight:x=n.params.worldHeight,...y}){let z={u_colorBack:(0,h.G)(c),u_colors:d.map(h.G),u_colorsCount:d.length,u_size:f,u_sizeRange:j,u_spreading:k,u_stepsPerColor:o,u_noiseTexture:(0,i.R)(),u_fit:g.Tk[p],u_scale:q,u_rotation:r,u_offsetX:u,u_offsetY:v,u_originX:s,u_originY:t,u_worldWidth:w,u_worldHeight:x};return(0,m.jsx)(e.f,{...y,speed:a,frame:b,fragmentShader:l,uniforms:z})},f.q)},79505:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("circle-alert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]])},80227:(a,b,c)=>{"use strict";c.d(b,{G:()=>h});var d=c(30051),e=c(14086),f=c(44268),g=c(74550);function h(a,b,c,f){if("function"==typeof a){g.bt.current=[],a();let b=(0,e.j)(g.bt.current,a);return g.bt.current=void 0,b}let h="function"==typeof b?b:function(...a){let b,c,e=!Array.isArray(a[0]),f=e?0:-1,g=a[0+f],h=a[1+f],i=a[2+f],j=a[3+f],k=(0,d.G)(h,i,{mixer:(c=b=i[0])&&"object"==typeof c&&c.mix?b.mix:void 0,...j});return e?k(g):k}(b,c,f);return Array.isArray(a)?i(a,h):i([a],([a])=>h(a))}function i(a,b){let c=(0,f.M)(()=>[]);return(0,e.j)(a,()=>{c.length=0;let d=a.length;for(let b=0;b<d;b++)c[b]=a[b].get();return b(c)})}},80646:(a,b)=>{"use strict";function c(a){return a.split("/").map(a=>encodeURIComponent(a)).join("/")}Object.defineProperty(b,"__esModule",{value:!0}),Object.defineProperty(b,"encodeURIPath",{enumerable:!0,get:function(){return c}})},81186:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("arrow-up-to-line",[["path",{d:"M5 3h14",key:"7usisc"}],["path",{d:"m18 13-6-6-6 6",key:"1kf1n9"}],["path",{d:"M12 7v14",key:"1akyts"}]])},82247:(a,b,c)=>{"use strict";function d(a,b){for(let c in a){if("colors"===c){let c=Array.isArray(a.colors),d=Array.isArray(b.colors);if(!c||!d){if(!1===Object.is(a.colors,b.colors))return!1;continue}if(a.colors?.length!==b.colors?.length||!a.colors?.every((a,c)=>a===b.colors?.[c]))return!1;continue}if(!1===Object.is(a[c],b[c]))return!1}return!0}c.d(b,{q:()=>d})},83139:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("scan-face",[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2",key:"aa7l1z"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2",key:"4qcy5o"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2",key:"6vwrx8"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2",key:"ioqczr"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2",key:"1y1vjs"}],["path",{d:"M9 9h.01",key:"1q5me6"}],["path",{d:"M15 9h.01",key:"x1ddxp"}]])},83329:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("pin",[["path",{d:"M12 17v5",key:"bb1du9"}],["path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",key:"1nkz8b"}]])},84258:(a,b,c)=>{"use strict";c.d(b,{i:()=>M});var d=c(97095),e=c(46412),f=c(56163),g=c(85903),h=c(30850),i=c(32647),j=c(113),k=c(75854);function l(a,b){return(0,k.h)(a)?a[((a,b,c)=>{let d=b-a;return((c-a)%d+d)%d+a})(0,a.length,b)]:a}var m=c(82640),n=c(38862),o=c(35655),p=c(16979);function q(a){return"object"==typeof a&&!Array.isArray(a)}function r(a,b,c,d){return"string"==typeof a&&q(b)?(0,p.K)(a,c,d):a instanceof NodeList?Array.from(a):Array.isArray(a)?a:[a]}function s(a,b,c,d){var e;return"number"==typeof b?b:b.startsWith("-")||b.startsWith("+")?Math.max(0,a+parseFloat(b)):"<"===b?c:null!=(e=d.get(b))?e:a}var t=c(76861),u=c(92252);function v(a,b){return a.at!==b.at?a.at-b.at:null===a.value?1:null===b.value?-1:0}function w(a,b){return b.has(a)||b.set(a,{}),b.get(a)}function x(a,b){return b[a]||(b[a]=[]),b[a]}let y=a=>"number"==typeof a,z=a=>a.every(y);var A=c(63498),B=c(25838),C=c(66964),D=c(64892),E=c(23756),F=c(56415),G=c(8059);class H extends G.B{constructor(){super(...arguments),this.type="object"}readValueFromInstance(a,b){if(b in a){let c=a[b];if("string"==typeof c||"number"==typeof c)return c}}getBaseTargetFromProps(){}removeValueFromRenderState(a,b){delete b.output[a]}measureInstanceViewportBox(){return(0,F.ge)()}build(a,b){Object.assign(a.output,b)}renderInstance(a,{output:b}){Object.assign(a,b)}sortInstanceNodePosition(){return 0}}function I(a){let b={presenceContext:null,props:{},visualState:{renderState:{transform:{},transformOrigin:{},style:{},vars:{},attrs:{}},latestValues:{}}},c=(0,C.x)(a)?new D.l(b):new E.M(b);c.mount(a),A.C.set(a,c)}function J(a){let b=new H({presenceContext:null,props:{},visualState:{renderState:{output:{}},latestValues:{}}});b.mount(a),A.C.set(a,b)}var K=c(88317);function L(a,b,c,d){let e=[];if((0,o.S)(a)||"number"==typeof a||"string"==typeof a&&!q(b))e.push((0,K.z)(a,q(b)&&b.default||b,c&&c.default||c));else{let g=r(a,b,d),h=g.length;(0,f.V)(!!h,"No valid elements provided.");for(let a=0;a<h;a++){let d=g[a],f=d instanceof Element?I:J;A.C.has(d)||f(d);let i=A.C.get(d),j={...c};"delay"in j&&"function"==typeof j.delay&&(j.delay=j.delay(a,h)),e.push(...(0,B.$)(i,{...b,transition:j},{}))}}return e}let M=function(a){return function(b,c,k){let p=[];p=Array.isArray(b)&&b.some(Array.isArray)?function(a,b,c){let d=[];return(function(a,{defaultTransition:b={},...c}={},d,e){let k=b.duration||.3,p=new Map,q=new Map,y={},A=new Map,B=0,C=0,D=0;for(let c=0;c<a.length;c++){let g=a[c];if("string"==typeof g){A.set(g,C);continue}if(!Array.isArray(g)){A.set(g.name,s(C,g.at,B,A));continue}let[p,v,G={}]=g;void 0!==G.at&&(C=s(C,G.at,B,A));let H=0,I=(a,c,d,g=0,o=0)=>{var p;let q=Array.isArray(p=a)?p:[p],{delay:r=0,times:s=(0,m.Z)(q),type:v="keyframes",repeat:w,repeatType:x,repeatDelay:y=0,...A}=c,{ease:B=b.ease||"easeOut",duration:E}=c,F="function"==typeof r?r(g,o):r,G=q.length,I=(0,j.W)(v)?v:null==e?void 0:e[v];if(G<=2&&I){let a=100;2===G&&z(q)&&(a=Math.abs(q[1]-q[0]));let b={...A};void 0!==E&&(b.duration=(0,h.f)(E));let c=function(a,b=100,c){let d=c({...a,keyframes:[0,b]}),e=Math.min((0,i.t)(d),i.Y);return{type:"keyframes",ease:a=>d.next(e*a).value/b,duration:(0,h.X)(e)}}(b,a,I);B=c.ease,E=c.duration}null!=E||(E=k);let J=C+F;1===s.length&&0===s[0]&&(s[1]=1);let K=s.length-q.length;if(K>0&&(0,n.f)(s,K),1===q.length&&q.unshift(null),w){(0,f.V)(w<20,"Repeat count too high, must be less than 20");E*=w+1;let a=[...q],b=[...s],c=[...B=Array.isArray(B)?[...B]:[B]];for(let d=0;d<w;d++){q.push(...a);for(let e=0;e<a.length;e++)s.push(b[e]+(d+1)),B.push(0===e?"linear":l(c,e-1))}for(let a=0;a<s.length;a++)s[a]=s[a]/(w+1)}let L=J+E;!function(a,b,c,d,e,f){for(let b=0;b<a.length;b++){let c=a[b];c.at>e&&c.at<f&&((0,t.Ai)(a,c),b--)}for(let g=0;g<b.length;g++)a.push({value:b[g],at:(0,u.k)(e,f,d[g]),easing:l(c,g)})}(d,q,B,s,J,L),H=Math.max(F+E,H),D=Math.max(L,D)};if((0,o.S)(p))I(v,G,x("default",w(p,q)));else{let a=r(p,v,d,y),b=a.length;for(let c=0;c<b;c++){let d=w(a[c],q);for(let a in v){var E,F;I(v[a],(E=G,F=a,E&&E[F]?{...E,...E[F]}:{...E}),x(a,d),c,b)}}}B=C,C+=H}return q.forEach((a,d)=>{for(let e in a){let f=a[e];f.sort(v);let h=[],i=[],j=[];for(let a=0;a<f.length;a++){let{at:b,value:c,easing:d}=f[a];h.push(c),i.push((0,g.q)(0,D,b)),j.push(d||"easeOut")}0!==i[0]&&(i.unshift(0),h.unshift(h[0]),j.unshift("easeInOut")),1!==i[i.length-1]&&(i.push(1),h.push(null)),p.has(d)||p.set(d,{keyframes:{},transition:{}});let k=p.get(d);k.keyframes[e]=h,k.transition[e]={...b,duration:D,ease:j,times:i,...c}}}),p})(a,b,c,{spring:e.o}).forEach(({keyframes:a,transition:b},c)=>{d.push(...L(c,a,b))}),d}(b,c,void 0):L(b,c,k,void 0);let q=new d.P(p);return a&&a.animations.push(q),q}}()},85378:(a,b,c)=>{"use strict";c.d(b,{Bl:()=>p});var d=c(22495),e=c(46452),f=c(82247),g=c(46090),h=c(40141),i=c(6983);let j={maxColorCount:10},k=`#version 300 es
precision mediump float;

uniform float u_time;
uniform float u_scale;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colors[${j.maxColorCount}];
uniform float u_colorsCount;
uniform float u_proportion;
uniform float u_softness;
uniform float u_shape;
uniform float u_shapeScale;
uniform float u_distortion;
uniform float u_swirl;
uniform float u_swirlIterations;

in vec2 v_patternUV;

out vec4 fragColor;

${i.ES}
${i.ZB}
float randomG(vec2 p) {
  vec2 uv = floor(p) / 100. + .5;
  return texture(u_noiseTexture, fract(uv)).g;
}
float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = randomG(i);
  float b = randomG(i + vec2(1.0, 0.0));
  float c = randomG(i + vec2(0.0, 1.0));
  float d = randomG(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}


void main() {
  vec2 uv = v_patternUV;
  uv *= .5;

  const float firstFrameOffset = 118.;
  float t = 0.0625 * (u_time + firstFrameOffset);

  float n1 = valueNoise(uv * 1. + t);
  float n2 = valueNoise(uv * 2. - t);
  float angle = n1 * TWO_PI;
  uv.x += 4. * u_distortion * n2 * cos(angle);
  uv.y += 4. * u_distortion * n2 * sin(angle);

  float swirl = u_swirl;
  for (int i = 1; i <= 20; i++) {
    if (i >= int(u_swirlIterations)) break;
    float iFloat = float(i);
    //    swirl *= (1. - smoothstep(.0, .25, length(fwidth(uv))));
    uv.x += swirl / iFloat * cos(t + iFloat * 1.5 * uv.y);
    uv.y += swirl / iFloat * cos(t + iFloat * 1. * uv.x);
  }

  float proportion = clamp(u_proportion, 0., 1.);

  float shape = 0.;
  if (u_shape < .5) {
    vec2 checksShape_uv = uv * (.5 + 3.5 * u_shapeScale);
    shape = .5 + .5 * sin(checksShape_uv.x) * cos(checksShape_uv.y);
    shape += .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
  } else if (u_shape < 1.5) {
    vec2 stripesShape_uv = uv * (2. * u_shapeScale);
    float f = fract(stripesShape_uv.y);
    shape = smoothstep(.0, .55, f) * (1.0 - smoothstep(.45, 1., f));
    shape += .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
  } else {
    float shapeScaling = 5. * (1. - u_shapeScale);
    float e0 = 0.45 - shapeScaling;
    float e1 = 0.55 + shapeScaling;
    shape = smoothstep(min(e0, e1), max(e0, e1), 1.0 - uv.y + 0.3 * (proportion - 0.5));
  }

  float mixer = shape * (u_colorsCount - 1.);
  vec4 gradient = u_colors[0];
  gradient.rgb *= gradient.a;
  float aa = fwidth(shape);
  for (int i = 1; i < ${j.maxColorCount}; i++) {
    if (i >= int(u_colorsCount)) break;
    float m = clamp(mixer - float(i - 1), 0.0, 1.0);

    float localMixerStart = floor(m);
    float softness = .5 * u_softness + fwidth(m);
    float smoothed = smoothstep(max(0., .5 - softness - aa), min(1., .5 + softness + aa), m - localMixerStart);
    float stepped = localMixerStart + smoothed;

    m = mix(stepped, m, u_softness);

    vec4 c = u_colors[i];
    c.rgb *= c.a;
    gradient = mix(gradient, c, m);
  }

  vec3 color = gradient.rgb;
  float opacity = gradient.a;

  ${i.Km}

  fragColor = vec4(color, opacity);
}
`,l={checks:0,stripes:1,edge:2};var m=c(32149),n=c(45262);let o={name:"Default",params:{...g.OZ,rotation:0,speed:1,frame:0,colors:["#121212","#9470ff","#121212","#8838ff"],proportion:.45,softness:1,distortion:.25,swirl:.8,swirlIterations:10,shapeScale:.1,shape:"checks"}};g.OZ,g.OZ,g.OZ,g.OZ,g.OZ;let p=(0,d.memo)(function({speed:a=o.params.speed,frame:b=o.params.frame,colors:c=o.params.colors,proportion:d=o.params.proportion,softness:f=o.params.softness,distortion:i=o.params.distortion,swirl:j=o.params.swirl,swirlIterations:p=o.params.swirlIterations,shapeScale:q=o.params.shapeScale,shape:r=o.params.shape,fit:s=o.params.fit,scale:t=o.params.scale,rotation:u=o.params.rotation,originX:v=o.params.originX,originY:w=o.params.originY,offsetX:x=o.params.offsetX,offsetY:y=o.params.offsetY,worldWidth:z=o.params.worldWidth,worldHeight:A=o.params.worldHeight,...B}){let C={u_colors:c.map(h.G),u_colorsCount:c.length,u_proportion:d,u_softness:f,u_distortion:i,u_swirl:j,u_swirlIterations:p,u_shapeScale:q,u_shape:l[r],u_noiseTexture:(0,m.R)(),u_scale:t,u_rotation:u,u_fit:g.Tk[s],u_offsetX:x,u_offsetY:y,u_originX:v,u_originY:w,u_worldWidth:z,u_worldHeight:A};return(0,n.jsx)(e.f,{...B,speed:a,frame:b,fragmentShader:k,uniforms:C})},f.q)},86935:(a,b,c)=>{"use strict";c.d(b,{yw:()=>n});var d=c(22495),e=c(46452),f=c(46090),g=c(40141),h=c(6983);let i={maxColorCount:10},j=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${i.maxColorCount}];
uniform float u_colorsCount;
uniform float u_bandCount;
uniform float u_twist;
uniform float u_center;
uniform float u_proportion;
uniform float u_softness;
uniform float u_noise;
uniform float u_noiseFrequency;

in vec2 v_objectUV;

out vec4 fragColor;

${h.ES}
${h.V2}
${h.ZB}

void main() {
  vec2 shape_uv = v_objectUV;

  float l = length(shape_uv);
  l = max(1e-4, l);

  float t = u_time;

  float angle = ceil(u_bandCount) * atan(shape_uv.y, shape_uv.x) + t;
  float angle_norm = angle / TWO_PI;

  float twist = 3. * clamp(u_twist, 0., 1.);
  float offset = pow(l, -twist) + angle_norm;

  float shape = fract(offset);
  shape = 1. - abs(2. * shape - 1.);
  shape += u_noise * snoise(15. * pow(u_noiseFrequency, 2.) * shape_uv);

  float mid = smoothstep(.2, .2 + .8 * u_center, pow(l, twist));
  shape = mix(0., shape, mid);

  float proportion = clamp(u_proportion, 0., 1.);
  float exponent = mix(.25, 1., proportion * 2.);
  exponent = mix(exponent, 10., max(0., proportion * 2. - 1.));
  shape = pow(shape, exponent);

  float mixer = shape * u_colorsCount;
  vec4 gradient = u_colors[0];
  gradient.rgb *= gradient.a;

  float outerShape = 0.;
  for (int i = 1; i < ${i.maxColorCount+1}; i++) {
    if (i > int(u_colorsCount)) break;

    float m = clamp(mixer - float(i - 1), 0., 1.);
    float aa = fwidth(m);
    m = smoothstep(.5 - .5 * u_softness - aa, .5 + .5 * u_softness + aa, m);

    if (i == 1) {
      outerShape = m;
    }

    vec4 c = u_colors[i - 1];
    c.rgb *= c.a;
    gradient = mix(gradient, c, m);
  }

  float midAA = .1 * fwidth(pow(l, -twist));
  float outerMid = smoothstep(.2, .2 + midAA, pow(l, twist));
  outerShape = mix(0., outerShape, outerMid);

  vec3 color = gradient.rgb * outerShape;
  float opacity = gradient.a * outerShape;

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1.0 - opacity);
  opacity = opacity + u_colorBack.a * (1.0 - opacity);

  ${h.Km}

  fragColor = vec4(color, opacity);
}
`;var k=c(82247),l=c(45262);let m={name:"Default",params:{...f.J7,speed:.32,frame:0,colorBack:"#330000",colors:["#ffd1d1","#ff8a8a","#660000"],bandCount:4,twist:.1,center:.2,proportion:.5,softness:0,noiseFrequency:.4,noise:.2}};f.J7,f.J7,f.J7;let n=(0,d.memo)(function({speed:a=m.params.speed,frame:b=m.params.frame,colorBack:c=m.params.colorBack,colors:d=m.params.colors,bandCount:h=m.params.bandCount,twist:i=m.params.twist,center:k=m.params.center,proportion:n=m.params.proportion,softness:o=m.params.softness,noiseFrequency:p=m.params.noiseFrequency,noise:q=m.params.noise,fit:r=m.params.fit,rotation:s=m.params.rotation,scale:t=m.params.scale,originX:u=m.params.originX,originY:v=m.params.originY,offsetX:w=m.params.offsetX,offsetY:x=m.params.offsetY,worldWidth:y=m.params.worldWidth,worldHeight:z=m.params.worldHeight,...A}){let B={u_colorBack:(0,g.G)(c),u_colors:d.map(g.G),u_colorsCount:d.length,u_bandCount:h,u_twist:i,u_center:k,u_proportion:n,u_softness:o,u_noiseFrequency:p,u_noise:q,u_fit:f.Tk[r],u_scale:t,u_rotation:s,u_offsetX:w,u_offsetY:x,u_originX:u,u_originY:v,u_worldWidth:y,u_worldHeight:z};return(0,l.jsx)(e.f,{...A,speed:a,frame:b,fragmentShader:j,uniforms:B})},k.q)},87550:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("message-circle",[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]])},87588:(a,b,c)=>{"use strict";c.d(b,{FH:()=>s,xP:()=>u});var d="1.3.25";function e(a,b,c){return Math.max(a,Math.min(b,c))}var f=class{isRunning=!1;value=0;from=0;to=0;currentTime=0;lerp;duration;easing;onUpdate;advance(a){if(!this.isRunning)return;let b=!1;if(this.duration&&this.easing){this.currentTime+=a;let c=e(0,this.currentTime/this.duration,1),d=(b=c>=1)?1:this.easing(c);this.value=this.from+(this.to-this.from)*d}else if(this.lerp){var c,d,f,g;this.value=(c=this.value,d=this.to,f=60*this.lerp,(1-(g=1-Math.exp(-f*a)))*c+g*d),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,b=!0)}else this.value=this.to,b=!0;b&&this.stop(),this.onUpdate?.(this.value,b)}stop(){this.isRunning=!1}fromTo(a,b,{lerp:c,duration:d,easing:e,onStart:f,onUpdate:g}){this.from=this.value=a,this.to=b,this.lerp=c,this.duration=d,this.easing=e,this.currentTime=0,this.isRunning=!0,f?.(),this.onUpdate=g}},g=class{width=0;height=0;scrollHeight=0;scrollWidth=0;debouncedResize;wrapperResizeObserver;contentResizeObserver;constructor(a,b,{autoResize:c=!0,debounce:d=250}={}){this.wrapper=a,this.content=b,c&&(this.debouncedResize=function(a,b){let c;return function(...d){clearTimeout(c),c=setTimeout(()=>{c=void 0,a.apply(this,d)},b)}}(this.resize,d),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}resize=()=>{this.onWrapperResize(),this.onContentResize()};onWrapperResize=()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)};onContentResize=()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)};get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},h=class{events={};emit(a,...b){let c=this.events[a]||[];for(let a=0,d=c.length;a<d;a++)c[a]?.(...b)}on(a,b){return this.events[a]?this.events[a].push(b):this.events[a]=[b],()=>{this.events[a]=this.events[a]?.filter(a=>b!==a)}}off(a,b){this.events[a]=this.events[a]?.filter(a=>b!==a)}destroy(){this.events={}}};let i=100/6,j={passive:!1};function k(a,b){return 1===a?i:2===a?b:1}var l=class{touchStart={x:0,y:0};lastDelta={x:0,y:0};window={width:0,height:0};emitter=new h;constructor(a,b={wheelMultiplier:1,touchMultiplier:1}){this.element=a,this.options=b,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,j),this.element.addEventListener("touchstart",this.onTouchStart,j),this.element.addEventListener("touchmove",this.onTouchMove,j),this.element.addEventListener("touchend",this.onTouchEnd,j)}on(a,b){return this.emitter.on(a,b)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,j),this.element.removeEventListener("touchstart",this.onTouchStart,j),this.element.removeEventListener("touchmove",this.onTouchMove,j),this.element.removeEventListener("touchend",this.onTouchEnd,j)}onTouchStart=a=>{let{clientX:b,clientY:c}=a.targetTouches?a.targetTouches[0]:a;this.touchStart.x=b,this.touchStart.y=c,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:a})};onTouchMove=a=>{let{clientX:b,clientY:c}=a.targetTouches?a.targetTouches[0]:a,d=-(b-this.touchStart.x)*this.options.touchMultiplier,e=-(c-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=b,this.touchStart.y=c,this.lastDelta={x:d,y:e},this.emitter.emit("scroll",{deltaX:d,deltaY:e,event:a})};onTouchEnd=a=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:a})};onWheel=a=>{let{deltaX:b,deltaY:c,deltaMode:d}=a,e=k(d,this.window.width),f=k(d,this.window.height);b*=e,c*=f,b*=this.options.wheelMultiplier,c*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:b,deltaY:c,event:a})};onWindowResize=()=>{this.window={width:window.innerWidth,height:window.innerHeight}}};let m=a=>Math.min(1,1.001-2**(-10*a));var n=class{_isScrolling=!1;_isStopped=!1;_isLocked=!1;_preventNextNativeScrollEvent=!1;_resetVelocityTimeout=null;_rafId=null;_isDraggingSelection=!1;isTouching;isIos;time=0;userData={};lastVelocity=0;velocity=0;direction=0;options;targetScroll;animatedScroll;animate=new f;emitter=new h;dimensions;virtualScroll;constructor({wrapper:a=window,content:b=document.documentElement,eventsTarget:c=a,smoothWheel:e=!0,syncTouch:f=!1,syncTouchLerp:h=.075,touchInertiaExponent:i=1.7,duration:j,easing:k,lerp:n=.1,infinite:o=!1,orientation:p="vertical",gestureOrientation:q="horizontal"===p?"both":"vertical",touchMultiplier:r=1,wheelMultiplier:s=1,autoResize:t=!0,prevent:u,virtualScroll:v,overscroll:w=!0,autoRaf:x=!1,anchors:y=!1,autoToggle:z=!1,allowNestedScroll:A=!1,__experimental__naiveDimensions:B=!1,naiveDimensions:C=B,stopInertiaOnNavigate:D=!1}={}){window.lenisVersion=d,window.lenis||(window.lenis={}),window.lenis.version=d,"horizontal"===p&&(window.lenis.horizontal=!0),!0===f&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),a&&a!==document.documentElement||(a=window),"number"==typeof j&&"function"!=typeof k?k=m:"function"==typeof k&&"number"!=typeof j&&(j=1),this.options={wrapper:a,content:b,eventsTarget:c,smoothWheel:e,syncTouch:f,syncTouchLerp:h,touchInertiaExponent:i,duration:j,easing:k,lerp:n,infinite:o,gestureOrientation:q,orientation:p,touchMultiplier:r,wheelMultiplier:s,autoResize:t,prevent:u,virtualScroll:v,overscroll:w,autoRaf:x,anchors:y,autoToggle:z,allowNestedScroll:A,naiveDimensions:C,stopInertiaOnNavigate:D},this.dimensions=new g(a,b,{autoResize:t}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new l(c,{touchMultiplier:r,wheelMultiplier:s}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(a,b){return this.emitter.on(a,b)}off(a,b){return this.emitter.off(a,b)}onScrollEnd=a=>{a instanceof CustomEvent||"smooth"!==this.isScrolling&&!1!==this.isScrolling||a.stopPropagation()};dispatchScrollendEvent=()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))};get overflow(){let a=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[a]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}onTransitionEnd=a=>{a.propertyName?.includes("overflow")&&a.target===this.rootElement&&this.checkOverflow()};setScroll(a){this.isHorizontal?this.options.wrapper.scrollTo({left:a,behavior:"instant"}):this.options.wrapper.scrollTo({top:a,behavior:"instant"})}onClick=a=>{let b=a.composedPath().filter(a=>a instanceof HTMLAnchorElement&&a.href).map(a=>new URL(a.href)),c=new URL(window.location.href);if(this.options.anchors){let a=b.find(a=>c.host===a.host&&c.pathname===a.pathname&&a.hash);if(a){let b="object"==typeof this.options.anchors&&this.options.anchors?this.options.anchors:void 0,c=decodeURIComponent(a.hash);this.scrollTo(c,b);return}}if(this.options.stopInertiaOnNavigate&&b.some(a=>c.host===a.host&&c.pathname!==a.pathname))return void this.reset()};onPointerDown=a=>{1===a.button&&this.reset()};isTouchOnSelectionHandle(a){let b=window.getSelection();if(!b||b.isCollapsed||0===b.rangeCount)return!1;let c=a.targetTouches[0]??a.changedTouches[0];if(!c)return!1;let d=b.getRangeAt(0).getClientRects();if(0===d.length)return!1;let e=d[0],f=d[d.length-1],g=40>=Math.hypot(c.clientX-e.left,c.clientY-e.top),h=40>=Math.hypot(c.clientX-f.right,c.clientY-f.bottom);return g||h}onVirtualScroll=a=>{if("function"==typeof this.options.virtualScroll&&!1===this.options.virtualScroll(a))return;let{deltaX:b,deltaY:c,event:d}=a;if(this.emitter.emit("virtual-scroll",{deltaX:b,deltaY:c,event:d}),d.ctrlKey||d.lenisStopPropagation)return;let e=d.type.includes("touch"),f=d.type.includes("wheel");if(e&&this.isIos&&("touchstart"===d.type&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(d)),this._isDraggingSelection)){"touchend"===d.type&&(this._isDraggingSelection=!1);return}this.isTouching="touchstart"===d.type||"touchmove"===d.type;let g=0===b&&0===c;if(this.options.syncTouch&&e&&"touchstart"===d.type&&g&&!this.isStopped&&!this.isLocked)return void this.reset();let h="vertical"===this.options.gestureOrientation&&0===c||"horizontal"===this.options.gestureOrientation&&0===b;if(g||h)return;let i=d.composedPath();i=i.slice(0,i.indexOf(this.rootElement));let j=this.options.prevent,k=Math.abs(b)>=Math.abs(c)?"horizontal":"vertical";if(i.find(a=>a instanceof HTMLElement&&("function"==typeof j&&j?.(a)||a.hasAttribute?.("data-lenis-prevent")||"vertical"===k&&a.hasAttribute?.("data-lenis-prevent-vertical")||"horizontal"===k&&a.hasAttribute?.("data-lenis-prevent-horizontal")||e&&a.hasAttribute?.("data-lenis-prevent-touch")||f&&a.hasAttribute?.("data-lenis-prevent-wheel")||this.options.allowNestedScroll&&this.hasNestedScroll(a,{deltaX:b,deltaY:c}))))return;if(this.isStopped||this.isLocked){d.cancelable&&d.preventDefault();return}if(!(this.options.syncTouch&&e||this.options.smoothWheel&&f)){this.isScrolling="native",this.animate.stop(),d.lenisStopPropagation=!0;return}let l=c;"both"===this.options.gestureOrientation?l=Math.abs(c)>Math.abs(b)?c:b:"horizontal"===this.options.gestureOrientation&&(l=b),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||0===this.animatedScroll&&c>0||this.animatedScroll===this.limit&&c<0))&&(d.lenisStopPropagation=!0),d.cancelable&&d.preventDefault();let m=e&&this.options.syncTouch,n=e&&"touchend"===d.type;n&&(l=Math.sign(l)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+l,{programmatic:!1,...m?{lerp:n?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})};resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}onNativeScroll=()=>{if(null!==this._resetVelocityTimeout&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(!1===this.isScrolling||"native"===this.isScrolling){let a=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-a,this.direction=Math.sign(this.animatedScroll-a),this.isStopped||(this.isScrolling="native"),this.emit(),0!==this.velocity&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}};reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle)return void this.rootElement.style.removeProperty("overflow");this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle)return void this.rootElement.style.setProperty("overflow","clip");this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}raf=a=>{let b=a-(this.time||a);this.time=a,this.animate.advance(.001*b),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))};scrollTo(a,{offset:b=0,immediate:c=!1,lock:d=!1,programmatic:f=!0,lerp:g=f?this.options.lerp:void 0,duration:h=f?this.options.duration:void 0,easing:i=f?this.options.easing:void 0,onStart:j,onComplete:k,force:l=!1,userData:n}={}){if((this.isStopped||this.isLocked)&&!l)return;let o=a,p=b;if("string"==typeof o&&["top","left","start","#"].includes(o))o=0;else if("string"==typeof o&&["bottom","right","end"].includes(o))o=this.limit;else{let a=null;if("string"==typeof o?(a=o.startsWith("#")?document.getElementById(o.slice(1)):document.querySelector(o))||("#top"===o?o=0:console.warn("Lenis: Target not found",o)):o instanceof HTMLElement&&o?.nodeType&&(a=o),a){if(this.options.wrapper!==window){let a=this.rootElement.getBoundingClientRect();p-=this.isHorizontal?a.left:a.top}let b=a.getBoundingClientRect(),c=getComputedStyle(a),d=this.isHorizontal?Number.parseFloat(c.scrollMarginLeft):Number.parseFloat(c.scrollMarginTop),e=getComputedStyle(this.rootElement),f=this.isHorizontal?Number.parseFloat(e.scrollPaddingLeft):Number.parseFloat(e.scrollPaddingTop);o=(this.isHorizontal?b.left:b.top)+this.animatedScroll-(Number.isNaN(d)?0:d)-(Number.isNaN(f)?0:f)}}if("number"==typeof o){if(o+=p,this.options.infinite){if(f){this.targetScroll=this.animatedScroll=this.scroll;let a=o-this.animatedScroll;a>this.limit/2?o-=this.limit:a<-this.limit/2&&(o+=this.limit)}}else o=e(0,o,this.limit);if(o===this.targetScroll){j?.(this),k?.(this);return}if(this.userData=n??{},c){this.animatedScroll=this.targetScroll=o,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),k?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}f||(this.targetScroll=o),"number"==typeof h&&"function"!=typeof i?i=m:"function"==typeof i&&"number"!=typeof h&&(h=1),this.animate.fromTo(this.animatedScroll,o,{duration:h,easing:i,lerp:g,onStart:()=>{d&&(this.isLocked=!0),this.isScrolling="smooth",j?.(this)},onUpdate:(a,b)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=a-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=a,this.setScroll(this.scroll),f&&(this.targetScroll=a),b||this.emit(),b&&(this.reset(),this.emit(),k?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(a,{deltaX:b,deltaY:c}){let d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t=Date.now();a._lenis||(a._lenis={});let u=a._lenis;if(t-(u.time??0)>2e3){u.time=Date.now();let b=window.getComputedStyle(a);if(u.computedStyle=b,d=["auto","overlay","scroll"].includes(b.overflowX),e=["auto","overlay","scroll"].includes(b.overflowY),h=["auto"].includes(b.overscrollBehaviorX),i=["auto"].includes(b.overscrollBehaviorY),u.hasOverflowX=d,u.hasOverflowY=e,!(d||e))return!1;j=a.scrollWidth,k=a.scrollHeight,l=a.clientWidth,m=a.clientHeight,f=j>l,g=k>m,u.isScrollableX=f,u.isScrollableY=g,u.scrollWidth=j,u.scrollHeight=k,u.clientWidth=l,u.clientHeight=m,u.hasOverscrollBehaviorX=h,u.hasOverscrollBehaviorY=i}else f=u.isScrollableX,g=u.isScrollableY,d=u.hasOverflowX,e=u.hasOverflowY,j=u.scrollWidth,k=u.scrollHeight,l=u.clientWidth,m=u.clientHeight,h=u.hasOverscrollBehaviorX,i=u.hasOverscrollBehaviorY;if(!(d&&f||e&&g))return!1;let v=Math.abs(b)>=Math.abs(c)?"horizontal":"vertical";if("horizontal"===v)n=Math.round(a.scrollLeft),o=j-l,p=b,q=d,r=f,s=h;else{if("vertical"!==v)return!1;n=Math.round(a.scrollTop),o=k-m,p=c,q=e,r=g,s=i}return!s&&(n>=o||n<=0)||(p>0?n<o:n>0)&&q&&r}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return"horizontal"===this.options.orientation}get actualScroll(){let a=this.options.wrapper;return this.isHorizontal?a.scrollX??a.scrollLeft:a.scrollY??a.scrollTop}get scroll(){var a;return this.options.infinite?(this.animatedScroll%(a=this.limit)+a)%a:this.animatedScroll}get progress(){return 0===this.limit?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(a){this._isScrolling!==a&&(this._isScrolling=a,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(a){this._isStopped!==a&&(this._isStopped=a,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(a){this._isLocked!==a&&(this._isLocked=a,this.updateClassName())}get isSmooth(){return"smooth"===this.isScrolling}get className(){let a="lenis";return this.options.autoToggle&&(a+=" lenis-autoToggle"),this.isStopped&&(a+=" lenis-stopped"),this.isLocked&&(a+=" lenis-locked"),this.isScrolling&&(a+=" lenis-scrolling"),"smooth"===this.isScrolling&&(a+=" lenis-smooth"),a}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(a=>{this.rootElement.classList.add(a)})}cleanUpClassName(){for(let a of Array.from(this.rootElement.classList))("lenis"===a||a.startsWith("lenis-"))&&this.rootElement.classList.remove(a)}},o=c(22495),p=c(45262);let q=(0,o.createContext)(null),r=new class{constructor(a){this.listeners=[],this.state=a}set(a){for(let b of(this.state=a,this.listeners))b(this.state)}subscribe(a){return this.listeners=[...this.listeners,a],()=>{this.listeners=this.listeners.filter(b=>b!==a)}}get(){return this.state}}(null),s=(0,o.forwardRef)(({children:a,root:b=!1,options:c={},autoRaf:d=!0,className:e="",...f},g)=>{let h=(0,o.useRef)(null),i=(0,o.useRef)(null),[j,k]=(0,o.useState)(void 0);(0,o.useImperativeHandle)(g,()=>({wrapper:h.current,content:i.current,lenis:j}),[j]),(0,o.useEffect)(()=>{let a=new n({...c,...h.current&&i.current&&{wrapper:h.current,content:i.current},autoRaf:c?.autoRaf??d});return k(a),()=>{a.destroy(),k(void 0)}},[d,JSON.stringify({...c,wrapper:null,content:null})]);let l=(0,o.useRef)([]),m=(0,o.useCallback)((a,b)=>{l.current.push({callback:a,priority:b}),l.current.sort((a,b)=>a.priority-b.priority)},[]),s=(0,o.useCallback)(a=>{l.current=l.current.filter(b=>b.callback!==a)},[]);return((0,o.useEffect)(()=>{if(b&&j)return r.set({lenis:j,addCallback:m,removeCallback:s}),()=>r.set(null)},[b,j,m,s]),(0,o.useEffect)(()=>{if(!j)return;let a=a=>{for(let{callback:b}of l.current)b(a)};return j.on("scroll",a),()=>{j.off("scroll",a)}},[j]),a)?(0,p.jsx)(q.Provider,{value:{lenis:j,addCallback:m,removeCallback:s},children:b&&"asChild"!==b?a:(0,p.jsx)("div",{ref:h,className:`${e} ${j?.className??""}`.trim(),...f,children:(0,p.jsx)("div",{ref:i,children:a})})}):null}),t={};function u(a,b=[],c=0){let d=(0,o.useContext)(q),e=function(a){let[b,c]=(0,o.useState)(a.get());return b}(r),{lenis:f,addCallback:g,removeCallback:h}=d??e??t;return f}},88196:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("inbox",[["polyline",{points:"22 12 16 12 14 15 10 15 8 12 2 12",key:"o97t9d"}],["path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",key:"oot6mr"}]])},88493:(a,b,c)=>{"use strict";c.d(b,{Sy:()=>n});var d=c(22495),e=c(46452),f=c(82247),g=c(46090),h=c(40141),i=c(6983);let j={maxColorCount:10},k=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colors[${j.maxColorCount}];
uniform float u_colorsCount;

uniform float u_distortion;
uniform float u_swirl;
uniform float u_grainMixer;
uniform float u_grainOverlay;

in vec2 v_objectUV;
out vec4 fragColor;

${i.ES}
${i.ZB}
${i.tZ}

float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

float noise(vec2 n, vec2 seedOffset) {
  return valueNoise(n + seedOffset);
}

vec2 getPosition(int i, float t) {
  float a = float(i) * .37;
  float b = .6 + fract(float(i) / 3.) * .9;
  float c = .8 + fract(float(i + 1) / 4.);

  float x = sin(t * b + a);
  float y = cos(t * c + a * 1.5);

  return .5 + .5 * vec2(x, y);
}

void main() {
  vec2 uv = v_objectUV;
  uv += .5;
  vec2 grainUV = uv * 1000.;

  float grain = noise(grainUV, vec2(0.));
  float mixerGrain = .4 * u_grainMixer * (grain - .5);

  const float firstFrameOffset = 41.5;
  float t = .5 * (u_time + firstFrameOffset);

  float radius = smoothstep(0., 1., length(uv - .5));
  float center = 1. - radius;
  for (float i = 1.; i <= 2.; i++) {
    uv.x += u_distortion * center / i * sin(t + i * .4 * smoothstep(.0, 1., uv.y)) * cos(.2 * t + i * 2.4 * smoothstep(.0, 1., uv.y));
    uv.y += u_distortion * center / i * cos(t + i * 2. * smoothstep(.0, 1., uv.x));
  }

  vec2 uvRotated = uv;
  uvRotated -= vec2(.5);
  float angle = 3. * u_swirl * radius;
  uvRotated = rotate(uvRotated, -angle);
  uvRotated += vec2(.5);

  vec3 color = vec3(0.);
  float opacity = 0.;
  float totalWeight = 0.;

  for (int i = 0; i < ${j.maxColorCount}; i++) {
    if (i >= int(u_colorsCount)) break;

    vec2 pos = getPosition(i, t) + mixerGrain;
    vec3 colorFraction = u_colors[i].rgb * u_colors[i].a;
    float opacityFraction = u_colors[i].a;

    float dist = length(uvRotated - pos);

    dist = pow(dist, 3.5);
    float weight = 1. / (dist + 1e-3);
    color += colorFraction * weight;
    opacity += opacityFraction * weight;
    totalWeight += weight;
  }

  color /= max(1e-4, totalWeight);
  opacity /= max(1e-4, totalWeight);

  float grainOverlay = valueNoise(rotate(grainUV, 1.) + vec2(3.));
  grainOverlay = mix(grainOverlay, valueNoise(rotate(grainUV, 2.) + vec2(-1.)), .5);
  grainOverlay = pow(grainOverlay, 1.3);

  float grainOverlayV = grainOverlay * 2. - 1.;
  vec3 grainOverlayColor = vec3(step(0., grainOverlayV));
  float grainOverlayStrength = u_grainOverlay * abs(grainOverlayV);
  grainOverlayStrength = pow(grainOverlayStrength, .8);
  color = mix(color, grainOverlayColor, .35 * grainOverlayStrength);

  opacity += .5 * grainOverlayStrength;
  opacity = clamp(opacity, 0., 1.);

  fragColor = vec4(color, opacity);
}
`;var l=c(45262);let m={name:"Default",params:{...g.J7,speed:1,frame:0,colors:["#e0eaff","#241d9a","#f75092","#9f50d3"],distortion:.8,swirl:.1,grainMixer:0,grainOverlay:0}};g.J7,g.J7,g.J7;let n=(0,d.memo)(function({speed:a=m.params.speed,frame:b=m.params.frame,colors:c=m.params.colors,distortion:d=m.params.distortion,swirl:f=m.params.swirl,grainMixer:i=m.params.grainMixer,grainOverlay:j=m.params.grainOverlay,fit:n=m.params.fit,rotation:o=m.params.rotation,scale:p=m.params.scale,originX:q=m.params.originX,originY:r=m.params.originY,offsetX:s=m.params.offsetX,offsetY:t=m.params.offsetY,worldWidth:u=m.params.worldWidth,worldHeight:v=m.params.worldHeight,...w}){let x={u_colors:c.map(h.G),u_colorsCount:c.length,u_distortion:d,u_swirl:f,u_grainMixer:i,u_grainOverlay:j,u_fit:g.Tk[n],u_rotation:o,u_scale:p,u_offsetX:s,u_offsetY:t,u_originX:q,u_originY:r,u_worldWidth:u,u_worldHeight:v};return(0,l.jsx)(e.f,{...w,speed:a,frame:b,fragmentShader:k,uniforms:x})},f.q)},89298:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("arrow-left-to-line",[["path",{d:"M3 19V5",key:"rwsyhb"}],["path",{d:"m13 6-6 6 6 6",key:"1yhaz7"}],["path",{d:"M7 12h14",key:"uoisry"}]])},90336:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0}),Object.defineProperty(b,"default",{enumerable:!0,get:function(){return e}});let d=c(1763)._(c(47176));function e(a,b){var c;let e={};"function"==typeof a&&(e.loader=a);let f={...e,...b};return(0,d.default)({...f,modules:null==(c=f.loadableGenerated)?void 0:c.modules})}("function"==typeof b.default||"object"==typeof b.default&&null!==b.default)&&void 0===b.default.__esModule&&(Object.defineProperty(b.default,"__esModule",{value:!0}),Object.assign(b.default,b),a.exports=b.default)},91194:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("credit-card",[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]])},91699:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("rotate-ccw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]])},92827:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("trending-up",[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]])},93683:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("trash-2",[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]])},95210:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("flag",[["path",{d:"M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528",key:"1jaruq"}]])},95565:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("ellipsis",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]])},95969:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("scroll-text",[["path",{d:"M15 12h-5",key:"r7krc0"}],["path",{d:"M15 8h-5",key:"1khuty"}],["path",{d:"M19 17V5a2 2 0 0 0-2-2H4",key:"zz82l3"}],["path",{d:"M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3",key:"1ph1d7"}]])},96064:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("shield-check",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]])},96078:(a,b,c)=>{"use strict";c.d(b,{yU:()=>o});var d=c(22495),e=c(46452),f=c(46090),g=c(40141),h=c(6983);let i={maxColorCount:7},j=`#version 300 es
precision lowp float;

uniform mediump float u_time;
uniform mediump vec2 u_resolution;
uniform mediump float u_pixelRatio;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${i.maxColorCount}];
uniform float u_colorsCount;
uniform float u_softness;
uniform float u_intensity;
uniform float u_noise;
uniform float u_shape;

uniform mediump float u_originX;
uniform mediump float u_originY;
uniform mediump float u_worldWidth;
uniform mediump float u_worldHeight;
uniform mediump float u_fit;

uniform mediump float u_scale;
uniform mediump float u_rotation;
uniform mediump float u_offsetX;
uniform mediump float u_offsetY;

in vec2 v_objectUV;
in vec2 v_patternUV;
in vec2 v_objectBoxSize;
in vec2 v_patternBoxSize;

out vec4 fragColor;

${h.ES}
${h.V2}
${h.ZB}
${h.nI}

float valueNoiseR(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = randomR(i);
  float b = randomR(i + vec2(1.0, 0.0));
  float c = randomR(i + vec2(0.0, 1.0));
  float d = randomR(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}
vec4 fbmR(vec2 n0, vec2 n1, vec2 n2, vec2 n3) {
  float amplitude = 0.2;
  vec4 total = vec4(0.);
  for (int i = 0; i < 3; i++) {
    n0 = rotate(n0, 0.3);
    n1 = rotate(n1, 0.3);
    n2 = rotate(n2, 0.3);
    n3 = rotate(n3, 0.3);
    total.x += valueNoiseR(n0) * amplitude;
    total.y += valueNoiseR(n1) * amplitude;
    total.z += valueNoiseR(n2) * amplitude;
    total.z += valueNoiseR(n3) * amplitude;
    n0 *= 1.99;
    n1 *= 1.99;
    n2 *= 1.99;
    n3 *= 1.99;
    amplitude *= 0.6;
  }
  return total;
}

${h.m0}

vec2 truchet(vec2 uv, float idx){
  idx = fract(((idx - .5) * 2.));
  if (idx > 0.75) {
    uv = vec2(1.0) - uv;
  } else if (idx > 0.5) {
    uv = vec2(1.0 - uv.x, uv.y);
  } else if (idx > 0.25) {
    uv = 1.0 - vec2(1.0 - uv.x, uv.y);
  }
  return uv;
}

void main() {

  const float firstFrameOffset = 7.;
  float t = .1 * (u_time + firstFrameOffset);

  vec2 shape_uv = vec2(0.);
  vec2 grain_uv = vec2(0.);

  float r = u_rotation * PI / 180.;
  float cr = cos(r);
  float sr = sin(r);
  mat2 graphicRotation = mat2(cr, sr, -sr, cr);
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);

  if (u_shape > 3.5) {
    shape_uv = v_objectUV;
    grain_uv = shape_uv;

    // apply inverse transform to grain_uv so it respects the originXY
    grain_uv = transpose(graphicRotation) * grain_uv;
    grain_uv *= u_scale;
    grain_uv -= graphicOffset;
    grain_uv *= v_objectBoxSize;
    grain_uv *= .7;
  } else {
    shape_uv = .5 * v_patternUV;
    grain_uv = 100. * v_patternUV;

    // apply inverse transform to grain_uv so it respects the originXY
    grain_uv = transpose(graphicRotation) * grain_uv;
    grain_uv *= u_scale;
    if (u_fit > 0.) {
      vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
      givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
      float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
      vec2 patternBoxGivenSize = vec2(
      (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
      (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
      );
      patternBoxRatio = patternBoxGivenSize.x / patternBoxGivenSize.y;
      float patternBoxNoFitBoxWidth = patternBoxRatio * min(patternBoxGivenSize.x / patternBoxRatio, patternBoxGivenSize.y);
      grain_uv /= (patternBoxNoFitBoxWidth / v_patternBoxSize.x);
    }
    vec2 patternBoxScale = u_resolution.xy / v_patternBoxSize;
    grain_uv -= graphicOffset / patternBoxScale;
    grain_uv *= 1.6;
  }


  float shape = 0.;

  if (u_shape < 1.5) {
    // Sine wave

    float wave = cos(.5 * shape_uv.x - 4. * t) * sin(1.5 * shape_uv.x + 2. * t) * (.75 + .25 * cos(6. * t));
    shape = 1. - smoothstep(-1., 1., shape_uv.y + wave);

  } else if (u_shape < 2.5) {
    // Grid (dots)

    float stripeIdx = floor(2. * shape_uv.x / TWO_PI);
    float rand = hash11(stripeIdx * 100.);
    rand = sign(rand - .5) * pow(4. * abs(rand), .3);
    shape = sin(shape_uv.x) * cos(shape_uv.y - 5. * rand * t);
    shape = pow(abs(shape), 4.);

  } else if (u_shape < 3.5) {
    // Truchet pattern

    float n2 = valueNoiseR(shape_uv * .4 - 3.75 * t);
    shape_uv.x += 10.;
    shape_uv *= .6;

    vec2 tile = truchet(fract(shape_uv), randomR(floor(shape_uv)));

    float distance1 = length(tile);
    float distance2 = length(tile - vec2(1.));

    n2 -= .5;
    n2 *= .1;
    shape = smoothstep(.2, .55, distance1 + n2) * (1. - smoothstep(.45, .8, distance1 - n2));
    shape += smoothstep(.2, .55, distance2 + n2) * (1. - smoothstep(.45, .8, distance2 - n2));

    shape = pow(shape, 1.5);

  } else if (u_shape < 4.5) {
    // Corners

    shape_uv *= .6;
    vec2 outer = vec2(.5);

    vec2 bl = smoothstep(vec2(0.), outer, shape_uv + vec2(.1 + .1 * sin(3. * t), .2 - .1 * sin(5.25 * t)));
    vec2 tr = smoothstep(vec2(0.), outer, 1. - shape_uv);
    shape = 1. - bl.x * bl.y * tr.x * tr.y;

    shape_uv = -shape_uv;
    bl = smoothstep(vec2(0.), outer, shape_uv + vec2(.1 + .1 * sin(3. * t), .2 - .1 * cos(5.25 * t)));
    tr = smoothstep(vec2(0.), outer, 1. - shape_uv);
    shape -= bl.x * bl.y * tr.x * tr.y;

    shape = 1. - smoothstep(0., 1., shape);

  } else if (u_shape < 5.5) {
    // Ripple

    shape_uv *= 2.;
    float dist = length(.4 * shape_uv);
    float waves = sin(pow(dist, 1.2) * 5. - 3. * t) * .5 + .5;
    shape = waves;

  } else if (u_shape < 6.5) {
    // Blob

    t *= 2.;

    vec2 f1_traj = .25 * vec2(1.3 * sin(t), .2 + 1.3 * cos(.6 * t + 4.));
    vec2 f2_traj = .2 * vec2(1.2 * sin(-t), 1.3 * sin(1.6 * t));
    vec2 f3_traj = .25 * vec2(1.7 * cos(-.6 * t), cos(-1.6 * t));
    vec2 f4_traj = .3 * vec2(1.4 * cos(.8 * t), 1.2 * sin(-.6 * t - 3.));

    shape = .5 * pow(1. - clamp(0., 1., length(shape_uv + f1_traj)), 5.);
    shape += .5 * pow(1. - clamp(0., 1., length(shape_uv + f2_traj)), 5.);
    shape += .5 * pow(1. - clamp(0., 1., length(shape_uv + f3_traj)), 5.);
    shape += .5 * pow(1. - clamp(0., 1., length(shape_uv + f4_traj)), 5.);

    shape = smoothstep(.0, .9, shape);
    float edge = smoothstep(.25, .3, shape);
    shape = mix(.0, shape, edge);

  } else {
    // Sphere

    shape_uv *= 2.;
    float d = 1. - pow(length(shape_uv), 2.);
    vec3 pos = vec3(shape_uv, sqrt(max(d, 0.)));
    vec3 lightPos = normalize(vec3(cos(1.5 * t), .8, sin(1.25 * t)));
    shape = .5 + .5 * dot(lightPos, pos);
    shape *= step(0., d);
  }

  float baseNoise = snoise(grain_uv * .5);
  vec4 fbmVals = fbmR(
  .002 * grain_uv + 10.,
  .003 * grain_uv,
  .001 * grain_uv,
  rotate(.4 * grain_uv, 2.)
  );
  float grainDist = baseNoise * snoise(grain_uv * .2) - fbmVals.x - fbmVals.y;
  float rawNoise = .75 * baseNoise - fbmVals.w - fbmVals.z;
  float noise = clamp(rawNoise, 0., 1.);

  shape += u_intensity * 2. / u_colorsCount * (grainDist + .5);
  shape += u_noise * 10. / u_colorsCount * noise;

  float aa = fwidth(shape);

  shape = clamp(shape - .5 / u_colorsCount, 0., 1.);
  float totalShape = smoothstep(0., u_softness + 2. * aa, clamp(shape * u_colorsCount, 0., 1.));
  float mixer = shape * (u_colorsCount - 1.);

  int cntStop = int(u_colorsCount) - 1;
  vec4 gradient = u_colors[0];
  gradient.rgb *= gradient.a;
  for (int i = 1; i < ${i.maxColorCount}; i++) {
    if (i > cntStop) break;

    float localT = clamp(mixer - float(i - 1), 0., 1.);
    localT = smoothstep(.5 - .5 * u_softness - aa, .5 + .5 * u_softness + aa, localT);

    vec4 c = u_colors[i];
    c.rgb *= c.a;
    gradient = mix(gradient, c, localT);
  }

  vec3 color = gradient.rgb * totalShape;
  float opacity = gradient.a * totalShape;

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1.0 - opacity);
  opacity = opacity + u_colorBack.a * (1.0 - opacity);

  fragColor = vec4(color, opacity);
}
`,k={wave:1,dots:2,truchet:3,corners:4,ripple:5,blob:6,sphere:7};var l=c(32149),m=c(45262);let n={name:"Default",params:{...f.J7,speed:1,frame:0,colorBack:"#000000",colors:["#7300ff","#eba8ff","#00bfff","#2a00ff"],softness:.5,intensity:.5,noise:.25,shape:"corners"}};f.OZ,f.OZ,f.OZ,f.J7,f.J7;let o=(0,d.memo)(function({speed:a=n.params.speed,frame:b=n.params.frame,colorBack:c=n.params.colorBack,colors:d=n.params.colors,softness:h=n.params.softness,intensity:i=n.params.intensity,noise:o=n.params.noise,shape:p=n.params.shape,fit:q=n.params.fit,scale:r=n.params.scale,rotation:s=n.params.rotation,originX:t=n.params.originX,originY:u=n.params.originY,offsetX:v=n.params.offsetX,offsetY:w=n.params.offsetY,worldWidth:x=n.params.worldWidth,worldHeight:y=n.params.worldHeight,...z}){let A={u_colorBack:(0,g.G)(c),u_colors:d.map(g.G),u_colorsCount:d.length,u_softness:h,u_intensity:i,u_noise:o,u_shape:k[p],u_noiseTexture:(0,l.R)(),u_fit:f.Tk[q],u_scale:r,u_rotation:s,u_offsetX:v,u_offsetY:w,u_originX:t,u_originY:u,u_worldWidth:x,u_worldHeight:y};return(0,m.jsx)(e.f,{...z,speed:a,frame:b,fragmentShader:j,uniforms:A})})},97060:(a,b,c)=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0}),Object.defineProperty(b,"PreloadChunks",{enumerable:!0,get:function(){return h}});let d=c(45262),e=c(47574),f=c(29294),g=c(80646);function h(a){let{moduleIds:b}=a,c=f.workAsyncStorage.getStore();if(void 0===c)return null;let h=[];if(c.reactLoadableManifest&&b){let a=c.reactLoadableManifest;for(let c of b){if(!a[c])continue;let b=a[c].files;h.push(...b)}}return 0===h.length?null:(0,d.jsx)(d.Fragment,{children:h.map(a=>{let b=c.assetPrefix+"/_next/"+(0,g.encodeURIPath)(a);return a.endsWith(".css")?(0,d.jsx)("link",{precedence:"dynamic",href:b,rel:"stylesheet",as:"style"},a):((0,e.preload)(b,{as:"script",fetchPriority:"low"}),null)})})}},97342:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("send",[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]])},97865:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("file-play",[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M15.033 13.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56v-4.704a.645.645 0 0 1 .967-.56z",key:"1tzo1f"}]])},97883:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("circle-check",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]])},98916:(a,b,c)=>{"use strict";c.d(b,{o:()=>k});var d=c(45262),e=c(22495),f=c(10108);let g=(0,e.createContext)(null);var h=c(3483),i=c(69175);let j=a=>!a.isLayoutDirty&&a.willUpdate(!1),k=({children:a,id:b,inherit:c=!0})=>{let k=(0,e.useContext)(f.L),l=(0,e.useContext)(g),[m,n]=function(){let a=function(){let a=(0,e.useRef)(!1);return(0,h.E)(()=>(a.current=!0,()=>{a.current=!1}),[]),a}(),[b,c]=(0,e.useState)(0),d=(0,e.useCallback)(()=>{a.current&&c(b+1)},[b]);return[(0,e.useCallback)(()=>i.Gt.postRender(d),[d]),b]}(),o=(0,e.useRef)(null),p=k.id||l;null===o.current&&((a=>!0==(!0===a)||"id"===a)(c)&&p&&(b=b?p+"-"+b:p),o.current={id:b,group:!0===c&&k.group||function(){let a=new Set,b=new WeakMap,c=()=>a.forEach(j);return{add:d=>{a.add(d),b.set(d,d.addEventListener("willUpdate",c))},remove:d=>{a.delete(d);let e=b.get(d);e&&(e(),b.delete(d)),c()},dirty:c}}()});let q=(0,e.useMemo)(()=>({...o.current,forceRender:m}),[n]);return(0,d.jsx)(f.L.Provider,{value:q,children:a})}},99323:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("file-spreadsheet",[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M8 13h2",key:"yr2amv"}],["path",{d:"M14 13h2",key:"un5t4a"}],["path",{d:"M8 17h2",key:"2yhykz"}],["path",{d:"M14 17h2",key:"10kma7"}]])},99405:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("repeat",[["path",{d:"m17 2 4 4-4 4",key:"nntrym"}],["path",{d:"M3 11v-1a4 4 0 0 1 4-4h14",key:"84bu3i"}],["path",{d:"m7 22-4-4 4-4",key:"1wqhfi"}],["path",{d:"M21 13v1a4 4 0 0 1-4 4H3",key:"1rx37r"}]])},99505:(a,b,c)=>{"use strict";c.d(b,{kp:()=>o});var d=c(22495),e=c(46452),f=c(82247),g=c(46090),h=c(40141),i=c(32149),j=c(6983);let k={maxColorCount:5},l=`#version 300 es
precision mediump float;

uniform float u_time;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colorBack;
uniform vec4 u_colorBloom;
uniform vec4 u_colors[${k.maxColorCount}];
uniform float u_colorsCount;

uniform float u_density;
uniform float u_spotty;
uniform float u_midSize;
uniform float u_midIntensity;
uniform float u_intensity;
uniform float u_bloom;

in vec2 v_objectUV;

out vec4 fragColor;

${j.ES}
${j.ZB}
${j.nI}
float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = randomR(i);
  float b = randomR(i + vec2(1.0, 0.0));
  float c = randomR(i + vec2(0.0, 1.0));
  float d = randomR(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

${j.m0}

float raysShape(vec2 uv, float r, float freq, float intensity, float radius) {
  float a = atan(uv.y, uv.x);
  vec2 left = vec2(a * freq, r);
  vec2 right = vec2(fract(a / TWO_PI) * TWO_PI * freq, r);
  float n_left = pow(valueNoise(left), intensity);
  float n_right = pow(valueNoise(right), intensity);
  float shape = mix(n_right, n_left, smoothstep(-.15, .15, uv.x));
  return shape;
}

void main() {
  vec2 shape_uv = v_objectUV;

  float t = .2 * u_time;

  float radius = length(shape_uv);
  float spots = 6.5 * abs(u_spotty);

  float intensity = 4. - 3. * clamp(u_intensity, 0., 1.);

  float delta = 1. - smoothstep(0., 1., radius);

  float midSize = 10. * abs(u_midSize);
  float ms_lo = 0.02 * midSize;
  float ms_hi = max(midSize, 1e-6);
  float middleShape = pow(u_midIntensity, 0.3) * (1. - smoothstep(ms_lo, ms_hi, 3.0 * radius));
  middleShape = pow(middleShape, 5.0);

  vec3 accumColor = vec3(0.0);
  float accumAlpha = 0.0;

  for (int i = 0; i < ${k.maxColorCount}; i++) {
    if (i >= int(u_colorsCount)) break;

    vec2 rotatedUV = rotate(shape_uv, float(i) + 1.0);

    float r1 = radius * (1.0 + 0.4 * float(i)) - 3.0 * t;
    float r2 = 0.5 * radius * (1.0 + spots) - 2.0 * t;
    float density = 6. * u_density + step(.5, u_density) * pow(4.5 * (u_density - .5), 4.);
    float f = mix(1.0, 3.0 + 0.5 * float(i), hash11(float(i) * 15.)) * density;

    float ray = raysShape(rotatedUV, r1, 5.0 * f, intensity, radius);
    ray *= raysShape(rotatedUV, r2, 4.0 * f, intensity, radius);
    ray += (1. + 4. * ray) * middleShape;
    ray = clamp(ray, 0.0, 1.0);

    float srcAlpha = u_colors[i].a * ray;
    vec3 srcColor = u_colors[i].rgb * srcAlpha;

    vec3 alphaBlendColor = accumColor + (1.0 - accumAlpha) * srcColor;
    float alphaBlendAlpha = accumAlpha + (1.0 - accumAlpha) * srcAlpha;

    vec3 addBlendColor = accumColor + srcColor;
    float addBlendAlpha = accumAlpha + srcAlpha;

    accumColor = mix(alphaBlendColor, addBlendColor, u_bloom);
    accumAlpha = mix(alphaBlendAlpha, addBlendAlpha, u_bloom);
  }

  float overlayAlpha = u_colorBloom.a;
  vec3 overlayColor = u_colorBloom.rgb * overlayAlpha;

  vec3 colorWithOverlay = accumColor + accumAlpha * overlayColor;
  accumColor = mix(accumColor, colorWithOverlay, u_bloom);

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;

  vec3 color = accumColor + (1. - accumAlpha) * bgColor;
  float opacity = accumAlpha + (1. - accumAlpha) * u_colorBack.a;
  color = clamp(color, 0., 1.);
  opacity = clamp(opacity, 0., 1.);

  ${j.Km}

  fragColor = vec4(color, opacity);
}
`;var m=c(45262);let n={name:"Default",params:{...g.J7,offsetX:0,offsetY:-.55,colorBack:"#000000",colorBloom:"#0000ff",colors:["#a600ff6e","#6200fff0","#ffffff","#33fff5"],density:.3,spotty:.3,midIntensity:.4,midSize:.2,intensity:.8,bloom:.4,speed:.75,frame:0}};g.J7,g.J7,g.J7;let o=(0,d.memo)(function({speed:a=n.params.speed,frame:b=n.params.frame,colorBloom:c=n.params.colorBloom,colorBack:d=n.params.colorBack,colors:f=n.params.colors,density:j=n.params.density,spotty:k=n.params.spotty,midIntensity:o=n.params.midIntensity,midSize:p=n.params.midSize,intensity:q=n.params.intensity,bloom:r=n.params.bloom,fit:s=n.params.fit,scale:t=n.params.scale,rotation:u=n.params.rotation,originX:v=n.params.originX,originY:w=n.params.originY,offsetX:x=n.params.offsetX,offsetY:y=n.params.offsetY,worldWidth:z=n.params.worldWidth,worldHeight:A=n.params.worldHeight,...B}){let C={u_colorBloom:(0,h.G)(c),u_colorBack:(0,h.G)(d),u_colors:f.map(h.G),u_colorsCount:f.length,u_density:j,u_spotty:k,u_midIntensity:o,u_midSize:p,u_intensity:q,u_bloom:r,u_noiseTexture:(0,i.R)(),u_fit:g.Tk[s],u_scale:t,u_rotation:u,u_offsetX:x,u_offsetY:y,u_originX:v,u_originY:w,u_worldWidth:z,u_worldHeight:A};return(0,m.jsx)(e.f,{...B,speed:a,frame:b,fragmentShader:l,uniforms:C})},f.q)},99854:(a,b,c)=>{"use strict";c.d(b,{A:()=>d});let d=(0,c(7388).A)("file-image",[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["circle",{cx:"10",cy:"12",r:"2",key:"737tya"}],["path",{d:"m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22",key:"wt3hpn"}]])}};