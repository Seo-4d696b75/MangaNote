
const baseurl = "http://localhost:4000/api/";


const getdefault = (endpoint,params) =>{
    
    const url = new URL(baseurl + endpoint);
    url.search = new URLSearchParams(params).toString();

    return fetch(url)
    .then((response) => response.json())
    .catch((error =>{
        console.error(error);
    }))
}

const postdefault = async (endpoint, params) => {
    const response = await fetch(baseurl+endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
    }).catch(err =>{
        throw err;
    });
    return response.json()
}

const deletedefault = () =>{
    return fetch()
}