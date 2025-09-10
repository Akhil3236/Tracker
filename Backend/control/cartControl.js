import { Cart } from "../models/cart/cart.js"
import { Products } from "../models/products/product.js"

/*---------------------------------
1) add the product in the cart
---------------------------------*/
export const addcart = async (req, res) => {


  try {
    const userId = req.user.id; // comes from JWT auth middleware
    const { productId, quantity } = req.body;


    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }


    let cart = await Cart.findOne({ userId });

    if (!cart) {

      cart = new Cart({
        userId,
        items: [{ productId, quantity }]
      });
    } else {

      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {

        cart.items.push({ productId, quantity });
      }
    }
    await cart.save();

    res.status(200).json({ message: "Product added to cart", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
}
/*-------------------------------------
2)  TO get the products in the cart 
------------------------------------*/
export const cart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findOne({ userId: id }).populate("items.productId");
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
}
/*---------------------------------
3) remove the product in the cart
---------------------------------*/
export const remove_prduct = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({ error: "Item ID is required" });
    }

    // Find the cart and remove the item
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Remove item from cart items array
    cart.items = cart.items.filter(item =>
      item.productId.toString() !== itemId &&
      item._id.toString() !== itemId
    );

    await cart.save();

    res.status(200).json({
      message: "Product removed successfully",
      cart
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to remove product from cart" });
  }
}