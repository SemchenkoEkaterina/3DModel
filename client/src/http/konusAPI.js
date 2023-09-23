import { $host } from "./index";



export const fetchKonus = async (radius, height, n) => {
    const {data} = await $host.get('api/konus',  {params: {
        radius, height, n
    }});
    return data;
}


