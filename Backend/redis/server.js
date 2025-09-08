// import {client} from "../src/redisclient.js"
import { fetchFromMainServer } from "../utils/fetchcartfromMain.js"
/*---------------------------------------------------
   1) add the product in the cart by using Redis
----------------------------------------------------*/

export const rediscart = async (req, res) => {

    const userId = req.user.id;
    const jwtToken = req.cookies.token;
    const incomingCookies = req.headers.cookie || "";

    try {
        
        const cartData = await fetchFromMainServer(userId, jwtToken, incomingCookies);
        
        if (!cartData) {
            res.json({
                message:"not added !"
            })
        }
    
        res.json({ source: "main-server", cart: cartData });
    } catch (error) {

        res.status(404).json({
            message: "error !!",
            error
        })
    }
}