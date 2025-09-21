import React from "react";

const categories = [
  {
    id: 1,
    name: "Whey Protein",
    image: "/assets/whey.png",
  },
  {
    id: 2,
    name: "Creatine Monohydrate",
    image: "/assets/creatine.png",
  },
  {
    id: 3,
    name: "Peanut Butter",
    image: "/assets/peanut_butter.png",
  },
  {
    id: 4,
    name: "Oats & Muesli",
    image: "/assets/museli.png",
  },
];

const Category = () => {
  return (
    <div 
      className="bg-black" 
      style={{ 
        width: "100vw", 
        marginLeft: "calc(50% - 50vw)",
        paddingTop: "5rem",    // Extra top spacing to separate from previous section
        paddingBottom: "2rem"  // Reduced bottom spacing to avoid large gap with Combos section
      }}
    >
      <div className="container">
        {/* Header with improved spacing */}
        <div className="text-center" style={{ marginBottom: "2rem" }}>
          <h2 className="text-white fw-bold display-7">
            Browse by Categories
          </h2>
        </div>

        {/* Categories Grid with improved spacing */}
        <div className="row" style={{ gap: "2rem 0" }}>
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="col-12 col-sm-6 col-md-3" 
              style={{ 
                paddingLeft: "1rem", 
                paddingRight: "1rem",
                marginBottom: "1rem"
              }}
            >
              <div 
                className="card bg-dark border-0 rounded-4 overflow-hidden h-100 shadow-lg"
                style={{
                  transition: "all 0.3s ease",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
                }}
              >
                {/* Category Image with improved spacing */}
                <div className="position-relative" style={{ height: "220px" }}>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-100 h-100 object-fit-cover"
                    style={{ objectPosition: "center" }}
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-10"></div>
                </div>

                {/* Category Info with improved spacing */}
                <div className="card-body text-center" style={{ padding: "1.5rem" }}>
                  <h5 
                    className="card-title text-white fw-bold" 
                    style={{ 
                      marginBottom: "1.5rem",
                      fontSize: "1.2rem",
                      lineHeight: "1.3"
                    }}
                  >
                    {category.name}
                  </h5>
                  <button 
                    className="btn btn-warning fw-bold px-4 py-2 w-100 rounded-pill"
                    style={{
                      fontSize: "0.95rem",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#ffc107";
                      e.target.style.transform = "scale(1.02)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "";
                      e.target.style.transform = "scale(1)";
                    }}
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;