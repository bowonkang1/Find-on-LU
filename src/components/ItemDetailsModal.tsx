import React from 'react';
import { Button } from './ui/Button';

interface ItemDetailsModalProps {
  item: {
    id: number;
    title: string;
    description: string;
    price: number;
    condition: string;
    poster: string;
    category: string;
    date: string;
    image?: string;
  };
  onClose: () => void;
}

export function ItemDetailsModal({ item, onClose }: ItemDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="float-right text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        {item.image && (
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        )}

        {/* Title and Price */}
        <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
        <p className="text-3xl font-bold text-green-600 mb-4">${item.price}</p>

        {/* Full Description */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
          <p className="text-gray-600">{item.description}</p>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Condition</p>
            <p className="font-medium">{item.condition}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Category</p>
            <p className="font-medium">{item.category}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Posted</p>
            <p className="font-medium">{item.date}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Seller</p>
            <p className="font-medium">{item.poster}</p>
          </div>
        </div>

        {/* Contact Button */}
        <Button 
          className="w-full"
          onClick={() => {
            const subject = `Interested in: ${item.title}`;
            const body = `Hi ${item.poster},\n\nI'm interested in your item "${item.title}" listed for $${item.price}.\n\nIs this still available?\n\nThanks!`;
            const outlookUrl = `https://outlook.office365.com/mail/deeplink/compose?to=${item.poster}@lawrence.edu&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.open(outlookUrl, '_blank');
          }}
        >
          Contact Seller
        </Button>
      </div>
    </div>
  );
}