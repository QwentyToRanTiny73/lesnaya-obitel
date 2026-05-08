"use client";

import { useState } from "react";

interface Activity {
  id: string;
  title: string;
  description: string;
  price: string;
  duration?: string;
  type: "own" | "partner";
  partner?: string | null;
  icon: string;
}

interface ActivityCardProps {
  activity: Activity;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  const [added, setAdded] = useState(false);

  return (
    <div className="bg-forest-dark border border-forest/30 p-6 hover:border-gold/30 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="text-2xl">{activity.icon}</div>
        <span
          className={`text-xs font-inter tracking-widest uppercase px-2 py-1 border ${
            activity.type === "own"
              ? "border-gold/40 text-gold/70"
              : "border-forest text-sand/50"
          }`}
        >
          {activity.type === "own" ? "Наше" : "Партнёр"}
        </span>
      </div>

      <h3 className="font-georgia text-cream text-lg mb-2 group-hover:text-gold transition-colors">
        {activity.title}
      </h3>

      {activity.partner && (
        <p className="font-inter text-xs text-sand/65 mb-2">{activity.partner}</p>
      )}

      <p className="font-inter text-sand/60 text-sm leading-relaxed mb-6">
        {activity.description}
      </p>

      <div className="flex items-center justify-between">
        <div>
          <p className="font-georgia text-gold text-lg">{activity.price}</p>
          {activity.duration && (
            <p className="font-inter text-xs text-sand/65">{activity.duration}</p>
          )}
        </div>
        <button
          onClick={() => setAdded(!added)}
          className={`text-xs font-inter tracking-widest uppercase px-4 py-2 border transition-all duration-200 ${
            added
              ? "border-gold bg-gold text-forest-dark"
              : "border-forest/60 text-sand/60 hover:border-gold hover:text-gold"
          }`}
        >
          {added ? "✓ Добавлено" : "Добавить"}
        </button>
      </div>
    </div>
  );
}
