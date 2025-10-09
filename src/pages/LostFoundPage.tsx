import React, { useState } from "react";
import { Button } from "../components/ui/Button";
import { PostItemModal } from "../components/PostItemModal";
import { ItemDetailsModal } from "../components/ItemDetailsModal";

interface LostFoundItem {
  id: number;
  type: "lost" | "found";
  title: string;
  description: string;
  location: string;
  date: string;
  poster: string;
  image?: string;
}

export function LostFoundPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "lost" | "found">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<LostFoundItem | null>(null);
  const [items, setItems] = useState<LostFoundItem[]>([
    {
      id: 1,
      type: "lost",
      title: "iPhone 13 Pro",
      description: "Black iPhone 13 Pro, lost in the library",
      location: "Library 2nd floor",
      date: "2024-01-15",
      poster: "John Doe",
    },
    {
      id: 2,
      type: "found",
      title: "Blue Water Bottle",
      description: "Found blue Hydro Flask near the gym",
      location: "Gym entrance",
      date: "2024-01-14",
      poster: "Jane Smith",
    },
  ]);

  const handleItemPosted = (newItem: any) => {
    console.log("Received new item:", newItem);

    // Convert image file to URL for display
    let imageUrl: string | undefined = undefined;
    if (newItem.image) {
      imageUrl = URL.createObjectURL(newItem.image);
    }

    const item = {
      id: Date.now(), // Simple ID generation
      type: newItem.itemType,
      title: newItem.title,
      description: newItem.description,
      location: newItem.location,
      date: new Date().toISOString().split("T")[0], // Today's date
      poster: newItem.posterName,
      image: imageUrl,
    };
    console.log("Adding item to list:", item);
    setItems([item, ...items]); // Add new item to the beginning
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lost & Found</h1>
          <p className="text-gray-600 mt-2">
            Help find lost items or report found items
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Post Item</Button>
      </div>

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
              placeholder="Search lost or found items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lu-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterType === "all" ? "primary" : "outline"}
              onClick={() => setFilterType("all")}
              size="sm"
            >
              All Items
            </Button>
            <Button
              variant={filterType === "lost" ? "primary" : "outline"}
              onClick={() => setFilterType("lost")}
              size="sm"
            >
              Lost
            </Button>
            <Button
              variant={filterType === "found" ? "primary" : "outline"}
              onClick={() => setFilterType("found")}
              size="sm"
            >
              Found
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-2xl transition-shadow"
            onClick={() => {
              console.log("Card clicked!", item);
              setSelectedItem(item);
            }}
          >
            <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <svg
                    className="mx-auto h-12 w-12 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm">No photo</p>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mb-3">
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  item.type === "lost"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {item.type.toUpperCase()}
              </span>
              <span className="text-sm text-gray-500">{item.date}</span>
            </div>

            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{item.description}</p>

            <div className="text-sm text-gray-500 mb-4">
              <div>Location: {item.location}</div>
              <div>Posted by: {item.poster}</div>
            </div>

            <Button
              size="sm"
              className="w-full"
              onClick={() => {
                const subject = `Found your ${item.type} item: ${item.title}`;
                const body = `Hi ${item.poster},\n\nI saw your ${item.type} item posting for "${item.title}" on Find On LU.\n\n${item.description}\n\nLocation: ${item.location}\n\nPlease let me know if this is still available.\n\nThanks!`;
                const outlookUrl = `https://outlook.office365.com/mail/deeplink/compose?to=${
                  item.poster
                }@lawrence.edu&subject=${encodeURIComponent(
                  subject
                )}&body=${encodeURIComponent(body)}`;
                window.open(outlookUrl, "_blank");
              }}
            >
              Contact
            </Button>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
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
        type="lost-found"
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
