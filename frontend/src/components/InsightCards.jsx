import Card from './ui/Card';
import { Lightbulb, Zap, TrendingUp, BookOpen } from 'lucide-react';

const insightIcons = [Lightbulb, Zap, TrendingUp, BookOpen];

export default function InsightCards({ insights }) {
  if (!insights || insights.length === 0) return null;

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Developer Insights
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, idx) => {
          const Icon = insightIcons[idx % insightIcons.length];
          return (
            <Card key={idx} className="p-4 flex items-start gap-3">
              <div className="shrink-0 mt-1">
                <Icon size={20} className="text-indigo-500 dark:text-indigo-400" />
              </div>
              <p className="text-gray-700 dark:text-gray-200">{insight}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}