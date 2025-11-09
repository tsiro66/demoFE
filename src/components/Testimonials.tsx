import { RxAvatar } from "react-icons/rx";

const testimonials = [
  {
    id: 1,
    quote:
      "This product is amazing! It completely changed my workflow and saved me hours of time. Highly recommend it to anyone.",
    name: "Sarah Johnson",
    role: "Busy Professional",
  },
  {
    id: 2,
    quote:
      "I was skeptical at first, but the quality is outstanding. The customer service was also top-notch. Five stars!",
    name: "Michael Chen",
    role: "Fitness Enthusiast",
  },
  {
    id: 3,
    quote:
      "A must-have. It's intuitive, powerful, and looks great. I use it every single day. Worth every penny.",
    name: "Emily Rodriguez",
    role: "Tech Aficionado",
  },
];

const Testimonials = () => {
  return (
    <div className="py-16 lg:py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="header-font text-4xl font-extrabold text-gray-900 tracking-tight">
            Don't just take our word for it
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            See what our happy customers have to say.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-4xl shadow-lg flex flex-col"
            >
              <blockquote className="grow">
                <p className="text-lg text-gray-700 italic">
                  "{testimonial.quote}"
                </p>
              </blockquote>

              <footer className="mt-8">
                <div className="flex items-center">
                  <RxAvatar size={48} />

                  <div className="ml-4">
                    <p className="text-base font-bold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm font-medium text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </footer>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
