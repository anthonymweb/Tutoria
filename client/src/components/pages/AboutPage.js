import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaGraduationCap, 
  FaChalkboardTeacher, 
  FaShieldAlt, 
  FaMoneyBillWave,
  FaGlobe,
  FaMobileAlt,
  FaVideo,
  FaCertificate,
  FaUsers,
  FaAward,
  FaHeart
} from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-6">
              Africa's First Decentralized Learning Platform
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Where verified humans teach verified skills, instantly. We're building a future where knowledge knows no boundaries.
            </p>
          </motion.div>
        </div>

        {/* Mission Section */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-8">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 text-center mb-8">
                We're on a mission to democratize education and create economic opportunities across Africa. 
                Our platform connects skilled individuals with eager learners, making quality education accessible to all.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-12">
            Platform Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<FaGraduationCap />}
              title="Expert Tutors"
              description="Verified professionals with proven teaching experience and subject expertise."
            />
            <FeatureCard
              icon={<FaShieldAlt />}
              title="Secure Platform"
              description="End-to-end encrypted sessions and verified tutor credentials."
            />
            <FeatureCard
              icon={<FaMoneyBillWave />}
              title="Flexible Payments"
              description="Multiple payment options including mobile money and bank transfers."
            />
            <FeatureCard
              icon={<FaGlobe />}
              title="Global Reach"
              description="Connect with tutors and students from anywhere in the world."
            />
            <FeatureCard
              icon={<FaMobileAlt />}
              title="Mobile First"
              description="Optimized for low-bandwidth connections and mobile devices."
            />
            <FeatureCard
              icon={<FaVideo />}
              title="Live Sessions"
              description="Interactive video sessions with screen sharing and virtual whiteboard."
            />
            <FeatureCard
              icon={<FaCertificate />}
              title="Verified Skills"
              description="Rigorous verification process for tutor credentials and expertise."
            />
            <FeatureCard
              icon={<FaChalkboardTeacher />}
              title="Career Growth"
              description="Opportunities for tutors to build their teaching portfolio."
            />
          </div>
        </div>

        {/* Impact Section */}
        <div className="bg-gradient-to-b from-purple-50 to-blue-50 py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-8">
                Our Impact
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <ImpactCard
                  number="1000+"
                  label="Active Tutors"
                />
                <ImpactCard
                  number="5000+"
                  label="Students Helped"
                />
                <ImpactCard
                  number="10000+"
                  label="Sessions Completed"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
  >
    <div className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const ImpactCard = ({ number, label }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white rounded-xl shadow-lg p-6"
  >
    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-2">
      {number}
    </div>
    <div className="text-gray-600">{label}</div>
  </motion.div>
);

export default AboutPage; 