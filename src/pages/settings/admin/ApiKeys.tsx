import { useAuth } from '../../contexts/AuthContext';

const ApiKeys = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">API Keys Management</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <p>Manage your API keys here.</p>
        {/* Add your API key management UI here */}
      </div>
    </div>
  );
};

export default ApiKeys;