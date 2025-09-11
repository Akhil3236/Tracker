import { Cart } from "../models/cart/cart.js"
import { Order } from "../models/order/order.js";
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


/*--------------------------------------------------------
   A) checking weather the prodcts are Avaliable or Not 
---------------------------------------------------------*/

const validateOrder = async (cart) => {
  if (!cart.items || cart.items.length === 0) {
    return false;
  }

  for (const item of cart.items) {
    // Check if product exists
    const product = await Products.findById(item.productId);
    if (!product) {
      return false; // Invalid product
    }

    // Check if quantity is valid
    if (item.quantity <= 0 || item.quantity > product.stock) {
      return false; // Invalid quantity
    }

    // Check if price matches
    if (item.price !== product.price) {
      return false; // Price mismatch
    }
  }

  // Optionally check total price consistency
  const calculatedTotal = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  if (calculatedTotal !== cart.totalPrice) {
    return false; // Total price mismatch
  }

  return true;
}

/*--------------------------------------
3) placing the order in  the cart items
----------------------------------------*/



export const order = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'items not found' });
    }

    // Populate cart items with product details
    const populatedItems = [];
    let totalPrice = 0;

    for (const item of cart.items) {
      const product = await Products.findById(item.productId);
      if (!product) {
        return res.status(400).json({ message: 'Product not found' });
      }

      const itemTotal = product.cost * item.quantity;
      totalPrice += itemTotal;

      populatedItems.push({
        productId: item.productId,
        name: product.name,
        quantity: item.quantity,
        price: product.cost
      });
    }

    const newOrder = await Order.create({
      userId,
      items: populatedItems,
      totalPrice: totalPrice,
      status: 'Pending',
      createdAt: new Date()
    });


    await Cart.findOneAndDelete({ userId });

    res.status(200).json({
      message: "Order placed successfully",
      orderId: newOrder._id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server issue! Try again"
    });
  }
} 