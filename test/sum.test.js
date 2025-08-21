const { response } = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const backendurl=process.env.url;

/*-------------------
   server testing
--------------------*/


describe('Server-Testing', () => { 
    test('test 1: api /tesing-1', async() => { 
        
        const res= await axios.get(`${backendurl}`);
        expect(res.data.message).toBe("ok");
     })
})

/*-------------------
   sign-in tests
--------------------*/
describe('Signin test', () => { 
    test('user-signin', async() => { 

        const user={
            name:"akhil",
            email:"ajaytuluri123@gmail.com",
            password:"Madhu@3239"
        };
        const res=await axios.post(`${backendurl}auth/signin`,user);
        expect(res.status).toBe(200);

     })
 })
 /*-------------------
   sign-up tests
--------------------*/

describe('Signup test', () => { 
    test('user-signup', async() => { 
        const user={
            name:"ajay",
            email:"akhiltuluri@gmial.com",
            password:"Madhu@3236"
        };

        const res=await axios.post(`${backendurl}auth/signup`,user);
        expect(res.status).toBe(200);

     })
 })


 /*-------------------
   auth test
--------------------*/



