;(function(){
  var state={products:[],cart:[],categories:[],brands:[],deals:[],testimonials:[]}
  var currency="NGN "
  var pages={home:"home",products:"products",product:"product",gallery:"gallery",blog:"blog",contact:"contact",admin:"admin"}
  function fmt(n){return currency+Number(n).toLocaleString("en-NG")}
  function lsGet(k){try{return JSON.parse(localStorage.getItem(k)||"null")}catch(e){return null}}
  function lsSet(k,v){localStorage.setItem(k,JSON.stringify(v))}
  function id(){return Math.random().toString(36).slice(2)}
  function byId(x){return document.getElementById(x)}
  function q(x){return document.querySelector(x)}
  function qa(x){return Array.from(document.querySelectorAll(x))}
  function setYear(){var y=byId("year");if(y)y.textContent=new Date().getFullYear()}

  function initData(){
    var saved=lsGet("emmytech_products")
    function rp(min,max){return Math.round((Math.random()*(max-min)+min)/1000)*1000}
    var newImgs=[
      "assets/img/IMG-20250911-WA0020.jpg",
      "assets/img/IMG-20250911-WA0021.jpg",
      "assets/img/IMG-20250911-WA0022.jpg",
      "assets/img/IMG-20250911-WA0023.jpg",
      "assets/img/IMG-20251202-WA0023.jpg",
      "assets/img/IMG-20251202-WA0024.jpg",
      "assets/img/ipad.jpg",
      "assets/img/phone.jpg"
    ]
    var extras=newImgs.map(function(src,i){return {
      id:"new-"+i,
      name:["Stylish Accessory","Compact Accessory","Portable Speaker","Wireless Charger","Tablet Ultra","Laptop Slim","iPad Mini","Phone Z"][i]||("Product "+(i+1)),
      brand:i%2?"Emmytech":"ThirdParty",
      category:i<3?"Accessories":(i===5?"Laptops":(i===6?"Tablets":"Mobile Phones")),
      price:rp(8000,350000),
      discount:i%4===0?5:0,
      image:src,
      description:"New arrival with limited Emmytech stock.",
      specs:{Feature:"Premium daily tech"}
    }})
    var base=[
      {id:"lap-pro-15",name:"Laptop Pro 15",brand:"Emmytech",category:"Laptops",price:950000,discount:10,image:"assets/img/IMG-20251202-WA0024.jpg",description:"Powerful 15-inch performance laptop for creators and business users.",specs:{CPU:"Core i7",RAM:"16GB",Storage:"512GB SSD",Display:"15.6 inch"}},
      {id:"phone-x",name:"Phone X 5G",brand:"Emmytech",category:"Mobile Phones",price:350000,discount:5,image:"assets/img/17pm.jpg",description:"Flagship smartphone with 5G speed and premium camera performance.",specs:{Chip:"Octa-core",RAM:"8GB",Storage:"256GB",Camera:"50MP"}},
      {id:"cctv-4k",name:"CCTV 4K Dome",brand:"SecureCam",category:"CCTV",price:120000,discount:0,image:"assets/img/cctv.svg",description:"Ultra HD surveillance camera with night vision and weather resistance.",specs:{Resolution:"4K",Night:"IR",Waterproof:"IP66"}},
      {id:"smart-lock-pro",name:"Smart Door Lock Pro",brand:"SafeHome",category:"Smart Locks",price:180000,discount:12,image:"assets/img/lock.svg",description:"Keyless entry with fingerprint, app control, and backup access.",specs:{Access:"Fingerprint",Battery:"12 months",Connectivity:"Bluetooth / WiFi"}},
      {id:"solar-300w",name:"Solar Panel 300W",brand:"SunGrid",category:"Solar Panels",price:90000,discount:7,image:"assets/img/solar.svg",description:"High efficiency solar panel for resilient power setups.",specs:{Power:"300W",Efficiency:"21%"}},
      {id:"power-station-1kwh",name:"Power Station 1kWh",brand:"VoltBox",category:"Power Stations",price:420000,discount:15,image:"assets/img/power.svg",description:"Portable power station for work, home backup, and travel.",specs:{Capacity:"1000Wh",Output:"1000W"}},
      {id:"mouse-pro",name:"Wireless Mouse Pro",brand:"Emmytech",category:"Accessories",price:18000,discount:0,image:"assets/img/mouse.svg",description:"Ergonomic wireless mouse with smooth precision control.",specs:{DPI:"16000",Battery:"Rechargeable"}},
      {id:"repair-diagnostic",name:"Hardware Repair Diagnostic",brand:"Emmytech",category:"Repairs",price:15000,discount:0,image:"assets/img/ipad.svg",description:"Professional device diagnostics for laptops, phones, and tablets.",specs:{Coverage:"Laptop / phone / tablet",Location:"Ikeja Lagos"}}
    ]
    state.products=saved&&Array.isArray(saved)?saved:base.concat(extras)
    state.products.forEach(function(p){
      if(p.id==="lap-pro-15")p.image="assets/img/IMG-20251202-WA0024.jpg"
      if(p.id==="phone-x")p.image="assets/img/17pm.jpg"
    })
    state.categories=[...new Set(state.products.map(function(p){return p.category}))]
    state.brands=[...new Set(state.products.map(function(p){return p.brand}))]
    state.deals=state.products.filter(function(p){return p.discount>0}).slice(0,8)
    state.testimonials=[
      {text:"The laptop recommendation was perfect for my design work, and delivery within Lagos was fast.",name:"Ayo"},
      {text:"Their CCTV setup was neat and professional. The whole shop now feels more secure.",name:"Chioma"},
      {text:"I bought accessories and later came back for repairs. Helpful support, fair pricing, and premium service.",name:"Kunle"}
    ]
    state.cart=lsGet("emmytech_cart")||[]
  }

  function updateCartCount(){var c=byId("cartCount");if(c)c.textContent=String(state.cart.reduce(function(a,b){return a+b.qty},0))}
  function addToCart(product,qty){
    var existing=state.cart.find(function(i){return i.id===product.id})
    if(existing){existing.qty+=qty||1}else{state.cart.push({id:product.id,name:product.name,price:product.price,discount:product.discount,image:product.image,qty:qty||1})}
    lsSet("emmytech_cart",state.cart)
    updateCartCount()
    openCart()
    renderCart()
  }
  function removeFromCart(productId){state.cart=state.cart.filter(function(i){return i.id!==productId});lsSet("emmytech_cart",state.cart);renderCart();updateCartCount()}
  function cartTotal(){return state.cart.reduce(function(t,i){var price=i.price*(1-(i.discount||0)/100);return t+price*i.qty},0)}
  function openCart(){var d=byId("cartDrawer");if(d){d.setAttribute("open","true")}}
  function closeCart(){var d=byId("cartDrawer");if(d){d.removeAttribute("open")}}

  function renderCart(){
    var list=byId("cartItems");var totalEl=byId("cartTotal")
    if(!list)return
    list.innerHTML=""
    if(!state.cart.length){list.innerHTML='<div class="card"><strong>Your cart is empty</strong><p class="meta">Add a product and it will appear here.</p></div>'}
    state.cart.forEach(function(i){
      var row=document.createElement("div")
      row.className="card"
      row.innerHTML='<div style="display:flex;gap:10px;align-items:center"><img src="'+i.image+'" alt="" loading="lazy" style="width:64px;height:64px;object-fit:cover;border-radius:14px"><div style="flex:1"><strong>'+i.name+'</strong><div class="price">'+fmt(i.price*(1-(i.discount||0)/100))+' x '+i.qty+'</div></div><button class="btn btn--ghost" data-remove="'+i.id+'">Remove</button></div>'
      list.appendChild(row)
    })
    if(totalEl)totalEl.textContent=fmt(cartTotal())
    qa("[data-remove]").forEach(function(b){b.addEventListener("click",function(){removeFromCart(b.getAttribute("data-remove"))})})
  }

  function productCard(p){
    var el=document.createElement("div")
    el.className="card product-card reveal"
    var price=p.price*(1-(p.discount||0)/100)
    el.innerHTML='<img src="'+p.image+'" alt="'+p.name+'" loading="lazy"><div class="rating" aria-label="Rated 4.9 out of 5">4.9 stars</div><h4>'+p.name+'</h4><div class="meta">'+p.brand+' / '+p.category+'</div><div class="price"><strong>'+fmt(price)+'</strong>'+(p.discount?'<span class="badge">-'+p.discount+'%</span>':'')+'</div><p>'+p.description+'</p><div class="product-actions"><button class="btn btn--primary" data-add="'+p.id+'">Add to cart</button><button class="icon-btn" data-quick="'+p.id+'" aria-label="Quick preview '+p.name+'">View</button><button class="icon-btn" data-wish="'+p.id+'" aria-label="Wishlist '+p.name+'">Love</button></div>'
    return el
  }

  function bindCardButtons(){
    qa("[data-add]").forEach(function(b){b.addEventListener("click",function(){var p=state.products.find(function(x){return x.id===b.getAttribute("data-add")});if(p)addToCart(p,1)})})
    qa("[data-quick]").forEach(function(b){b.addEventListener("click",function(){openQuickView(b.getAttribute("data-quick"))})})
    qa("[data-wish]").forEach(function(b){b.addEventListener("click",function(){b.classList.toggle("is-liked");b.textContent=b.classList.contains("is-liked")?"Saved":"Love"})})
  }

  function renderFeatured(){
    var slider=byId("featuredSlider");if(!slider)return
    slider.innerHTML=""
    state.products.slice(0,10).forEach(function(p){slider.appendChild(productCard(p))})
    var skeleton=byId("featuredSkeleton");if(skeleton)skeleton.style.display="none"
    qa(".slider__btn").forEach(function(btn){btn.addEventListener("click",function(){slider.scrollBy({left:btn.getAttribute("data-dir")==="1"?320:-320,behavior:"smooth"})})})
    bindCardButtons();setupReveal()
  }
  function renderDeals(){var g=byId("dealsGrid");if(!g)return;g.innerHTML="";state.deals.forEach(function(p){g.appendChild(productCard(p))});bindCardButtons();setupReveal()}
  function renderTestimonials(){var s=byId("testimonialsSlider");if(!s)return;s.innerHTML="";state.testimonials.forEach(function(t){var c=document.createElement("div");c.className="card";c.innerHTML='<p>'+t.text+'</p><div class="meta">'+t.name+' / Emmytech customer</div>';s.appendChild(c)})}
  function openQuickView(productId){var m=byId("quickView");var c=byId("quickViewContent");var p=state.products.find(function(x){return x.id===productId});if(!m||!c||!p)return;m.setAttribute("open","true");c.innerHTML='<div class="product-card"><img src="'+p.image+'" alt="'+p.name+'" loading="lazy"><div class="rating">4.9 stars</div><h3>'+p.name+'</h3><div class="meta">'+p.brand+' / '+p.category+'</div><div class="price"><strong>'+fmt(p.price*(1-(p.discount||0)/100))+'</strong>'+(p.discount?'<span class="badge">-'+p.discount+'%</span>':'')+'</div><p>'+p.description+'</p><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn--primary" data-add="'+p.id+'">Add to cart</button><a class="btn btn--ghost" href="product.html?id='+encodeURIComponent(p.id)+'">View details</a></div></div>';bindCardButtons()}
  function closeModals(){qa("[data-close]").forEach(function(x){x.addEventListener("click",function(){x.closest(".modal").removeAttribute("open")})});qa(".modal").forEach(function(m){m.addEventListener("click",function(e){if(e.target===m)m.removeAttribute("open")})})}

  function setupSearch(){
    function go(input){var qv=input&&input.value.trim();if(qv)location.href="products.html?q="+encodeURIComponent(qv)}
    var g=byId("globalSearch");var b=byId("globalSearchBtn")
    if(g&&b){b.addEventListener("click",function(){go(g)});g.addEventListener("keydown",function(e){if(e.key==="Enter")go(g)})}
  }

  function renderFilters(){
    var cat=byId("filterCategory");var brand=byId("filterBrand");var price=byId("filterPrice");var pv=byId("filterPriceValue");var reset=byId("resetFilters");var search=byId("productSearch");var searchBtn=byId("productSearchBtn");if(!cat)return
    cat.innerHTML='<option value="">All categories</option>'+state.categories.map(function(c){return "<option>"+c+"</option>"}).join("")
    brand.innerHTML='<option value="">All brands</option>'+state.brands.map(function(b){return "<option>"+b+"</option>"}).join("")
    price.value=price.max
    pv.textContent=fmt(price.value)
    price.addEventListener("input",function(){pv.textContent=fmt(price.value);renderCatalog()})
    cat.addEventListener("change",renderCatalog)
    brand.addEventListener("change",renderCatalog)
    reset.addEventListener("click",function(){cat.value="";brand.value="";price.value=price.max;pv.textContent=fmt(price.value);if(search)search.value="";renderCatalog()})
    if(searchBtn)searchBtn.addEventListener("click",renderCatalog)
    if(search)search.addEventListener("input",renderCatalog)
  }

  function renderCatalog(){
    var grid=byId("catalogGrid");if(!grid)return
    var cat=byId("filterCategory").value;var brand=byId("filterBrand").value;var price=+byId("filterPrice").value;var qv=(byId("productSearch")&&byId("productSearch").value||"").toLowerCase()
    grid.innerHTML=""
    var params=new URLSearchParams(location.search);var catParam=params.get("category");var qParam=params.get("q")
    var filtered=state.products.filter(function(p){
      var finalPrice=p.price*(1-(p.discount||0)/100)
      var hay=(p.name+" "+p.description+" "+p.brand+" "+p.category).toLowerCase()
      return (!cat||p.category===cat)&&(!brand||p.brand===brand)&&finalPrice<=price&&(!qv||hay.indexOf(qv)>-1)&&(!catParam||p.category===catParam)&&(!qParam||hay.indexOf(qParam.toLowerCase())>-1)
    })
    if(!filtered.length){grid.innerHTML='<div class="card"><strong>No matching products</strong><p class="meta">Try a different category, brand, or price range.</p></div>'}
    filtered.forEach(function(p){grid.appendChild(productCard(p))})
    bindCardButtons();setupReveal()
  }

  function renderProduct(){
    var params=new URLSearchParams(location.search);var productId=params.get("id");if(!productId)return
    var p=state.products.find(function(x){return x.id===productId});if(!p)return
    var g=byId("prodGallery");var t=byId("prodTitle");var pr=byId("prodPrice");var bd=byId("prodDiscount");var ds=byId("prodDesc");var st=byId("specsTable");var rel=byId("relatedGrid")
    if(g)g.innerHTML='<img src="'+p.image+'" alt="'+p.name+'" loading="lazy"><img src="'+p.image+'" alt="'+p.name+'" loading="lazy">'
    if(t)t.textContent=p.name
    if(pr)pr.textContent=fmt(p.price*(1-(p.discount||0)/100))
    if(bd)bd.textContent=p.discount?"-"+p.discount+"%":""
    if(ds)ds.textContent=p.description
    if(st){st.innerHTML="";Object.keys(p.specs||{}).forEach(function(k){var tr=document.createElement("tr");tr.innerHTML="<td>"+k+"</td><td>"+p.specs[k]+"</td>";st.appendChild(tr)})}
    if(rel){var same=state.products.filter(function(x){return x.category===p.category&&x.id!==p.id}).slice(0,4);same.forEach(function(s){rel.appendChild(productCard(s))});bindCardButtons();setupReveal()}
    var addBtn=byId("addToCart");var buyBtn=byId("buyNow");if(addBtn)addBtn.addEventListener("click",function(){addToCart(p,1)});if(buyBtn)buyBtn.addEventListener("click",function(){addToCart(p,1);openCart()})
  }

  function renderGallery(){var g=byId("galleryGrid");if(!g)return;var imgs=["assets/img/IMG-20251202-WA0024.svg","assets/img/17pm.svg","assets/img/cctv.svg","assets/img/lock.svg","assets/img/solar.svg","assets/img/power.svg","assets/img/IMG-20250911-WA0020.jpg","assets/img/IMG-20250911-WA0021.jpg","assets/img/IMG-20250911-WA0022.jpg","assets/img/IMG-20250911-WA0023.jpg","assets/img/IMG-20251202-WA0023.jpg","assets/img/ipad.jpg","assets/img/phone.jpg"];g.innerHTML="";imgs.forEach(function(src){var img=document.createElement("img");img.src=src;img.loading="lazy";img.alt="Emmytech product gallery";img.addEventListener("click",function(){var m=byId("lightbox");var i=byId("lightboxImg");if(m&&i){i.src=src;m.setAttribute("open","true")}});g.appendChild(img)})}

  function renderBlog(){var list=byId("blogList");var cats=byId("blogCategories");var search=byId("blogSearch");if(!list)return
    var posts=[
      {title:"Top Laptop Picks for 2026",cat:"Laptops",date:"May 20, 2026",image:"assets/img/blog-laptops.svg"},
      {title:"5G Phones: What to Know",cat:"Mobile",date:"May 12, 2026",image:"assets/img/blog-mobile.svg"},
      {title:"Smart Security Trends",cat:"Security",date:"May 3, 2026",image:"assets/img/blog-security.svg"}
    ]
    function render(items){list.innerHTML="";items.forEach(function(p){var el=document.createElement("div");el.className="card blog-card";el.innerHTML='<img src="'+p.image+'" alt="'+p.title+'" loading="lazy"><h4>'+p.title+'</h4><div class="meta">'+p.cat+' / '+p.date+'</div><div style="display:flex;gap:8px"><button class="btn btn--ghost">Share</button><a class="btn" href="#">Read</a></div>';list.appendChild(el)})}
    cats.innerHTML='<div class="card"><strong>Categories</strong><div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px"><button class="btn" data-cat="">All</button><button class="btn" data-cat="Laptops">Laptops</button><button class="btn" data-cat="Mobile">Mobile</button><button class="btn" data-cat="Security">Security</button></div></div>'
    render(posts)
    qa("[data-cat]").forEach(function(b){b.addEventListener("click",function(){var c=b.getAttribute("data-cat");render(c?posts.filter(function(x){return x.cat===c}):posts)})})
    if(search)search.addEventListener("input",function(){var s=search.value.toLowerCase();render(posts.filter(function(x){return x.title.toLowerCase().indexOf(s)>-1}))})
  }

  function setupCartControls(){var open=byId("openCart");var close=byId("closeCart");if(open)open.addEventListener("click",openCart);if(close)close.addEventListener("click",closeCart);if(location.hash==="#cart")openCart();renderCart()}

  function paystackCheckout(){var key=window.EMMYTECH_PAYSTACK_KEY||"";if(!key){alert("Configure Paystack public key");return}var amount=Math.round(cartTotal()*100);var handler=window.PaystackPop&&window.PaystackPop.setup?window.PaystackPop.setup({key:key,email:"customer@example.com",amount:amount,currency:"NGN",callback:function(){alert("Payment successful");state.cart=[];lsSet("emmytech_cart",state.cart);renderCart();updateCartCount()},onClose:function(){}}):null;if(!handler){alert("Paystack SDK not loaded");return}handler.openCheckout()}
  function flutterwaveCheckout(){var key=window.EMMYTECH_FLUTTERWAVE_KEY||"";if(!key){alert("Configure Flutterwave public key");return}if(!window.FlutterwaveCheckout){alert("Flutterwave SDK not loaded");return}window.FlutterwaveCheckout({public_key:key,tx_ref:id(),amount:cartTotal(),currency:"NGN",payment_options:"card,banktransfer",customer:{email:"customer@example.com",name:"Customer"},callback:function(){alert("Payment successful");state.cart=[];lsSet("emmytech_cart",state.cart);renderCart();updateCartCount()}})}
  function setupCheckout(){var ps=byId("checkoutPaystack");var fw=byId("checkoutFlutterwave");if(ps)ps.addEventListener("click",paystackCheckout);if(fw)fw.addEventListener("click",flutterwaveCheckout);if(ps||fw){var s=document.createElement("script");s.src="https://js.paystack.co/v1/inline.js";document.body.appendChild(s);var f=document.createElement("script");f.src="https://checkout.flutterwave.com/v3.js";document.body.appendChild(f)}}

  function handleAdmin(){if(document.body.getAttribute("data-page")!==pages.admin)return;var form=byId("adminForm");var list=byId("adminList");if(!form||!list)return
    function render(){list.innerHTML="";state.products.forEach(function(p){var card=productCard(p);var del=document.createElement("button");del.className="btn btn--ghost";del.textContent="Delete";del.addEventListener("click",function(){state.products=state.products.filter(function(x){return x.id!==p.id});lsSet("emmytech_products",state.products);render()});card.appendChild(del);list.appendChild(card)});bindCardButtons()}
    render()
    form.addEventListener("submit",function(e){e.preventDefault();var data=new FormData(form);var obj={id:data.get("id")||id(),name:data.get("name"),brand:data.get("brand"),category:data.get("category"),price:Number(data.get("price")),discount:Number(data.get("discount")||0),image:data.get("image"),description:data.get("description"),specs:{}};var specs=data.get("specs");try{if(specs)obj.specs=JSON.parse(specs)}catch(err){}var exist=state.products.find(function(x){return x.id===obj.id});if(exist){Object.assign(exist,obj)}else{state.products.push(obj)}lsSet("emmytech_products",state.products);form.reset();render()})
  }

  function setupMobileNav(){var nav=q(".nav");var btn=byId("navToggle");if(btn&&nav){btn.addEventListener("click",function(){nav.classList.toggle("is-open")});qa(".nav__links a").forEach(function(a){a.addEventListener("click",function(){nav.classList.remove("is-open")})})}}
  function setupTheme(){var saved=localStorage.getItem("emmytech_theme");if(saved)document.documentElement.setAttribute("data-theme",saved);var btn=byId("themeToggle");if(btn)btn.addEventListener("click",function(){var next=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",next);localStorage.setItem("emmytech_theme",next)})}
  function setupReveal(){var items=qa(".reveal");if(!items.length)return;if(!("IntersectionObserver" in window)){items.forEach(function(el){el.classList.add("is-visible")});return}var obs=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add("is-visible");obs.unobserve(entry.target)}})},{threshold:.12});items.forEach(function(el){if(!el.classList.contains("is-visible"))obs.observe(el)})}
  function setupCounters(){var counters=qa("[data-count]");if(!counters.length)return;var done=false;var run=function(){if(done)return;done=true;counters.forEach(function(el){var target=Number(el.getAttribute("data-count"));var current=0;var step=Math.max(1,Math.ceil(target/42));var timer=setInterval(function(){current=Math.min(target,current+step);el.textContent=current;if(current>=target)clearInterval(timer)},28)})};if("IntersectionObserver" in window){var obs=new IntersectionObserver(function(entries){if(entries.some(function(e){return e.isIntersecting})){run();obs.disconnect()}},{threshold:.3});counters.forEach(function(c){obs.observe(c)})}else{run()}}
  function setupBackTop(){var b=byId("backTop");if(!b)return;window.addEventListener("scroll",function(){b.classList.toggle("is-visible",window.scrollY>600)});b.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})})}
  function initNewsletter(){var form=byId("newsletterForm");if(form)form.addEventListener("submit",function(e){e.preventDefault();var email=byId("newsletterEmail").value.trim();if(email){var list=lsGet("emmytech_news")||[];list.push({email:email,ts:Date.now()});lsSet("emmytech_news",list);byId("newsletterEmail").value="";alert("Subscribed")}})}
  function initContact(){var form=byId("contactForm");if(form)form.addEventListener("submit",function(e){e.preventDefault();alert("Message received. We will contact you.")})}

  function initHome(){renderFeatured();renderDeals();renderTestimonials();setupSearch();initNewsletter();setupCounters()}
  function initProducts(){renderFilters();renderCatalog();setupCartControls();setupCheckout()}
  function initProduct(){renderProduct();setupCartControls();setupCheckout()}
  function init(){
    setYear();initData();updateCartCount();closeModals();setupMobileNav();setupTheme();setupReveal();setupBackTop()
    var page=document.body.getAttribute("data-page")
    if(page===pages.home){initHome()}else if(page===pages.products){initProducts()}else if(page===pages.product){initProduct()}else if(page===pages.gallery){renderGallery()}else if(page===pages.blog){renderBlog()}else if(page===pages.contact){initContact()}
    handleAdmin()
  }
  document.addEventListener("DOMContentLoaded",init)
})();
