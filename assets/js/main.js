;(function(){
  var state={products:[],cart:[],categories:[],brands:[],deals:[],testimonials:[]}
  var currency="₦"
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
    var base=[
      {id:"lap-pro-15",name:"Laptop Pro 15",brand:"Emmytech",category:"Laptops",price:950000,discount:10,image:"assets/img/IMG-20251202-WA0024.svg",description:"Powerful 15-inch performance laptop",specs:{CPU:"Core i7",RAM:"16GB",Storage:"512GB SSD",Display:"15.6"}},
      {id:"phone-x",name:"Phone X 5G",brand:"Emmytech",category:"Mobile Phones",price:350000,discount:5,image:"assets/img/17pm.svg",description:"Flagship smartphone with 5G",specs:{Chip:"Octa-core",RAM:"8GB",Storage:"256GB",Camera:"50MP"}},
      {id:"cctv-4k",name:"CCTV 4K Dome",brand:"SecureCam",category:"CCTV",price:120000,discount:0,image:"assets/img/cctv.svg",description:"Ultra HD surveillance camera",specs:{Resolution:"4K",Night:"IR",Waterproof:"IP66"}},
      {id:"smart-lock-pro",name:"Smart Door Lock Pro",brand:"SafeHome",category:"Smart Locks",price:180000,discount:12,image:"assets/img/lock.svg",description:"Keyless entry with app control",specs:{Access:"Fingerprint",Battery:"12 months",Connectivity:"Bluetooth/WiFi"}},
      {id:"solar-300w",name:"Solar Panel 300W",brand:"SunGrid",category:"Solar Panels",price:90000,discount:7,image:"assets/img/solar.svg",description:"High efficiency solar panel",specs:{Power:"300W",Efficiency:"21%"}},
      {id:"power-station-1kwh",name:"Power Station 1kWh",brand:"VoltBox",category:"Power Stations",price:420000,discount:15,image:"assets/img/power.svg",description:"Portable power station",specs:{Capacity:"1000Wh",Output:"1000W"}},
      {id:"mouse-pro",name:"Wireless Mouse Pro",brand:"Emmytech",category:"Accessories",price:18000,discount:0,image:"assets/img/mouse.svg",description:"Ergonomic wireless mouse",specs:{DPI:"16000",Battery:"Rechargeable"}}
    ]
    state.products=saved&&Array.isArray(saved)?saved:base
    state.categories=[...new Set(state.products.map(p=>p.category))]
    state.brands=[...new Set(state.products.map(p=>p.brand))]
    state.deals=state.products.filter(p=>p.discount>0)
    state.testimonials=[
      {text:"Great service and fast delivery!",name:"Ayo"},
      {text:"Premium quality gadgets.",name:"Chioma"},
      {text:"Helpful support, recommended.",name:"Kunle"}
    ]
    var savedCart=lsGet("emmytech_cart")||[]
    state.cart=savedCart
  }
  function updateCartCount(){var c=byId("cartCount");if(c)c.textContent=String(state.cart.reduce((a,b)=>a+b.qty,0))}
  function addToCart(product,qty){
    var existing=state.cart.find(i=>i.id===product.id)
    if(existing){existing.qty+=qty||1}else{state.cart.push({id:product.id,name:product.name,price:product.price,discount:product.discount,image:product.image,qty:qty||1})}
    lsSet("emmytech_cart",state.cart)
    updateCartCount()
    openCart()
    renderCart()
  }
  function removeFromCart(id){state.cart=state.cart.filter(i=>i.id!==id);lsSet("emmytech_cart",state.cart);renderCart();updateCartCount()}
  function cartTotal(){return state.cart.reduce((t,i)=>{var price=i.price*(1-(i.discount||0)/100);return t+price*i.qty},0)}
  function openCart(){var d=byId("cartDrawer");if(d){d.setAttribute("open","true")}}
  function closeCart(){var d=byId("cartDrawer");if(d){d.removeAttribute("open")}}
  function renderCart(){
    var list=byId("cartItems");var totalEl=byId("cartTotal")
    if(!list)return
    list.innerHTML=""
    state.cart.forEach(function(i){
      var row=document.createElement("div")
      row.className="card"
      row.innerHTML='<div style="display:flex;gap:10px;align-items:center"><img src="'+i.image+'" alt="" style="width:60px;height:60px;object-fit:cover"><div style="flex:1"><div>'+i.name+'</div><div class="price">'+fmt(i.price*(1-(i.discount||0)/100))+' × '+i.qty+'</div></div><button class="btn btn--ghost" data-remove="'+i.id+'">Remove</button></div>'
      list.appendChild(row)
    })
    if(totalEl)totalEl.textContent=fmt(cartTotal())
    qa('[data-remove]').forEach(function(b){b.addEventListener('click',function(){removeFromCart(b.getAttribute('data-remove'))})})
  }
  function productCard(p){
    var el=document.createElement("div")
    el.className="card product-card"
    var price=p.price*(1-(p.discount||0)/100)
    el.innerHTML='<img src="'+p.image+'" alt="'+p.name+'"><h4>'+p.name+'</h4><div class="meta">'+p.brand+' • '+p.category+'</div><div class="price"><strong>'+fmt(price)+'</strong>'+(p.discount?'<span class="badge">-'+p.discount+'%</span>':'')+'</div><p>'+p.description+'</p><div style="display:flex;gap:8px"><button class="btn btn--primary" data-add="'+p.id+'">Add to Cart</button><a class="btn btn--ghost" href="product.html?id='+encodeURIComponent(p.id)+'">View</a><button class="btn" data-quick="'+p.id+'">Quick View</button></div>'
    return el
  }
  function renderFeatured(){
    var slider=byId("featuredSlider");if(!slider)return
    var feats=state.products.slice(0,10)
    slider.innerHTML=""
    feats.forEach(function(p){slider.appendChild(productCard(p))})
    qa('.slider__btn').forEach(function(btn){btn.addEventListener('click',function(){slider.scrollBy({left:btn.getAttribute('data-dir')==='1'?300:-300,behavior:'smooth'})})})
    bindCardButtons()
  }
  function renderDeals(){var g=byId("dealsGrid");if(!g)return;g.innerHTML="";state.deals.forEach(function(p){g.appendChild(productCard(p))});bindCardButtons()}
  function renderTestimonials(){var s=byId("testimonialsSlider");if(!s)return;s.innerHTML="";state.testimonials.forEach(function(t){var c=document.createElement('div');c.className='card';c.innerHTML='<p>“'+t.text+'”</p><div class="meta">'+t.name+'</div>';s.appendChild(c)})}
  function bindCardButtons(){qa('[data-add]').forEach(function(b){b.addEventListener('click',function(){var id=b.getAttribute('data-add');var p=state.products.find(x=>x.id===id);if(p)addToCart(p,1)})});qa('[data-quick]').forEach(function(b){b.addEventListener('click',function(){openQuickView(b.getAttribute('data-quick'))})})}
  function openQuickView(id){var m=byId("quickView");var c=byId("quickViewContent");var p=state.products.find(x=>x.id===id);if(!m||!c||!p)return;m.setAttribute("open","true");c.innerHTML='<div class="product-card"><img src="'+p.image+'" alt=""><h3>'+p.name+'</h3><div class="price"><strong>'+fmt(p.price*(1-(p.discount||0)/100))+'</strong>'+(p.discount?'<span class="badge">-'+p.discount+'%</span>':'')+'</div><p>'+p.description+'</p><div style="display:flex;gap:8px"><button class="btn btn--primary" data-add="'+p.id+'">Add to Cart</button><a class="btn btn--ghost" href="product.html?id='+encodeURIComponent(p.id)+'">View Details</a></div></div>';bindCardButtons()}
  function closeModals(){qa('[data-close]').forEach(function(x){x.addEventListener('click',function(){x.closest('.modal').removeAttribute('open')})})}
  function setupSearch(){var g=byId('globalSearch');var b=byId('globalSearchBtn');if(g&&b){b.addEventListener('click',function(){var qv=g.value.trim();if(qv)location.href='products.html?q='+encodeURIComponent(qv)})}}

  function renderFilters(){var cat=byId('filterCategory');var brand=byId('filterBrand');var price=byId('filterPrice');var pv=byId('filterPriceValue');var reset=byId('resetFilters');var search=byId('productSearch');var searchBtn=byId('productSearchBtn');if(!cat)return
    cat.innerHTML='<option value="">All</option>'+state.categories.map(c=>'<option>'+c+'</option>').join('')
    brand.innerHTML='<option value="">All</option>'+state.brands.map(b=>'<option>'+b+'</option>').join('')
    pv.textContent=fmt(price.value)
    price.addEventListener('input',function(){pv.textContent=fmt(price.value);renderCatalog()})
    cat.addEventListener('change',renderCatalog)
    brand.addEventListener('change',renderCatalog)
    reset.addEventListener('click',function(){cat.value='';brand.value='';price.value=price.max;pv.textContent=fmt(price.value);search.value='';renderCatalog()})
    if(searchBtn)searchBtn.addEventListener('click',renderCatalog)
  }
  function renderCatalog(){var grid=byId('catalogGrid');if(!grid)return;var cat=byId('filterCategory').value;var brand=byId('filterBrand').value;var price=+byId('filterPrice').value;var qv=(byId('productSearch')&&byId('productSearch').value||"").toLowerCase();grid.innerHTML='';
    var filtered=state.products.filter(function(p){var finalPrice=p.price*(1-(p.discount||0)/100);var okCat=!cat||p.category===cat;var okBrand=!brand||p.brand===brand;var okPrice=finalPrice<=price;var okQ=!qv||p.name.toLowerCase().includes(qv)||p.description.toLowerCase().includes(qv)||p.brand.toLowerCase().includes(qv);return okCat&&okBrand&&okPrice&&okQ})
    if(location.search){var params=new URLSearchParams(location.search);var catParam=params.get('category');var qParam=params.get('q');if(catParam){filtered=filtered.filter(p=>p.category===catParam)}if(qParam){var s=qParam.toLowerCase();filtered=filtered.filter(p=>p.name.toLowerCase().includes(s)||p.description.toLowerCase().includes(s))}}
    filtered.forEach(function(p){grid.appendChild(productCard(p))});bindCardButtons()
  }

  function renderProduct(){var params=new URLSearchParams(location.search);var idp=params.get('id');if(!idp)return;var p=state.products.find(x=>x.id===idp);if(!p)return;var g=byId('prodGallery');var t=byId('prodTitle');var pr=byId('prodPrice');var bd=byId('prodDiscount');var ds=byId('prodDesc');var st=byId('specsTable');var rel=byId('relatedGrid');if(g){g.innerHTML='<img src="'+p.image+'" alt=""><img src="'+p.image+'" alt="">'}
    if(t)t.textContent=p.name
    if(pr)pr.textContent=fmt(p.price*(1-(p.discount||0)/100))
    if(bd)bd.textContent=p.discount?'-'+p.discount+'%':''
    if(ds)ds.textContent=p.description
    if(st){st.innerHTML='';Object.keys(p.specs||{}).forEach(function(k){var tr=document.createElement('tr');tr.innerHTML='<td>'+k+'</td><td>'+p.specs[k]+'</td>';st.appendChild(tr)})}
    if(rel){var same=state.products.filter(x=>x.category===p.category&&x.id!==p.id).slice(0,4);same.forEach(function(s){rel.appendChild(productCard(s))});bindCardButtons()}
    var addBtn=byId('addToCart');var buyBtn=byId('buyNow');if(addBtn)addBtn.addEventListener('click',function(){addToCart(p,1)});if(buyBtn)buyBtn.addEventListener('click',function(){addToCart(p,1);openCart()})
  }

  function renderGallery(){var g=byId('galleryGrid');if(!g)return;var imgs=[
    'assets/img/IMG-20251202-WA0024.svg',
    'assets/img/17pm.svg',
    'assets/img/cctv.svg',
    'assets/img/lock.svg',
    'assets/img/solar.svg',
    'assets/img/power.svg'
  ];g.innerHTML='';imgs.forEach(function(src){var img=document.createElement('img');img.src=src;img.addEventListener('click',function(){var m=byId('lightbox');var i=byId('lightboxImg');if(m&&i){i.src=src;m.setAttribute('open','true')}});g.appendChild(img)})}

  function renderBlog(){var list=byId('blogList');var cats=byId('blogCategories');var search=byId('blogSearch');if(!list)return
    var posts=[
      {title:'Top Laptop Picks for 2025',cat:'Laptops',date:'Dec 1, 2025',image:'assets/img/blog-laptops.svg'},
      {title:'5G Phones: What to Know',cat:'Mobile',date:'Nov 21, 2025',image:'assets/img/blog-mobile.svg'},
      {title:'Smart Security Trends',cat:'Security',date:'Nov 11, 2025',image:'assets/img/blog-security.svg'}
    ]
    function render(items){list.innerHTML='';items.forEach(function(p){var el=document.createElement('div');el.className='card blog-card';el.innerHTML='<img src="'+p.image+'" alt=""><h4>'+p.title+'</h4><div class="meta">'+p.cat+' • '+p.date+'</div><div style="display:flex;gap:8px"><button class="btn btn--ghost">Share</button><a class="btn" href="#">Read</a></div>';list.appendChild(el)})}
    cats.innerHTML='<div class="card"><strong>Categories</strong><div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px"><button class="btn" data-cat="">All</button><button class="btn" data-cat="Laptops">Laptops</button><button class="btn" data-cat="Mobile">Mobile</button><button class="btn" data-cat="Security">Security</button></div></div>'
    render(posts)
    qa('[data-cat]').forEach(function(b){b.addEventListener('click',function(){var c=b.getAttribute('data-cat');render(c?posts.filter(x=>x.cat===c):posts)})})
    if(search)search.addEventListener('input',function(){var s=search.value.toLowerCase();render(posts.filter(x=>x.title.toLowerCase().includes(s)))})
  }

  function setupCartControls(){var open=byId('openCart');var close=byId('closeCart');if(open)open.addEventListener('click',openCart);if(close)close.addEventListener('click',closeCart);renderCart()}

  function paystackCheckout(){var key=window.EMMYTECH_PAYSTACK_KEY||'';if(!key){alert('Configure Paystack public key');return}var amount=Math.round(cartTotal()*100);var handler=window.PaystackPop&&window.PaystackPop.setup?window.PaystackPop.setup({key:key,email:'customer@example.com',amount:amount,currency:'NGN',callback:function(){alert('Payment successful');state.cart=[];lsSet('emmytech_cart',state.cart);renderCart();updateCartCount()},onClose:function(){}}):null;if(!handler){alert('Paystack SDK not loaded');return}handler.openCheckout()}
  function flutterwaveCheckout(){var key=window.EMMYTECH_FLUTTERWAVE_KEY||'';if(!key){alert('Configure Flutterwave public key');return}var amount=cartTotal();if(!window.FlutterwaveCheckout){alert('Flutterwave SDK not loaded');return}window.FlutterwaveCheckout({public_key:key,tx_ref:id(),amount:amount,currency:'NGN',payment_options:'card,banktransfer',customer:{email:'customer@example.com',name:'Customer'},callback:function(){alert('Payment successful');state.cart=[];lsSet('emmytech_cart',state.cart);renderCart();updateCartCount()}})
  }
  function setupCheckout(){var ps=byId('checkoutPaystack');var fw=byId('checkoutFlutterwave');if(ps)ps.addEventListener('click',paystackCheckout);if(fw)fw.addEventListener('click',flutterwaveCheckout);var s=document.createElement('script');s.src='https://js.paystack.co/v1/inline.js';document.body.appendChild(s);var f=document.createElement('script');f.src='https://checkout.flutterwave.com/v3.js';document.body.appendChild(f)}

  function handleAdmin(){if(document.body.getAttribute('data-page')!==pages.admin)return;var form=byId('adminForm');var list=byId('adminList');function render(){list.innerHTML='';state.products.forEach(function(p){var card=productCard(p);var del=document.createElement('button');del.className='btn btn--ghost';del.textContent='Delete';del.addEventListener('click',function(){state.products=state.products.filter(x=>x.id!==p.id);lsSet('emmytech_products',state.products);render();});card.appendChild(del);list.appendChild(card)});bindCardButtons()}
    render()
    form.addEventListener('submit',function(e){e.preventDefault();var data=new FormData(form);var obj={id:data.get('id')||id(),name:data.get('name'),brand:data.get('brand'),category:data.get('category'),price:Number(data.get('price')),discount:Number(data.get('discount')||0),image:data.get('image'),description:data.get('description'),specs:{}};var specs=data.get('specs');try{if(specs)obj.specs=JSON.parse(specs)}catch(e){}
      var exist=state.products.find(x=>x.id===obj.id);if(exist){Object.assign(exist,obj)}else{state.products.push(obj)}lsSet('emmytech_products',state.products);form.reset();render()})
  }

  function setupMobileNav(){var nav=q('.nav');var btn=byId('navToggle');if(btn&&nav){btn.addEventListener('click',function(){nav.classList.toggle('is-open')});qa('.nav__links a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('is-open')})})}}

  function initHome(){renderFeatured();renderDeals();renderTestimonials();setupSearch()}
  function initProducts(){renderFilters();renderCatalog();setupCartControls();setupCheckout()}
  function initProduct(){renderProduct();setupCartControls();setupCheckout()}
  function initGallery(){renderGallery()}
  function initBlog(){renderBlog()}
  function initContact(){var form=byId('contactForm');if(form)form.addEventListener('submit',function(e){e.preventDefault();alert('Message received. We will contact you.')})}
  function initNewsletter(){var form=byId('newsletterForm');if(form)form.addEventListener('submit',function(e){e.preventDefault();var email=byId('newsletterEmail').value.trim();if(email){var list=lsGet('emmytech_news')||[];list.push({email:email,ts:Date.now()});lsSet('emmytech_news',list);byId('newsletterEmail').value='';alert('Subscribed')}})}

  function init(){setYear();initData();updateCartCount();closeModals();setupMobileNav();var page=document.body.getAttribute('data-page');if(page===pages.home){initHome();initNewsletter()}else if(page===pages.products){initProducts()}else if(page===pages.product){initProduct()}else if(page===pages.gallery){initGallery()}else if(page===pages.blog){initBlog()}else if(page===pages.contact){initContact()}handleAdmin()}
  document.addEventListener('DOMContentLoaded',init)
})();
