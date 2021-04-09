import axios from 'axios';

export function addRestuarantAPI(){
    return axios.create({
        baseURL:"http://khajaorder.com/korderapi/resturants/add.php?fbclid=IwAR2FC1Ewn0Xyi1wOPV39y5bmfxqxu3tjKlW8Qb8TUlH6vwMDCwX-W9EJbH0"
    })
}