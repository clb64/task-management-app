import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
          Manage Your Tasks
          <span className="text-blue-600"> Effortlessly</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
          TaskFlow helps teams organize, track, and collaborate on projects with 
          powerful task management features and seamless team integration.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {user ? (
            <Link to="/dashboard">
              <Button size="lg">Go to Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link to="/register">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="lg">
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="mt-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="bg-blue-100 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Project Organization
              </h3>
              <p className="text-gray-600">
                Create projects and organize your tasks efficiently with our 
                intuitive project management system.
              </p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Team Collaboration
              </h3>
              <p className="text-gray-600">
                Work together seamlessly with your team members, assign tasks, 
                and track progress in real-time.
              </p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Priority Management
              </h3>
              <p className="text-gray-600">
                Set priorities and due dates to keep your projects on track and 
                never miss important deadlines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}