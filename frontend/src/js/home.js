let myForm = document.querySelector("#myForm")
addEventListener("submit", async(e)=>{
    e.preventDefault();
    let data = new FormData(e.target)

    let config = {
        method: e.target.method, 
        headers: {
            'x-version': "1.0.0"
        }, 
        body: data
    }
    let peticion = await fetch(e.target.action, config)
    console.log(peticion)
    let res = await peticion.text();
    console.log(res);
})