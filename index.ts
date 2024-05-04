import { avitoParser } from "./avito";
const cookie =
    "srv_id=B3CS7fis0NHHIO4U.UyazBLiw6OJqMb2B7p8_gGH3ehPSmDkczkD8ZpRJBFV6aMQfeal6H8KJcRimlOPWdfJs.d_VKBnOCOPveqq6EYUGZovmvmQ7vNDfV_2Cr2pldQCw=.web; gMltIuegZN2COuSe=EOFGWsm50bhh17prLqaIgdir1V0kgrvN; u=32g8qj9f.14ojbps.pzvuajg3ixg0; v=1714331243; buyer_laas_location=641780; luri=novosibirsk; buyer_location_id=641780; sx=H4sIAAAAAAAC%2FwTAwQ3CMAwF0F3%2BmYOtOt9ytmkTF4lbQUBC1d15J0iydecejEJjpG%2B5RPcirXkP1BMfVMg9v%2BuQUK7Hcz7KnG%2B%2Bhm%2B7mozfgRsSVV3N1GnLdf0DAAD%2F%2Fz3TvcBbAAAA; dfp_group=30; abp=0; _gcl_au=1.1.1621613526.1714331244; _ga_M29JC28873=GS1.1.1714331244.1.0.1714331244.60.0.0; _ga=GA1.1.714319099.1714331245; tmr_lvid=23ef490690e4071abcd34f862a35c843; tmr_lvidTS=1714136738243; _ym_uid=1714136737580459943; _ym_d=1714331245; yandex_monthly_cookie=true; advcake_track_id=e18a09fd-f8d9-64ac-2558-e284587c0f01; advcake_session_id=560db73d-c584-b1f5-a9e9-9cafa077ff9d; adrcid=AVNH8jZuogn8mttRpM4C_qg; _ym_visorc=b; _ym_isad=2; adrdel=1; _buzz_fpc=JTdCJTIycGF0aCUyMiUzQSUyMiUyRiUyMiUyQyUyMmRvbWFpbiUyMiUzQSUyMi53d3cuYXZpdG8ucnUlMjIlMkMlMjJleHBpcmVzJTIyJTNBJTIyTW9uJTJDJTIwMjglMjBBcHIlMjAyMDI1JTIwMTklM0EwNyUzQTI1JTIwR01UJTIyJTJDJTIyU2FtZVNpdGUlMjIlM0ElMjJMYXglMjIlMkMlMjJ2YWx1ZSUyMiUzQSUyMiU3QiU1QyUyMnVmcCU1QyUyMiUzQSU1QyUyMmY2Nzg0NTI5M2UyNWZmYWVkN2Q0YmFjM2Y3ZWY2NzMwJTVDJTIyJTJDJTVDJTIyYnJvd3NlclZlcnNpb24lNUMlMjIlM0ElNUMlMjIxMjQuMCU1QyUyMiU3RCUyMiU3RA==; _buzz_aidata=JTdCJTIycGF0aCUyMiUzQSUyMiUyRiUyMiUyQyUyMmRvbWFpbiUyMiUzQSUyMi53d3cuYXZpdG8ucnUlMjIlMkMlMjJleHBpcmVzJTIyJTNBJTIyTW9uJTJDJTIwMjglMjBBcHIlMjAyMDI1JTIwMTklM0EwNyUzQTI1JTIwR01UJTIyJTJDJTIyU2FtZVNpdGUlMjIlM0ElMjJMYXglMjIlMkMlMjJ2YWx1ZSUyMiUzQSUyMiU3QiU1QyUyMnVmcCU1QyUyMiUzQSU1QyUyMldpQUpRM2hObXolMkJBV3YyYk1wTlFxZyU1QyUyMiUyQyU1QyUyMmJyb3dzZXJWZXJzaW9uJTVDJTIyJTNBJTVDJTIyMTI0LjAlNUMlMjIlN0QlMjIlN0Q=; tmr_detect=0%7C1714331247108";
// import fetch from "node-fetch";
// avitoParser({ mark: "Ford", cookie: cookie });
// avitoParser({ mark: "Geely", cookie: cookie });
// avitoParser({ mark: "Haval", cookie: cookie });
// avitoParser({ mark: "Honda", cookie: cookie });
// avitoParser({ mark: "Hyundai", cookie: cookie });
// avitoParser({ mark: "Kia", cookie: cookie });
// avitoParser({ mark: "Lexus", cookie: cookie });
// avitoParser({ mark: "Opel", cookie: cookie });
// avitoParser({ mark: "Volkswagen", cookie: cookie });
// avitoParser({ mark: "Renault", cookie: cookie });

// fetch('http://localhost:3000/api/car-ad/create', {
//     method: 'POST',
//     body: JSON.stringify({
//         carAd: {
//             title: 'test title',
//             price: 'test price',
//             description: 'test descriptioqweqweqen',
//             link: 'test link',
//             source: 'avito'
//         },
//         tableName: 'test_table'
//     }),
//     headers: {
//         'Content-Type': 'application/json'
//     }
// }).then(res => {
//     console.log(res);
//     return res.json()})
//     .then(data => console.log(data)).catch(console.error)

(async () => {
//    await avitoParser({ mark: "Ford", cookie: cookie });
// await avitoParser({ mark: "Geely", cookie: cookie });
// await avitoParser({ mark: "Haval", cookie: cookie });
await avitoParser({ mark: "Honda", cookie: cookie });
await avitoParser({ mark: "Hyundai", cookie: cookie });
await avitoParser({ mark: "Kia", cookie: cookie });
await avitoParser({ mark: "Lexus", cookie: cookie });
await avitoParser({ mark: "Opel", cookie: cookie });
await avitoParser({ mark: "Volkswagen", cookie: cookie });
await avitoParser({ mark: "Renault", cookie: cookie });
})()
