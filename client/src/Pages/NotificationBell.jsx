// src/components/NotificationBell.jsx
import React, { useState } from 'react';
import { Bell } from 'lucide-react';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Votre demande 7753/2023 a été acceptée.', read: false },
    { id: 2, message: 'Un nouveau document est requis pour la demande 1172/2024.', read: false },
    { id: 3, message: 'Votre simulation a bien été enregistrée.', read: true },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    // Marquer tout comme lu à l'ouverture
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="relative p-2 rounded-full hover:bg-gray-200"
      >
        <Bell className="h-6 w-6 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="p-2">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Notifications</h3>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {notifications.map((n) => (
                <li key={n.id} className={`text-sm p-2 rounded ${n.read ? 'text-gray-600' : 'bg-gray-100 text-black'}`}>
                  {n.message}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
