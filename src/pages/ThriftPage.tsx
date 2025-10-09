import React, { useState } from "react";
import { Button } from "../components/ui/Button";
import { PostItemModal } from "../components/PostItemModal";
import { ItemDetailsModal } from "../components/ItemDetailsModal";

interface ThriftItem {
  id: number;
  title: string;
  description: string;
  price: number;
  condition: string;
  poster: string;
  category: string;
  date: string;
  image?: string; //optional property. Item can exist without an image
}

export function ThriftPage() {
  const [searchTerm, setSearchTerm] = useState("");
  //which category filter is currently selected
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ThriftItem | null>(null); // keeps track of WHICH item the user clicked on.

  const [items, setItems] = useState<ThriftItem[]>([
    // array of thrift items~change
    {
      id: 1,
      title: "Calculus Textbook",
      description: "Stewart Calculus 8th Edition, barely used",
      price: 45,
      condition: "Like New",
      poster: "Mike Johnson",
      category: "Textbooks",
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Gaming Chair",
      description: "Comfortable gaming chair, minor wear",
      price: 120,
      condition: "Good",
      poster: "Sarah Wilson",
      category: "Furniture",
      date: "2024-01-14",
    },
  ]);

  //.map() goes through and extracts just the color from each
  // get all category names from items
  // new set-> remove duplicates
  // convert to array
  // add 'all' at the beginning
  // List of unique categories for filter buttons

  const handleItemPosted = (newItem: any) => {
    //handle the event when an item is posted
    //newItem-> formdata from  Modal
    //accepts any type of data
    console.log("Received new thrift item:", newItem);

    let imageUrl: string | undefined = undefined;
    if (newItem.image) {
      //if user upload image
      imageUrl = URL.createObjectURL(newItem.image); //convert file to URL
    } //if no image, imageURL stays undefined
    //runs when a user successfully posts a new item from the modal

    //create proper item object-> displaying newly posted item on the page after user posts it
    const item = {
      id: Date.now(), //returns current time as a number
      title: newItem.title,
      description: newItem.description,
      price: parseFloat(newItem.price) || 0, //CHANGED: String → Number
      condition: newItem.condition,
      poster: newItem.posterName, //CHANGED: posterName → poster
      category: newItem.category || "Other",
      date: new Date().toISOString().split("T")[0],
      image: imageUrl, // CHANGED: File → URL
    };
    console.log("Adding thrift item to list:", item);
    setItems([item, ...items]);
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch; // Only search, no category filter
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Thrift Store</h1>
          <p className="text-gray-600 mt-2">
            Buy and sell items with fellow students
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Sell Item</Button>
      </div>

      {/* Search Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <svg
              className="absolute left-3 top-3 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search items for sale..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lu-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-2xl transition-shadow"
            onClick={() => setSelectedItem(item)}
          >
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
                const outlookUrl = `https://outlook.office365.com/mail/deeplink/compose?to=${
                  item.poster
                }@lawrence.edu&subject=${encodeURIComponent(
                  subject
                )}&body=${encodeURIComponent(body)}`;
                window.open(outlookUrl, "_blank");
              }}
            >
              Contact Seller
            </Button>
          </div>
        ))}
      </div>

      
      {filteredItems.length === 0 && ( // empty state
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No items found
          </h3>
          <p className="text-gray-500">
            {searchTerm
              ? `No results for "${searchTerm}". Try a different search.`
              : "Be the first to post an item!"}
          </p>
        </div>
      )}

      <PostItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="thrift"
        onItemPosted={handleItemPosted}
      />

      {selectedItem && (
        <ItemDetailsModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
