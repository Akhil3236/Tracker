import React from 'react';

const Combos = () => {
  const combos = [
    {
      id: 1,
      name: "Protein + Peanut Butter",
      text: "Boost your muscle growth and energy with this perfect protein and healthy fats combo.",
      price: "₹2499",
      image: "../../assets/combo_1.png"
    },
    {
      id: 2,
      name: "Creatine + Oats",
      text: "Maximize your workout performance and sustained energy with this powerful pre-workout duo.",
      price: "₹1899",
      image: "../../assets/combo_2.png"
    }
  ];

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <div style={{
      backgroundColor: '#000000',
      minHeight: '100vh',
      padding: '60px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{
            color: '#ffffff',
            fontSize: '40px',
            fontWeight: '700',
            margin: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}>
            <span style={{
              fontSize: '40px',
              background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 20px rgba(255, 107, 53, 0.3))'
            }}>
              🔥
            </span>
            Combo Deals
          </h2>
        </div>

        {/* Product Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '30px',
          maxWidth: '1100px',
          margin: '0 auto'
        }}>
          {combos.map((combo) => (
            <div 
              key={combo.id} 
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '20px',
                padding: '0',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                overflow: 'hidden'
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Product Image */}
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                margin: '20px',
                borderRadius: '16px',
                padding: '30px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '200px',
                background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)'
              }}>
                <img
                  src={combo.image}
                  alt={combo.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '180px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1))'
                  }}
                />
              </div>

              {/* Content */}
              <div style={{ padding: '0 30px 30px 30px' }}>
                {/* Product Name */}
                <h3 style={{
                  color: '#ffffff',
                  fontSize: '24px',
                  fontWeight: '700',
                  margin: '0 0 12px 0',
                  lineHeight: '1.3'
                }}>
                  {combo.name}
                </h3>

                {/* Product Description */}
                <p style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '16px',
                  lineHeight: '1.5',
                  margin: '0 0 20px 0',
                  fontWeight: '400'
                }}>
                  {combo.text}
                </p>

                {/* Price */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{
                    color: '#ffc107',
                    fontSize: '28px',
                    fontWeight: '700',
                    background: 'linear-gradient(135deg, #ffc107, #ffeb3b)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {combo.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promotional Banner */}
        <div style={{
          backgroundColor: '#dc3545',
          borderRadius: '15px',
          padding: '25px 20px',
          textAlign: 'center',
          marginTop: '40px',
          background: 'linear-gradient(135deg, #dc3545, #c82333)',
          boxShadow: '0 10px 30px rgba(220, 53, 69, 0.3)'
        }}>
          <h2 style={{
            color: '#ffffff',
            fontSize: '35px',
            fontWeight: '800',
            margin: '0 0 20px 0',
            lineHeight: '1.2',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
          }}>
            Extra 10% OFF on orders above ₹1500
          </h2>
          
          <button style={{
            backgroundColor: '#ffc107',
            color: '#000000',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 30px',
            fontSize: '15px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 5px 15px rgba(255, 193, 7, 0.4)',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ffcd39';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 193, 7, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ffc107';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 5px 15px rgba(255, 193, 7, 0.4)';
          }}>
            Shop Combos
          </button>
        </div>
      </div>
    </div>
  );
};

export default Combos;
