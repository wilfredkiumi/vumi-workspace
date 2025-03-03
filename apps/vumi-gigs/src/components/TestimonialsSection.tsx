import React from 'react';
import { Card } from 'ui';

interface TestimonialsSectionProps {
  theme: string;
  colorMode: 'light' | 'dark';
}

export function TestimonialsSection({ theme, colorMode }: TestimonialsSectionProps) {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          What Our Users Say
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card theme={theme} colorMode={colorMode} className="p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Sarah Johnson" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white">Sarah Johnson</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">3D Artist</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              "VumiGigs has transformed my freelance career. I've found consistent work and built relationships with amazing clients from around the world."
            </p>
          </Card>
          
          <Card theme={theme} colorMode={colorMode} className="p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Michael Chen" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white">Michael Chen</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Game Developer</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              "As a developer, finding quality projects used to be challenging. With VumiGigs, I can focus on coding while the platform handles client acquisition."
            </p>
          </Card>
          
          <Card theme={theme} colorMode={colorMode} className="p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Emily Rodriguez" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white">Emily Rodriguez</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Studio Director</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              "Our studio needed specialized talent for various projects. VumiGigs helped us find the right freelancers quickly and efficiently."
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}