import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card from './ui/Card';

const COLORS = ['#6366f1', '#8b5cf6', '#d946ef', '#ec4899', '#f43f5e', '#f97316'];

export default function LanguageChart({ languages }) {
  if (!languages || languages.length === 0) {
    return (
      <Card className="p-6 text-center text-gray-500">
        No language data available.
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Top Languages
      </h4>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={languages}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="percentage"
              nameKey="language"
            >
              {languages.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: 'rgba(255,255,255,0.9)',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}