// import { useEffect, useState } from "react";
// import { getGlobalSettings, getMediaURL } from "../api";

// function recupImg(){
// const [images, setImages] = useState({});

//     useEffect(() => {
//      async function load() {
//         const acf = await getGlobalSettings();

//         const logo = await getMediaURL(acf.logo_du_site);
//         const header = await getMediaURL(acf.image_header);
//         const search = await getMediaURL(acf.icone_recherche);
//         const adherent = await getMediaURL(acf.icone_adherent);

//         setImages({
//             logo,
//             header,
//             search,
//             adherent
//         });
//     }

//     load();
// }, []);

// return (
//     <div>
//         <img src={images.logo} />
//         <img src={images.header} />
//         <img src={images.search} />
//         <img src={images.adherent} />
//     </div>
// );
// }
// export default recupImg ;