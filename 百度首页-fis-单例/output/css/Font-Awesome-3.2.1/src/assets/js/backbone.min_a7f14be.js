(function(){var t,e=this,i=e.Backbone,s=Array.prototype.slice,n=Array.prototype.splice;t="undefined"!=typeof exports?exports:e.Backbone={},t.VERSION="0.9.1";var r=e._;!r&&"undefined"!=typeof require&&(r=require("underscore"));var o=e.jQuery||e.Zepto||e.ender;t.setDomLibrary=function(t){o=t},t.noConflict=function(){return e.Backbone=i,this},t.emulateHTTP=!1,t.emulateJSON=!1,t.Events={on:function(t,e,i){for(var s,t=t.split(/\s+/),n=this._callbacks||(this._callbacks={});s=t.shift();){s=n[s]||(n[s]={});var r=s.tail||(s.tail=s.next={});r.callback=e,r.context=i,s.tail=r.next={}}return this},off:function(t,e,i){var s,n,r;if(t){if(n=this._callbacks)for(t=t.split(/\s+/);s=t.shift();)if(r=n[s],delete n[s],e&&r)for(;(r=r.next)&&r.next;)(r.callback!==e||i&&r.context!==i)&&this.on(s,r.callback,r.context)}else delete this._callbacks;return this},trigger:function(t){var e,i,n,r;if(!(n=this._callbacks))return this;for(r=n.all,(t=t.split(/\s+/)).push(null);e=t.shift();)r&&t.push({next:r.next,tail:r.tail,event:e}),(i=n[e])&&t.push({next:i.next,tail:i.tail});for(r=s.call(arguments,1);i=t.pop();)for(e=i.tail,n=i.event?[i.event].concat(r):r;(i=i.next)!==e;)i.callback.apply(i.context||this,n);return this}},t.Events.bind=t.Events.on,t.Events.unbind=t.Events.off,t.Model=function(t,e){var i;if(t||(t={}),e&&e.parse&&(t=this.parse(t)),(i=_(this,"defaults"))&&(t=r.extend({},i,t)),e&&e.collection&&(this.collection=e.collection),this.attributes={},this._escapedAttributes={},this.cid=r.uniqueId("c"),!this.set(t,{silent:!0}))throw Error("Can't create an invalid model");delete this._changed,this._previousAttributes=r.clone(this.attributes),this.initialize.apply(this,arguments)},r.extend(t.Model.prototype,t.Events,{idAttribute:"id",initialize:function(){},toJSON:function(){return r.clone(this.attributes)},get:function(t){return this.attributes[t]},escape:function(t){var e;return(e=this._escapedAttributes[t])?e:(e=this.attributes[t],this._escapedAttributes[t]=r.escape(null==e?"":""+e))},has:function(t){return null!=this.attributes[t]},set:function(e,i,s){var n,o;if(r.isObject(e)||null==e?(n=e,s=i):(n={},n[e]=i),s||(s={}),!n)return this;if(n instanceof t.Model&&(n=n.attributes),s.unset)for(o in n)n[o]=void 0;if(!this._validate(n,s))return!1;this.idAttribute in n&&(this.id=n[this.idAttribute]);var i=this.attributes,a=this._escapedAttributes,h=this._previousAttributes||{},c=this._setting;this._changed||(this._changed={}),this._setting=!0;for(o in n)e=n[o],r.isEqual(i[o],e)||delete a[o],s.unset?delete i[o]:i[o]=e,this._changing&&!r.isEqual(this._changed[o],e)&&(this.trigger("change:"+o,this,e,s),this._moreChanges=!0),delete this._changed[o],r.isEqual(h[o],e)&&r.has(i,o)==r.has(h,o)||(this._changed[o]=e);return c||(!s.silent&&this.hasChanged()&&this.change(s),this._setting=!1),this},unset:function(t,e){return(e||(e={})).unset=!0,this.set(t,null,e)},clear:function(t){return(t||(t={})).unset=!0,this.set(r.clone(this.attributes),t)},fetch:function(e){var e=e?r.clone(e):{},i=this,s=e.success;return e.success=function(t,n,r){return i.set(i.parse(t,r),e)?void(s&&s(i,t)):!1},e.error=t.wrapError(e.error,i,e),(this.sync||t.sync).call(this,"read",this,e)},save:function(e,i,s){var n,o;if(r.isObject(e)||null==e?(n=e,s=i):(n={},n[e]=i),s=s?r.clone(s):{},s.wait&&(o=r.clone(this.attributes)),e=r.extend({},s,{silent:!0}),n&&!this.set(n,s.wait?e:s))return!1;var a=this,h=s.success;return s.success=function(t,e,i){return e=a.parse(t,i),s.wait&&(e=r.extend(n||{},e)),a.set(e,s)?void(h?h(a,t):a.trigger("sync",a,t,s)):!1},s.error=t.wrapError(s.error,a,s),i=this.isNew()?"create":"update",i=(this.sync||t.sync).call(this,i,this,s),s.wait&&this.set(o,e),i},destroy:function(e){var e=e?r.clone(e):{},i=this,s=e.success,n=function(){i.trigger("destroy",i,i.collection,e)};if(this.isNew())return n();e.success=function(t){e.wait&&n(),s?s(i,t):i.trigger("sync",i,t,e)},e.error=t.wrapError(e.error,i,e);var o=(this.sync||t.sync).call(this,"delete",this,e);return e.wait||n(),o},url:function(){var t=_(this.collection,"url")||_(this,"urlRoot")||y();return this.isNew()?t:t+("/"==t.charAt(t.length-1)?"":"/")+encodeURIComponent(this.id)},parse:function(t){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return null==this.id},change:function(t){if(this._changing||!this.hasChanged())return this;this._moreChanges=this._changing=!0;for(var e in this._changed)this.trigger("change:"+e,this,this._changed[e],t);for(;this._moreChanges;)this._moreChanges=!1,this.trigger("change",this,t);return this._previousAttributes=r.clone(this.attributes),delete this._changed,this._changing=!1,this},hasChanged:function(t){return arguments.length?this._changed&&r.has(this._changed,t):!r.isEmpty(this._changed)},changedAttributes:function(t){if(!t)return this.hasChanged()?r.clone(this._changed):!1;var e,i,s=!1,n=this._previousAttributes;for(i in t)r.isEqual(n[i],e=t[i])||((s||(s={}))[i]=e);return s},previous:function(t){return arguments.length&&this._previousAttributes?this._previousAttributes[t]:null},previousAttributes:function(){return r.clone(this._previousAttributes)},isValid:function(){return!this.validate(this.attributes)},_validate:function(t,e){if(e.silent||!this.validate)return!0;var t=r.extend({},this.attributes,t),i=this.validate(t,e);return i?(e&&e.error?e.error(this,i,e):this.trigger("error",this,i,e),!1):!0}}),t.Collection=function(t,e){e||(e={}),e.comparator&&(this.comparator=e.comparator),this._reset(),this.initialize.apply(this,arguments),t&&this.reset(t,{silent:!0,parse:e.parse})},r.extend(t.Collection.prototype,t.Events,{model:t.Model,initialize:function(){},toJSON:function(){return this.map(function(t){return t.toJSON()})},add:function(t,e){var i,s,o,a,h,c={},l={};for(e||(e={}),t=r.isArray(t)?t.slice():[t],i=0,s=t.length;s>i;i++){if(!(o=t[i]=this._prepareModel(t[i],e)))throw Error("Can't add an invalid model to a collection");if(c[a=o.cid]||this._byCid[a]||null!=(h=o.id)&&(l[h]||this._byId[h]))throw Error("Can't add the same model to a collection twice");c[a]=l[h]=o}for(i=0;s>i;i++)(o=t[i]).on("all",this._onModelEvent,this),this._byCid[o.cid]=o,null!=o.id&&(this._byId[o.id]=o);if(this.length+=s,n.apply(this.models,[null!=e.at?e.at:this.models.length,0].concat(t)),this.comparator&&this.sort({silent:!0}),e.silent)return this;for(i=0,s=this.models.length;s>i;i++)c[(o=this.models[i]).cid]&&(e.index=i,o.trigger("add",o,this,e));return this},remove:function(t,e){var i,s,n,o;for(e||(e={}),t=r.isArray(t)?t.slice():[t],i=0,s=t.length;s>i;i++)(o=this.getByCid(t[i])||this.get(t[i]))&&(delete this._byId[o.id],delete this._byCid[o.cid],n=this.indexOf(o),this.models.splice(n,1),this.length--,e.silent||(e.index=n,o.trigger("remove",o,this,e)),this._removeReference(o));return this},get:function(t){return null==t?null:this._byId[null!=t.id?t.id:t]},getByCid:function(t){return t&&this._byCid[t.cid||t]},at:function(t){return this.models[t]},sort:function(t){if(t||(t={}),!this.comparator)throw Error("Cannot sort a set without a comparator");var e=r.bind(this.comparator,this);return 1==this.comparator.length?this.models=this.sortBy(e):this.models.sort(e),t.silent||this.trigger("reset",this,t),this},pluck:function(t){return r.map(this.models,function(e){return e.get(t)})},reset:function(t,e){t||(t=[]),e||(e={});for(var i=0,s=this.models.length;s>i;i++)this._removeReference(this.models[i]);return this._reset(),this.add(t,{silent:!0,parse:e.parse}),e.silent||this.trigger("reset",this,e),this},fetch:function(e){e=e?r.clone(e):{},void 0===e.parse&&(e.parse=!0);var i=this,s=e.success;return e.success=function(t,n,r){i[e.add?"add":"reset"](i.parse(t,r),e),s&&s(i,t)},e.error=t.wrapError(e.error,i,e),(this.sync||t.sync).call(this,"read",this,e)},create:function(t,e){var i=this,e=e?r.clone(e):{},t=this._prepareModel(t,e);if(!t)return!1;e.wait||i.add(t,e);var s=e.success;return e.success=function(n,r){e.wait&&i.add(n,e),s?s(n,r):n.trigger("sync",t,r,e)},t.save(null,e),t},parse:function(t){return t},chain:function(){return r(this.models).chain()},_reset:function(){this.length=0,this.models=[],this._byId={},this._byCid={}},_prepareModel:function(e,i){return e instanceof t.Model?e.collection||(e.collection=this):(i.collection=this,e=new this.model(e,i),e._validate(e.attributes,i)||(e=!1)),e},_removeReference:function(t){this==t.collection&&delete t.collection,t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,s){("add"==t||"remove"==t)&&i!=this||("destroy"==t&&this.remove(e,s),e&&t==="change:"+e.idAttribute&&(delete this._byId[e.previous(e.idAttribute)],this._byId[e.id]=e),this.trigger.apply(this,arguments))}}),r.each("forEach,each,map,reduce,reduceRight,find,detect,filter,select,reject,every,all,some,any,include,contains,invoke,max,min,sortBy,sortedIndex,toArray,size,first,initial,rest,last,without,indexOf,shuffle,lastIndexOf,isEmpty,groupBy".split(","),function(e){t.Collection.prototype[e]=function(){return r[e].apply(r,[this.models].concat(r.toArray(arguments)))}}),t.Router=function(t){t||(t={}),t.routes&&(this.routes=t.routes),this._bindRoutes(),this.initialize.apply(this,arguments)};var a=/:\w+/g,h=/\*\w+/g,c=/[-[\]{}()+?.,\\^$|#\s]/g;r.extend(t.Router.prototype,t.Events,{initialize:function(){},route:function(e,i,s){return t.history||(t.history=new t.History),r.isRegExp(e)||(e=this._routeToRegExp(e)),s||(s=this[i]),t.history.route(e,r.bind(function(n){n=this._extractParameters(e,n),s&&s.apply(this,n),this.trigger.apply(this,["route:"+i].concat(n)),t.history.trigger("route",this,i,n)},this)),this},navigate:function(e,i){t.history.navigate(e,i)},_bindRoutes:function(){if(this.routes){var t,e=[];for(t in this.routes)e.unshift([t,this.routes[t]]);t=0;for(var i=e.length;i>t;t++)this.route(e[t][0],e[t][1],this[e[t][1]])}},_routeToRegExp:function(t){return t=t.replace(c,"\\$&").replace(a,"([^/]+)").replace(h,"(.*?)"),RegExp("^"+t+"$")},_extractParameters:function(t,e){return t.exec(e).slice(1)}}),t.History=function(){this.handlers=[],r.bindAll(this,"checkUrl")};var l=/^[#\/]/,u=/msie [\w.]+/,d=!1;r.extend(t.History.prototype,t.Events,{interval:50,getFragment:function(t,e){if(null==t)if(this._hasPushState||e){var t=window.location.pathname,i=window.location.search;i&&(t+=i)}else t=window.location.hash;return t=decodeURIComponent(t),t.indexOf(this.options.root)||(t=t.substr(this.options.root.length)),t.replace(l,"")},start:function(t){if(d)throw Error("Backbone.history has already been started");this.options=r.extend({},{root:"/"},this.options,t),this._wantsHashChange=!1!==this.options.hashChange,this._wantsPushState=!!this.options.pushState,this._hasPushState=!(!this.options.pushState||!window.history||!window.history.pushState);var t=this.getFragment(),e=document.documentMode;return(e=u.exec(navigator.userAgent.toLowerCase())&&(!e||7>=e))&&(this.iframe=o('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(t)),this._hasPushState?o(window).bind("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!e?o(window).bind("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval)),this.fragment=t,d=!0,t=window.location,e=t.pathname==this.options.root,this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!e?(this.fragment=this.getFragment(null,!0),window.location.replace(this.options.root+"#"+this.fragment),!0):(this._wantsPushState&&this._hasPushState&&e&&t.hash&&(this.fragment=t.hash.replace(l,""),window.history.replaceState({},document.title,t.protocol+"//"+t.host+this.options.root+this.fragment)),this.options.silent?void 0:this.loadUrl())},stop:function(){o(window).unbind("popstate",this.checkUrl).unbind("hashchange",this.checkUrl),clearInterval(this._checkUrlInterval),d=!1},route:function(t,e){this.handlers.unshift({route:t,callback:e})},checkUrl:function(){var t=this.getFragment();return t==this.fragment&&this.iframe&&(t=this.getFragment(this.iframe.location.hash)),t==this.fragment||t==decodeURIComponent(this.fragment)?!1:(this.iframe&&this.navigate(t),void(this.loadUrl()||this.loadUrl(window.location.hash)))},loadUrl:function(t){var e=this.fragment=this.getFragment(t);return r.any(this.handlers,function(t){return t.route.test(e)?(t.callback(e),!0):void 0})},navigate:function(t,e){if(!d)return!1;e&&!0!==e||(e={trigger:e});var i=(t||"").replace(l,"");this.fragment==i||this.fragment==decodeURIComponent(i)||(this._hasPushState?(0!=i.indexOf(this.options.root)&&(i=this.options.root+i),this.fragment=i,window.history[e.replace?"replaceState":"pushState"]({},document.title,i)):this._wantsHashChange?(this.fragment=i,this._updateHash(window.location,i,e.replace),this.iframe&&i!=this.getFragment(this.iframe.location.hash)&&(e.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,i,e.replace))):window.location.assign(this.options.root+t),e.trigger&&this.loadUrl(t))},_updateHash:function(t,e,i){i?t.replace(t.toString().replace(/(javascript:|#).*$/,"")+"#"+e):t.hash=e}}),t.View=function(t){this.cid=r.uniqueId("view"),this._configure(t||{}),this._ensureElement(),this.initialize.apply(this,arguments),this.delegateEvents()};var f=/^(\S+)\s*(.*)$/,p="model,collection,el,id,attributes,className,tagName".split(",");r.extend(t.View.prototype,t.Events,{tagName:"div",$:function(t){return this.$el.find(t)},initialize:function(){},render:function(){return this},remove:function(){return this.$el.remove(),this},make:function(t,e,i){return t=document.createElement(t),e&&o(t).attr(e),i&&o(t).html(i),t},setElement:function(t,e){return this.$el=o(t),this.el=this.$el[0],!1!==e&&this.delegateEvents(),this},delegateEvents:function(t){if(t||(t=_(this,"events"))){this.undelegateEvents();for(var e in t){var i=t[e];if(r.isFunction(i)||(i=this[t[e]]),!i)throw Error('Event "'+t[e]+'" does not exist');var s=e.match(f),n=s[1],s=s[2],i=r.bind(i,this),n=n+(".delegateEvents"+this.cid);""===s?this.$el.bind(n,i):this.$el.delegate(s,n,i)}}},undelegateEvents:function(){this.$el.unbind(".delegateEvents"+this.cid)},_configure:function(t){this.options&&(t=r.extend({},this.options,t));for(var e=0,i=p.length;i>e;e++){var s=p[e];t[s]&&(this[s]=t[s])}this.options=t},_ensureElement:function(){if(this.el)this.setElement(this.el,!1);else{var t=_(this,"attributes")||{};this.id&&(t.id=this.id),this.className&&(t["class"]=this.className),this.setElement(this.make(this.tagName,t),!1)}}}),t.Model.extend=t.Collection.extend=t.Router.extend=t.View.extend=function(t,e){var i=v(this,t,e);return i.extend=this.extend,i};var g={create:"POST",update:"PUT","delete":"DELETE",read:"GET"};t.sync=function(e,i,s){var n=g[e],a={type:n,dataType:"json"};return s.url||(a.url=_(i,"url")||y()),s.data||!i||"create"!=e&&"update"!=e||(a.contentType="application/json",a.data=JSON.stringify(i.toJSON())),t.emulateJSON&&(a.contentType="application/x-www-form-urlencoded",a.data=a.data?{model:a.data}:{}),!t.emulateHTTP||"PUT"!==n&&"DELETE"!==n||(t.emulateJSON&&(a.data._method=n),a.type="POST",a.beforeSend=function(t){t.setRequestHeader("X-HTTP-Method-Override",n)}),"GET"!==a.type&&!t.emulateJSON&&(a.processData=!1),o.ajax(r.extend(a,s))},t.wrapError=function(t,e,i){return function(s,n){n=s===e?n:s,t?t(e,n,i):e.trigger("error",e,n,i)}};var m=function(){},v=function(t,e,i){var s;return s=e&&e.hasOwnProperty("constructor")?e.constructor:function(){t.apply(this,arguments)},r.extend(s,t),m.prototype=t.prototype,s.prototype=new m,e&&r.extend(s.prototype,e),i&&r.extend(s,i),s.prototype.constructor=s,s.__super__=t.prototype,s},_=function(t,e){return t&&t[e]?r.isFunction(t[e])?t[e]():t[e]:null},y=function(){throw Error('A "url" property or function must be specified')}}).call(this);