import React from 'react';

const products = [
  {
    id: 1,
    name: "Atom Whey Protein",
    price: "₹2500",
    mrp: "₹3000",
    discount: "16% off",
    image: "/assets/Atom_whey_protein.jpg"
  },
  {
    id: 2,
    name: "MYFITNESS Peanut Butter",
    price: "₹550",
    mrp: "₹800",
    discount: "30% off",
    image: "/assets/MYFitness_Peanut_Butter.webp"
  },
  {
    id: 3,
    name: "MB Creatine Monohydrate",
    price: "₹550",
    mrp: "₹800",
    discount: "30% off",
    image: "/assets/MB_creatine.jpg"
  },
  {
    id: 4,
    name: "MB Museli",
    price: "₹550",
    mrp: "₹800",
    discount: "30% off",
    image: "/assets/MB_Museli.jpg"
  }
];

const BestSeller = () => (
  <div className="bg-dark py-4" style={{ width: "100vw", marginLeft: "calc(50% - 50vw)" }}>
    {/* Removed .container for full width */}
    <div className="text-center mb-4">
      <h2 className="text-white fw-bold fs-2 d-flex align-items-center justify-content-center gap-2">
        Best Sellers
      </h2>
    </div>
    {/* Product Grid */}
    <div className="row g-3 px-3">
      {products.map((product) => (
        <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card bg-secondary bg-opacity-25 h-160 border-0 rounded-3">
            <div className="card-body p-3">
              {/* Product Image */}
              <div className="bg-white rounded-2 p-2 mb-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="img-fluid"
                  style={{ height: '160px', width: '90%', objectFit: 'contain' }}
                />
              </div>
              {/* Product Info */}
              <div>
                <h5 className="card-title text-white fw-bold fs-8 mb-1">
                  {product.name}
                </h5>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="text-white fw-bold">
                    {product.price}
                  </span>
                  <span className="text-light small text-decoration-line-through">
                    MRP: {product.mrp}
                  </span>
                </div>
                <span className="badge bg-success rounded-pill small">
                  {product.discount}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default BestSeller;