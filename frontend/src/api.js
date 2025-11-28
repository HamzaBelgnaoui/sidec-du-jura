
// import axios from "axios";

// const API = "http://sidec-du-jura.local/wp-json/wp/v2/";

// export async function getGlobalSettings() {
//     const res = await axios.get(API + "global_settings");
//     return res.data[0].acf; // contient ID des images
// }

// export async function getMediaURL(id) {
//     if (!id) return null;

//     const res = await axios.get(API + "media/" + id);
//     return res.data.source_url;
// }
import axios from "axios";

const API = "http://sidec-du-jura.local/wp-json/wp/v2/";

// Récupère les réglages globaux (ACF)
export async function getGlobalSettings() {
    const res = await axios.get(API + "global_settings");
    return res.data[0].acf; // contient ID des images
}

// Récupère l'URL d'un média via son ID
export async function getMediaURL(id) {
    if (!id) return null;

    const res = await axios.get(API + "media/" + id);
    return res.data.source_url;
}
