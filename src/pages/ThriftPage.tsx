import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { PostItemModal } from '../components/PostItemModal';

interface ThriftItem {
  id: number;
  title: string;
  description: string;
  price: number;
  condition: string;
  poster: string;
  category: string;
  date: string;
  image?: string;
}

export function ThriftPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [items, setItems] = useState<ThriftItem[]>([
    {
      id: 1,
      title: 'Calculus Textbook',
      description: 'Stewart Calculus 8th Edition, barely used',
      price: 45,
      condition: 'Like New',
      poster: 'Mike Johnson',
      category: 'Textbooks',
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Gaming Chair',
      description: 'Comfortable gaming chair, minor wear',
      price: 120,
      condition: 'Good',
      poster: 'Sarah Wilson',
      category: 'Furniture',
      date: '2024-01-14'
    }
  ]);

  const categories = ['all', ...Array.from(new Set(items.map(item => item.category)))];

  const handleItemPosted = (newItem: any) => {
    console.log('Received new thrift item:', newItem);

    let imageUrl: string | undefined = undefined;
    if (newItem.image) {
      imageUrl = URL.createObjectURL(newItem.image);
    }

    const item = {
      id: Date.now(),
      title: newItem.title,
      description: newItem.description,
      price: parseFloat(newItem.price) || 0,
      condition: newItem.condition,
      poster: newItem.posterName,
      category: newItem.category || 'Other',
      date: new Date().toISOString().split('T')[0],
      image: imageUrl
    };
    console.log('Adding thrift item to list:', item);
    setItems([item, ...items]);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Thrift Store</h1>
          <p className="text-gray-600 mt-2">Buy and sell items with fellow students</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Sell Item</Button>
      </div>

      {/* Search Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-3 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search items for sale..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lu-blue-500"
            />
          </div>
          <div className="flex gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={filterCategory === category ? 'primary' : 'outline'}
                onClick={() => setFilterCategory(category)}
                size="sm"
              >
                {category === 'all' ? 'All Items' : category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-xl shadow-lg">
            {item.image && (
            <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
             />
          )}
            <div className="flex items-center justify-between mb-3">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                {item.category}
              </span>
              <span className="text-lg font-bold text-green-600">
                ${item.price}
              </span>
            </div>

            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{item.description}</p>

            <div className="text-sm text-gray-500 mb-4">
              <div>Condition: {item.condition}</div>
              <div>Seller: {item.poster}</div>
            </div>

            <Button 
  size="sm" 
  className="w-full"
  onClick={() => {
    const subject = `Interested in: ${item.title}`;
    const body = `Hi ${item.poster},\n\nI'm interested in your item "${item.title}" listed for $${item.price} on Find On LU.\n\n${item.description}\n\nCondition: ${item.condition}\n\nIs this still available?\n\nThanks!`;
    const outlookUrl = `https://outlook.office365.com/mail/deeplink/compose?to=${item.poster}@lawrence.edu&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
window.open(outlookUrl, '_blank');
  }}
>
  Contact Seller
</Button>
          </div>
        ))}
      </div>

      <PostItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="thrift"
        onItemPosted={handleItemPosted}
      />
    </div>
  );
}