const apps = [{
 id:"cricfy",
 name:"CricFyTvMOD APK v7.20 (Live Cricket) Download",
 shortName:"CricFyTvMOD",
 version:"v7.20",
 size:"12.50 MB",
 category:"Video",
 compatibility:"Android",
 feature:"Live Cricket",
 description:"Live Cricket watching app. Check the download source and review the app permissions before installing.",
 badge:"Best",
 updated:"Recently added",
 icon:"assets/cricfy-icon.svg",
 download:"https://www.mediafire.com/file/awo2bt7hluwjfe7/Cricfy_v7.2.apk/file",
 rating:"—"
}];
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function card(app){return `<article class="app-card" tabindex="0" role="button" data-open-app="${esc(app.id)}" aria-label="View ${esc(app.shortName)} details"><img class="app-icon" src="${esc(app.icon)}" alt="${esc(app.shortName)} icon"><div class="app-info"><h3>${esc(app.shortName)}</h3><p>${esc(app.category)} · ${esc(app.size)}</p><div class="app-meta"><span class="pill">${esc(app.compatibility)}</span>${app.badge?`<span class="pill">${esc(app.badge)}</span>`:""}</div></div><span class="arrow">›</span></article>`}
function render(list=apps){const best=list.filter(a=>a.badge==="Best");$("#bestGrid").innerHTML=best.map(card).join("");$("#latestGrid").innerHTML=list.map(card).join("");$("#appCount").textContent=`${String(list.length).padStart(2,"0")} APP${list.length===1?"":"S"}`;$("#emptyState").classList.toggle("hidden",list.length!==0);bindCards()}
function bindCards(){document.querySelectorAll("[data-open-app]").forEach(el=>{el.onclick=()=>openApp(el.dataset.openApp);el.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openApp(el.dataset.openApp)}}})}
function openApp(id){const app=apps.find(a=>a.id===id);if(!app)return;$("#home").classList.add("hidden");document.querySelectorAll(".section,.update-strip,.about-section").forEach(el=>el.classList.add("hidden"));$("#detailPage").classList.remove("hidden");$("#detailContent").innerHTML=`
<section class="detail-hero"><img class="detail-icon" src="${esc(app.icon)}" alt="${esc(app.shortName)} icon"><div><h1 class="detail-title">${esc(app.name)}</h1><div class="detail-sub">${esc(app.category)} · ${esc(app.size)} · ${esc(app.compatibility)}</div><a class="download-button" href="${esc(app.download)}" target="_blank" rel="noopener noreferrer">Download APK <span>↗</span></a></div></section>
<div class="detail-columns"><div><section class="detail-panel"><h3>About this app</h3><p>${esc(app.description)}</p></section><section class="detail-panel"><h3>Reviews</h3><div id="reviewsList"><p>No reviews yet. Be the first to share your thoughts.</p></div><form class="review-form" id="reviewForm"><input id="reviewName" maxlength="35" placeholder="Your name" aria-label="Your name" required><textarea id="reviewText" maxlength="500" placeholder="Write a review..." aria-label="Write a review" required></textarea><button type="submit">Post review</button></form></section></div><div><section class="detail-panel"><h3>App details</h3><div class="info-row"><span>Version</span><span>${esc(app.version)}</span></div><div class="info-row"><span>Size</span><span>${esc(app.size)}</span></div><div class="info-row"><span>Category</span><span>${esc(app.category)}</span></div><div class="info-row"><span>Compatibility</span><span>${esc(app.compatibility)}</span></div><div class="info-row"><span>Main feature</span><span>${esc(app.feature)}</span></div><div class="info-row"><span>Label</span><span>${esc(app.badge||"Latest")}</span></div></section><section class="detail-panel"><h3>Before installing</h3><p>Only install APK files from sources you trust. Check permissions and scan files before installing.</p></section></div></div>`;
window.scrollTo({top:0,behavior:"smooth"});$("#reviewForm").onsubmit=submitReview}
function submitReview(e){e.preventDefault();const name=$("#reviewName").value.trim(),body=$("#reviewText").value.trim();if(!name||!body)return;const list=$("#reviewsList");if(list.querySelector("p")?.textContent.startsWith("No reviews"))list.innerHTML="";const item=document.createElement("div");item.className="review";const strong=document.createElement("strong");strong.textContent=name;const p=document.createElement("p");p.textContent=body;item.append(strong,p);list.prepend(item);$("#reviewForm").reset();showToast("Review added for this visit.")}
function goHome(){ $("#detailPage").classList.add("hidden");$("#home").classList.remove("hidden");document.querySelectorAll(".section,.update-strip,.about-section").forEach(el=>el.classList.remove("hidden"));window.scrollTo({top:0,behavior:"smooth"});render()}
function showToast(msg){const t=$("#toast");t.textContent=msg;t.style.display="block";setTimeout(()=>t.style.display="none",2400)}
$("#searchInput").addEventListener("input",e=>{const q=e.target.value.toLowerCase().trim();render(apps.filter(a=>[a.name,a.shortName,a.category,a.feature,a.description].join(" ").toLowerCase().includes(q)));if(q)$("#latest").scrollIntoView({behavior:"smooth",block:"start"})});
$("#backButton").addEventListener("click",goHome);
document.querySelectorAll("[data-home]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();goHome()}));
$("#menuButton").addEventListener("click",()=>$("#navLinks").classList.toggle("open"));
$("#year").textContent=new Date().getFullYear();
render();