import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { getMyThriftItems, getMyLostFoundItems, deleteThriftItem, deleteLostFoundItem } from '../lib/supabaseService';

interface ThriftItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category?: string;
  condition?: string;
  image_url?: string;
  user_email: string;
  created_at: string;
  status: string;
}

interface LostFoundItem {
  id: string;
  type: 'lost' | 'found';
  title: string;
  description: string;
  location: string;
  user_email: string;
  created_at: string;
  image_url?: string;
  date: string;
  status: string;
}

export function MyPostsPage() {
  const [thriftItems, setThriftItems] = useState<ThriftItem[]>([]);
  const [lostFoundItems, setLostFoundItems] = useState<LostFoundItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadMyPosts();
  }, []);

  async function loadMyPosts() {
    try {
      setLoading(true);
      const [thrift, lostFound] = await Promise.all([
        getMyThriftItems(),
        getMyLostFoundItems()
      ]);
      setThriftItems(thrift || []);
      setLostFoundItems(lostFound || []);
      setError('');
    } catch (err: any) {
      console.error('Error loading posts:', err);
      setError('Failed to load your posts');
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteThrift(id: string, title: string) {
    if (!window.confirm(`Delete "${title}"?`)) return;
    
    try {
      await deleteThriftItem(id);
      alert('Item deleted');
      loadMyPosts();
    } catch (err) {
      alert('Failed to delete item');
    }
  }

  async function handleDeleteLostFound(id: string, title: string) {
    if (!window.confirm(`Delete "${title}"?`)) return;
    
    try {
      await deleteLostFoundItem(id);
      alert('Item deleted');
      loadMyPosts();
    } catch (err) {
      alert('Failed to delete item');
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lu-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
          <Button onClick={loadMyPosts} className="mt-4">Try Again</Button>
        </div>
      </div>
    );
  }

  const totalPosts = thriftItems.length + lostFoundItems.length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Posts</h1>
        <p className="text-gray-600 mt-2">
          Manage your listings ({totalPosts} total)
        </p>
      </div>

      {/* Thrift Store Items */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Thrift Store ({thriftItems.length})
        </h2>
        
        {thriftItems.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-500">No thrift items posted yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {thriftItems.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <p className="text-sm">No photo</p>
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-2xl font-bold text-green-600 mb-2">${item.price}</p>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  {item.condition && <span>{item.condition}</span>}
                  {item.category && <span>{item.category}</span>}
                </div>

                <div className="text-xs text-gray-400 mb-4">
                  Posted {new Date(item.created_at).toLocaleDateString()}
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteThrift(item.id, item.title)}
                  className="w-full text-red-600 border-red-600 hover:bg-red-50"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lost & Found Items */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Lost & Found ({lostFoundItems.length})
        </h2>
        
        {lostFoundItems.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-500">No lost/found items posted yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lostFoundItems.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <p className="text-sm">No photo</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.type === 'lost' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {item.type.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>

                <div className="text-sm text-gray-500 mb-4">
                  Location: {item.location}
                </div>

                <div className="text-xs text-gray-400 mb-4">
                  Posted {new Date(item.created_at).toLocaleDateString()}
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteLostFound(item.id, item.title)}
                  className="w-full text-red-600 border-red-600 hover:bg-red-50"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}