// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function FakeApi() {
//     const [datas, setData] = useState([]);
//     useEffect(() => {
//         setTimeout(() => {
//         let response = axios.get(
//             "https://islombekorifov7777755555.pythonanywhere.com/mainapp/courses/"
//         );
//         console.log(response);
//         setData(response);
//         }, 1);
//     }, []);
//     return (
//         <>
//             {/* {datas.map((data) => {
//                 <>
//                     <h1>{data.id}</h1>
//                     <img src={data.img} className="h-[30px] w-[30px]" alt="sdsjda"/>
//                     <h3>{data.name}</h3>
//                 </>;
//             })} */}
//         </>
//     );
// }
