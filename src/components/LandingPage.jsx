import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <div className="bg-gray-950 min-h-screen text-white">
            <header className="container mx-auto py-6 px-4">
                <nav className="flex justify-between items-center">
                    <motion.h1
                        className="text-2xl font-bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link to="/" className="text-2xl font-bold text-white hover:text-gray-300">
                            MNFST Funnels
                        </Link>
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Link to="/login" className="mr-4 hover:text-gray-300">Login</Link>
                        <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Sign Up</Link>
                    </motion.div>
                </nav>
            </header>

            <main className="container mx-auto px-4 py-16">
                <motion.section className="text-center mb-16" {...fadeIn}>
                    <h2 className="text-5xl font-bold mb-4">Design Funnels, Track Leads</h2>
                    <p className="text-xl text-gray-400 mb-8">MNFST Funnels empowers you to easily design sales funnels and efficiently track leads throughout your conversion process.</p>
                    <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full text-lg font-semibold">Get Started</Link>
                </motion.section>

                <motion.section className="mb-16" {...fadeIn}>
                    <h3 className="text-3xl font-semibold mb-8 text-center">Key Features</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Easy Funnel Design',
                                description: 'Intuitive drag-and-drop interface for creating custom sales funnels tailored to your business needs.'
                            },
                            {
                                title: 'Lead Tracking',
                                description: 'Comprehensive lead management system to monitor and nurture prospects through each stage of your funnel.'
                            },
                            {
                                title: 'A/B Testing',
                                description: 'Create multiple funnels to compare and optimize your conversion strategies for maximum effectiveness.'
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-gray-900 p-6 rounded-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                                <p className="text-gray-400">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                <motion.section className="text-center" {...fadeIn}>
                    <h3 className="text-3xl font-semibold mb-8">Pricing</h3>
                    <div className="flex justify-center space-x-8">
                        <motion.div
                            className="bg-gray-900 p-8 rounded-lg"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <h4 className="text-2xl font-semibold mb-4">Monthly</h4>
                            <p className="text-4xl font-bold mb-4">$49<span className="text-xl text-gray-400">/month</span></p>
                            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full">Choose Plan</button>
                        </motion.div>
                        <motion.div
                            className="bg-gray-900 p-8 rounded-lg"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <h4 className="text-2xl font-semibold mb-4">Yearly</h4>
                            <p className="text-4xl font-bold mb-4">$399<span className="text-xl text-gray-400">/year</span></p>
                            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full">Choose Plan</button>
                        </motion.div>
                    </div>
                </motion.section>
            </main>

            <footer className="bg-gray-900 py-8 mt-16">
                <div className="container mx-auto px-4 text-center text-gray-400">
                    <p>&copy; 2023 MNFST Funnels. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;