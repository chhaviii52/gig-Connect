import { motion } from 'framer-motion';
import { CheckCircle, Search, Briefcase, MessageCircle } from 'lucide-react';
import Navbar from './Navbar';
const steps = [
  {
    title: "Find Skilled Workers",
    description: "Search for verified professionals including plumbers, electricians, carpenters, and more.",
    icon: <Search className="h-12 w-12 text-primary" />,
    image: "/images/find-worker.jpg",
  },
  {
    title: "Hire with Confidence",
    description: "Review worker profiles, ratings, and past work before making a decision.",
    icon: <Briefcase className="h-12 w-12 text-primary" />,
    image: "/images/hire-worker.jpg",
  },
  {
    title: "Chat & Collaborate",
    description: "Use our in-app chat to discuss project details and finalize work agreements.",
    icon: <MessageCircle className="h-12 w-12 text-primary" />,
    image: "/images/chat-worker.jpg",
  },
  {
    title: "Get the Job Done",
    description: "Workers complete the task efficiently, and payments are handled securely through the platform.",
    icon: <CheckCircle className="h-12 w-12 text-primary" />,
    image: "/images/job-done.jpg",
  }
];
type User = {
  id: string;
  email: string;
  name?: string;
};
type IndexProps = {
  user: User | null;
};
const Howitwrks : React.FC<IndexProps & { setUser: (user: User | null) => void }> = ({ user, setUser }) => {
  return (
    <div className="w-full">
      <Navbar user={user} setUser={setUser} />
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[350px] flex items-center justify-center text-white text-center px-6"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}>
        <div className="bg-black/50 p-6 rounded-lg">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold"
          >
            How GigConnect Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-2 text-lg"
          >
            Connecting skilled workers with those who need them.
          </motion.p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Our Process</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex items-center space-x-6 bg-white p-6 rounded-lg shadow-lg"
            >
              {/* Left: Icon */}
              <div className="flex-shrink-0">
                {step.icon}
              </div>
              {/* Right: Content */}
              <div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-gray-600 mt-2">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-4"
          >
            Why Choose GigConnect?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-700 max-w-2xl mx-auto"
          >
            GigConnect is a trusted platform that helps businesses and homeowners find reliable, skilled workers with ease.
          </motion.p>
        </div>
      </section>
    </div>
  );
};

export default Howitwrks;


