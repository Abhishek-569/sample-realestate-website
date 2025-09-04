import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Eye, MessageSquare, TrendingUp, Edit, Trash2, 
  DollarSign, Calendar, Users
} from 'lucide-react';
import { mockProperties } from '../data/mockData';

const SellerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'properties' | 'inquiries' | 'analytics'>('properties');
  const sellerProperties = mockProperties.filter(p => p.agent.id === '1');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Seller Dashboard</h1>
              <p className="text-gray-600">Manage your properties and track performance</p>
            </div>
            <Link
              to="/add-property"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2 mt-4 sm:mt-0"
            >
              <Plus className="h-4 w-4" />
              <span>Add Property</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">{sellerProperties.length}</p>
                <p className="text-gray-600">Active Listings</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">847</p>
                <p className="text-gray-600">Total Views</p>
              </div>
              <Eye className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">23</p>
                <p className="text-gray-600">Inquiries</p>
              </div>
              <MessageSquare className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">$2.1M</p>
                <p className="text-gray-600">Total Value</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('properties')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'properties'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              My Properties
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'inquiries'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Inquiries
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'analytics'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Analytics
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'properties' && (
              <div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sellerProperties.map((property) => (
                    <div key={property.id} className="relative">
                      <PropertyCard property={property} />
                      <div className="absolute top-2 right-2 flex space-x-2">
                        <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                          <Edit className="h-4 w-4 text-blue-600" />
                        </button>
                        <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'inquiries' && (
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">John Smith</h4>
                      <p className="text-sm text-gray-600">Luxury Downtown Apartment</p>
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                      New
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">
                    I'm very interested in this property. Could we schedule a viewing for this weekend?
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">2 hours ago</p>
                    <div className="flex space-x-2">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                        Reply
                      </button>
                      <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-1 rounded text-sm transition-colors">
                        Mark Read
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">Views This Month</h3>
                  <div className="flex items-end space-x-2">
                    {[40, 65, 35, 80, 55, 70, 85].map((height, index) => (
                      <div
                        key={index}
                        className="bg-white bg-opacity-30 rounded-t"
                        style={{ width: '20px', height: `${height}px` }}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">Inquiries This Month</h3>
                  <div className="flex items-end space-x-2">
                    {[20, 35, 25, 45, 30, 40, 50].map((height, index) => (
                      <div
                        key={index}
                        className="bg-white bg-opacity-30 rounded-t"
                        style={{ width: '20px', height: `${height}px` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;