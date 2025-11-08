'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Users, Award, Shield, Star } from 'lucide-react';

export const TrustSignals: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const stats = [
    { icon: Users, value: '50K+', label: 'Students Helped' },
    { icon: Award, value: '500+', label: 'Universities' },
    { icon: Star, value: '4.9/5', label: 'User Rating' },
    { icon: Shield, value: '100%', label: 'Privacy Protected' },
  ];

  const testimonials = [
    {
      text: "The AI agent understood exactly what I was looking for. Found 3 perfect matches I hadn't even considered!",
      author: 'Priya S., Computer Science',
    },
    {
      text: "Saved me weeks of research. The personalized recommendations were spot-on for my goals and budget.",
      author: 'Rahul K., Business',
    },
    {
      text: "So easy to use and the results were incredibly detailed. Highly recommend for anyone studying abroad!",
      author: 'Ananya M., Engineering',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 bg-blue-100 rounded-full"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                </motion.div>
                <motion.div
                  className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs sm:text-sm md:text-base text-gray-600">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Testimonials */}
        <motion.div
          className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-50 rounded-xl p-4 sm:p-6 card-hover"
              whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
            >
              <motion.div
                className="flex items-center gap-1 mb-3 sm:mb-4"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.1 + 0.5 + i * 0.05 }}
                  >
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </motion.div>
              <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="font-semibold text-xs sm:text-sm text-gray-900">{testimonial.author}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
