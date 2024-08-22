import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import background from '../Images/userbackground.jpg'; // Ensure the path is correct
import Navbar from './Navbar';

function UserHome() {
    return (
        <>
            <Navbar />
            <div
                className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                {/* Gradient Overlay for Better Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

                {/* Hero Section */}
                <div className="relative text-center bg-white bg-opacity-80 p-10 rounded-lg shadow-lg max-w-2xl mx-4 mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">Welcome to Employee Management System</h1>
                    <p className="text-xl text-gray-700 mb-8">Streamline your work with efficient task management, scheduling, and collaboration.</p>
                </div>
            </div>

            {/* Introduction Section */}
            <section className="relative text-center bg-white bg-opacity-80 p-12 rounded-lg shadow-lg max-w-2xl mx-auto mb-16">
                <h2 className="text-4xl font-semibold text-gray-800 mb-6">Introduction</h2>
                <p className="text-lg text-gray-700">Our platform helps you streamline your work processes with efficient task management, seamless meeting scheduling, and effective team collaboration.</p>
            </section>

            {/* Features Section */}
            <section className="relative text-center bg-white bg-opacity-80 p-12 rounded-lg shadow-lg max-w-2xl mx-auto mb-16">
                <h2 className="text-4xl font-semibold text-gray-800 mb-6">Features</h2>
                <div className="flex flex-wrap justify-center gap-8">
                    <div className="bg-gray-100 p-8 rounded-lg shadow-md w-80">
                        <h3 className="text-2xl font-semibold mb-4">Task Management</h3>
                        <p className="text-gray-600">Organize and prioritize your tasks with ease.</p>
                    </div>
                    <div className="bg-gray-100 p-8 rounded-lg shadow-md w-80">
                        <h3 className="text-2xl font-semibold mb-4">Meeting Scheduling</h3>
                        <p className="text-gray-600">Schedule and manage your meetings effortlessly.</p>
                    </div>
                    <div className="bg-gray-100 p-8 rounded-lg shadow-md w-80">
                        <h3 className="text-2xl font-semibold mb-4">Team Collaboration</h3>
                        <p className="text-gray-600">Collaborate with your team and stay on the same page.</p>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="relative text-center bg-white bg-opacity-80 p-12 rounded-lg shadow-lg max-w-2xl mx-auto mb-16">
                <h2 className="text-4xl font-semibold text-gray-800 mb-6">How It Works</h2>
                <div className="flex flex-col items-center gap-8">
                    <div className="bg-gray-100 p-8 rounded-lg shadow-md w-80">
                        <h3 className="text-2xl font-semibold mb-4">Step 1: Sign Up</h3>
                        <p className="text-gray-600">Create your account and set up your profile.</p>
                    </div>
                    <div className="bg-gray-100 p-8 rounded-lg shadow-md w-80">
                        <h3 className="text-2xl font-semibold mb-4">Step 2: Add Tasks</h3>
                        <p className="text-gray-600">Add your tasks and organize them as needed.</p>
                    </div>
                    <div className="bg-gray-100 p-8 rounded-lg shadow-md w-80">
                        <h3 className="text-2xl font-semibold mb-4">Step 3: Collaborate</h3>
                        <p className="text-gray-600">Share your tasks and collaborate with your team.</p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="relative bg-gray-200 p-12 rounded-lg shadow-lg max-w-2xl mx-auto mb-16">
                <h2 className="text-4xl font-semibold text-center mb-6 text-gray-800">What Our Users Say</h2>
                <div className="flex flex-col items-center">
                    <blockquote className="bg-white p-8 rounded-lg shadow-md mb-4 w-80">
                        <p className="text-gray-700">"MyWebsite has revolutionized the way I manage my tasks. Highly recommended!"</p>
                        <footer className="mt-4 text-right text-gray-600">— Alex R.</footer>
                    </blockquote>
                    <blockquote className="bg-white p-8 rounded-lg shadow-md mb-4 w-80">
                        <p className="text-gray-700">"An intuitive platform that makes team collaboration seamless."</p>
                        <footer className="mt-4 text-right text-gray-600">— Jamie T.</footer>
                    </blockquote>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="relative text-center bg-white bg-opacity-80 p-12 rounded-lg shadow-lg max-w-2xl mx-auto mb-16">
                <h2 className="text-4xl font-semibold text-gray-800 mb-6">Frequently Asked Questions</h2>
                <div className="text-left">
                    <h3 className="text-2xl font-semibold mb-4">How do I get started?</h3>
                    <p className="text-gray-600 mb-4">Simply sign up and follow the onboarding steps to set up your account and start using the platform.</p>
                    <h3 className="text-2xl font-semibold mb-4">Can I try it for free?</h3>
                    <p className="text-gray-600">Yes, we offer a free trial so you can explore all the features before committing.</p>
                </div>
            </section>
        </>
    );
}

export default UserHome;
