snapshot.forEach(doc=>{

const c = doc.data() || {}

let nome = c.nome ? c.nome.trim() : "Canal"
let url  = c.url  ? c.url.trim()  : ""

if(!url) return

let div = document.createElement("div")

div.className="canal"
div.innerText=nome
div.onclick=()=>abrir(url)

lista.appendChild(div)

})