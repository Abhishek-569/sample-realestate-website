import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, MessageSquare, Settings, Bell, Search } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { mockProperties, mockUser } from '../data/mockData';

const BuyerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'saved' | 'viewed' | 'inquiries'>('saved');
  const [savedProperties, setSavedProperties] = useState<string[]>(mockUser.savedProperties);

  const savedPropertiesData = mockProperties.filter(property => 
    savedProperties.includes(property.id)
  );

  const handleSaveProperty = (propertyId: string) => {
    setSavedProperties(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <img
                src={mockUser.avatar}
                alt={mockUser.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Welcome, {mockUser.name}</h1>
                <p className="text-gray-600">Buyer Dashboard</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">{savedProperties.length}</p>
                <p className="text-gray-600">Saved Properties</p>
              </div>
              <Heart className="h-8 w-8 text-red-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">12</p>
                <p className="text-gray-600">Properties Viewed</p>
              </div>
              <Eye className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">{mockUser.inquiries.length}</p>
                <p className="text-gray-600">Active Inquiries</p>
              </div>
              <MessageSquare className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'saved'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Heart className="h-4 w-4 inline mr-2" />
              Saved Properties
            </button>
            <button
              onClick={() => setActiveTab('viewed')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'viewed'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Eye className="h-4 w-4 inline mr-2" />
              Recently Viewed
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'inquiries'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <MessageSquare className="h-4 w-4 inline mr-2" />
              My Inquiries
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'saved' && (
              <div>
                {savedPropertiesData.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {savedPropertiesData.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        onSave={handleSaveProperty}
                        isSaved={savedProperties.includes(property.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">No saved properties yet</h3>
                    <p className="text-gray-600 mb-6">Start browsing properties and save your favorites</p>
                    <Link
                      to="/properties"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 inline-flex items-center space-x-2"
                    >
                      <Search className="h-4 w-4" />
                      <span>Browse Properties</span>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'viewed' && (
              <div className="text-center py-12">
                <Eye className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Recently Viewed Properties</h3>
                <p className="text-gray-600">Your viewing history will appear here</p>
              </div>
            )}

            {activeTab === 'inquiries' && (
              <div className="space-y-4">
                {mockUser.inquiries.map((inquiry) => {
                  const property = mockProperties.find(p => p.id === inquiry.propertyId);
                  return (
                    <div key={inquiry.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-800">{property?.title}</h4>
                          <p className="text-sm text-gray-600">{property?.address}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          inquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          inquiry.status === 'responded' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {inquiry.status}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{inquiry.message}</p>
                      <p className="text-sm text-gray-500">
                        Sent on {new Date(inquiry.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;