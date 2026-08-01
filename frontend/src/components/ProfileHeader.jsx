import Card from './ui/Card';
import { MapPin, Link as LinkIcon, Calendar } from 'lucide-react';

export default function ProfileHeader({ user }) {
  const joinDate = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
      <img
        src={user.avatar_url}
        alt={`${user.login}'s avatar`}
        className="w-24 h-24 md:w-32 md:h-32 rounded-full ring-4 ring-white/30 dark:ring-black/20 shadow-xl"
      />
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          {user.name || user.login}
        </h3>
        {user.name && (
          <p className="text-gray-500 dark:text-gray-400">@{user.login}</p>
        )}
        {user.bio && (
          <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-prose">{user.bio}</p>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-4 justify-center md:justify-start text-sm text-gray-500 dark:text-gray-400">
          {user.location && (
            <span className="flex items-center gap-1">
              <MapPin size={14} /> {user.location}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar size={14} /> Joined {joinDate}
          </span>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <LinkIcon size={14} /> GitHub Profile
          </a>
        </div>
      </div>
    </Card>
  );
}