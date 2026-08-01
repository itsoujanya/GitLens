import Card from './ui/Card';
import { Star, GitFork, Eye, BookOpen } from 'lucide-react';

export default function RepoList({ repos }) {
  if (!repos || repos.length === 0) {
    return (
      <Card className="p-6 text-center text-gray-500">
        No repositories found.
      </Card>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Repositories ({repos.length})
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo) => (
          <Card key={repo.name} className="p-4 hover:shadow-lg transition-shadow">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {repo.name}
            </a>
            {repo.description && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {repo.description}
              </p>
            )}
            <div className="mt-3 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              {repo.language && (
                <span className="flex items-center gap-1">
                  <BookOpen size={14} /> {repo.language}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Star size={14} /> {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1">
                <GitFork size={14} /> {repo.forks_count}
              </span>
              <span className="flex items-center gap-1">
                <Eye size={14} /> {repo.watchers_count}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}