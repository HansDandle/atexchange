'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function WatchDemoButton() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <Button 
        variant="outline" 
        size="lg" 
        className="w-full sm:w-auto text-lg px-8 py-6 border-white text-black hover:bg-white hover:text-austin-charcoal"
        onClick={() => setShowPopup(true)}
      >
        Watch Demo
      </Button>

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full animate-in fade-in zoom-in">
            <h2 className="text-2xl font-bold text-austin-charcoal mb-4">Coming Soon</h2>
            <p className="text-gray-600 mb-6">
              We're working on an exciting demo video that showcases all the features of Austin Talent Exchange. Stay tuned!
            </p>
            <Button 
              onClick={() => setShowPopup(false)}
              className="w-full bg-austin-orange hover:bg-austin-warm text-white"
            >
              Got it
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
