import Card from './ui/Card';
import useCountUp from '../hooks/useCountUp';
import { Users, BookOpen, Star, FileCode } from 'lucide-react';

const statIcons = {
  followers: Users,
  following: Users,
  public_repos: BookOpen,
  public_gists: FileCode,
  total_stars: Star,
};

const AnimatedValue = ({ value }) => {
  const animated = useCountUp(value, 1500);
  return <>{animated.toLocaleString()}</>;
};

export default function StatsCards({ user, totalStars }) {
  const stats = [
    { label: 'Followers', value: user.followers, key: 'followers' },
    { label: 'Following', value: user.following, key: 'following' },
    { label: 'Repositories', value: user.public_repos, key: 'public_repos' },
    { label: 'Gists', value: user.public_gists, key: 'public_gists' },
    { label: 'Stars Earned', value: totalStars, key: 'total_stars' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat) => {
        const Icon = statIcons[stat.key] || BookOpen;

        return (
          <Card
            key={stat.label}
            className="p-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform"
          >
            <Icon size={24} className="text-indigo-500 dark:text-indigo-400" />

            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              <AnimatedValue value={stat.value} />
            </span>

            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {stat.label}
            </span>
          </Card>
        );
      })}
    </div>
  );
}