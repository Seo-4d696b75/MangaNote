
const baseurl = "http://localhost:4000/api/";


export const getdefault = (endpoint,params) =>{
    
    const url = new URL(baseurl + endpoint);
    url.search = new URLSearchParams(params).toString();

    return fetch(url)
    .then((response) => response.json())
    .catch((error =>{
        console.error(error);
    }))
}

export const postdefault = async (endpoint, params) => {
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

export const putdefault = async (endpoint, userid) => {
    const response = await fetch(`${baseurl}${endpoint}/${userid}`, {
        method: "PUT",
    }).catch((err) => {
        throw err;
    });
};

export const deletedefault = async (endpoint, userid) => {
    const response = await fetch(`${baseurl}${endpoint}/${userid}`, {
        method: "DELETE",
    }).catch((err) => {
        throw err;
    });
};

