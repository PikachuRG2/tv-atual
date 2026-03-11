<script>

let canais=[]
let canalAtual=0
let hls

async function carregar(){

await carregarM3U("lista.m3u")
await carregarJSON("lista.json")
await carregarAPI("https://api.meusite.com/canais")

if(canais.length === 0){
console.warn("Nenhum canal carregado")
return
}

mostrar()
abrir(0)

}

async function carregarM3U(url){

try{

const res=await fetch(url)
const txt=await res.text()

const linhas=txt.split("\n")

for(let i=0;i<linhas.length;i++){

let linha = linhas[i].trim()

if(linha.startsWith("#EXTINF")){

let nome = linha.split(",")[1] || "Canal"
let link = (linhas[i+1] || "").trim()

if(link){
canais.push({nome:nome.trim(),url:link})
}

}

}

}catch(e){

console.warn("Erro M3U",e)

}

}

async function carregarJSON(url){

try{

const res=await fetch(url)
const data=await res.json()

if(!Array.isArray(data)) return

data.forEach(c=>{

if(c.url){
canais.push({
nome:(c.nome || "Canal").trim(),
url:c.url
})
}

})

}catch(e){

console.warn("Erro JSON",e)

}

}

async function carregarAPI(url){

try{

const res=await fetch(url)
const data=await res.json()

if(!data.canais) return

data.canais.forEach(c=>{

if(c.stream){
canais.push({
nome:(c.nome || "Canal").trim(),
url:c.stream
})
}

})

}catch(e){

console.warn("Erro API",e)

}

}

function mostrar(){

const div=document.getElementById("canais")
div.innerHTML=""

canais.forEach((c,i)=>{

let item=document.createElement("div")
item.className="canal"
item.innerText=c.nome

if(i===canalAtual) item.classList.add("ativo")

item.onclick=()=>abrir(i)

div.appendChild(item)

})

}

function abrir(i){

if(!canais[i]) return

canalAtual=i

const url=canais[i].url
const video=document.getElementById("video")

if(hls) hls.destroy()

if(Hls.isSupported()){

hls=new Hls({
lowLatencyMode:true
})

hls.loadSource(url)
hls.attachMedia(video)

}else{

video.src=url

}

atualizar()

}

function atualizar(){

document.querySelectorAll(".canal").forEach((el,i)=>{

el.classList.toggle("ativo",i===canalAtual)

})

}

document.addEventListener("keydown",e=>{

if(e.key==="ArrowDown" && canalAtual < canais.length-1){
abrir(canalAtual+1)
}

if(e.key==="ArrowUp" && canalAtual > 0){
abrir(canalAtual-1)
}

})

carregar()

</script>