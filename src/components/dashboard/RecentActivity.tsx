import React from 'react'

export default function RecentActivity({ items }: { items: any[] }) {
  if (!items || items.length === 0) {
    return <div className="bg-white rounded-lg shadow-sm border p-6"><h3 className="text-lg font-semibold">Recent Activity</h3><p className="text-gray-500 text-sm">No recent activity</p></div>
  }
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-austin-charcoal mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {items.map((activity: any, index: number) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className={`w-2 h-2 rounded-full mt-2 ${
              activity.status === 'ACCEPTED' ? 'bg-green-500' :
              activity.status === 'REJECTED' ? 'bg-red-500' :
              'bg-yellow-500'
            }`}></div>
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-medium">Application {activity.status?.toLowerCase()}</span>
                {activity.bandName ? <span> <strong>{activity.bandName}</strong></span> : null} for slot "{activity.eventTitle}"
              </p>
              <p className="text-xs text-gray-500 mt-1">{activity.createdAt ? new Date(activity.createdAt).toLocaleDateString() : ''}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
