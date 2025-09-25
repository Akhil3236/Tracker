"use client";
import Image from "next/image";

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Lokesh",
      title: "Student",
      image: "/assets/pic1.jpg",
      testimonial:
        "FitFuel has been a game-changer for finding quality supplements for my recovery and performance. Their whey protein selection is unmatched, and I feel stronger and more energized every day.",
    },
    {
      id: 2,
      name: "Sashank",
      title: "Fitness Enthusiast",
      image: "/assets/pic2.jpg",
      testimonial:
        "I've tried many platforms for gym supplements, but FitFuel stands out. Their creatine monohydrate gives me the extra push I need in my workouts, and their peanut butter is perfect for my post-workout snacks.",
    },
    {
      id: 3,
      name: "Harsha",
      title: "Student",
      image: "/assets/pic3.jpg",
      testimonial:
        "As a wellness coach, I always recommend FitFuel to my clients. Their platform offers everything from quality whey proteins to nutritious muesli. It's a one-stop shop you can trust for all your fitness nutrition goals.",
    },
  ];

  return (
    <div
      className="py-5"
      style={{
        background:
          "linear-gradient(135deg, #303030ff 0%, #626262ff 50%, #454545 100%)",
        width: "100%",
        minHeight: "84vh",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1400px", margin: "0 auto" }}>
        {/* Heading */}
        <div className="text-center mb-5">
          <h2
            className="display-4 fw-bold mb-0"
            style={{
              color: "#ffffff",
              fontSize: "3.0rem",
              fontWeight: "700",
            }}
          >
            What Our Clients Say
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div
          className="row g-4 justify-content-center"
          style={{ marginLeft: 0, marginRight: 0 }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="col-lg-4 col-md-6">
              <div
                className="card h-100 border-0"
                style={{
                  backgroundColor: "#2b2d31",
                  borderRadius: "20px",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div className="card-body text-center p-4">
                  {/* Avatar Wrapper */}
                  <div
                    style={{
                      width: "90px",
                      height: "90px",
                      margin: "0 auto 1rem",
                      position: "relative",
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "4px solid #404248",
                    }}
                  >
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </div>

                  <h5
                    className="card-title fw-bold mb-2"
                    style={{
                      color: "#ffffff",
                      fontSize: "1.4rem",
                      fontWeight: "600",
                    }}
                  >
                    {testimonial.name}
                  </h5>

                  <p
                    className="mb-4"
                    style={{
                      fontSize: "0.9rem",
                      color: "#9ca3af",
                      fontWeight: "400",
                    }}
                  >
                    {testimonial.title}
                  </p>

                  <p
                    className="card-text lh-lg"
                    style={{
                      fontSize: "1.0rem",
                      lineHeight: "1.7",
                      color: "#d1d5db",
                      fontWeight: "400",
                    }}
                  >
                    {testimonial.testimonial}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
