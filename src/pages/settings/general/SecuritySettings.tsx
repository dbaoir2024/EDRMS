import { useForm } from 'react-hook-form';
// Use this import:
import { useAuth } from '../../../contexts/AuthContext';

interface SecurityFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const SecuritySettings = () => {
  const { changePassword } = useAuth();
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    watch,
    reset
  } = useForm<SecurityFormData>();

  const onSubmit = async (data: SecurityFormData) => {
    try {
      await changePassword(data.currentPassword, data.newPassword);
      reset();
      // Show success toast here
    } catch (error) {
      // Show error toast here
      console.error('Password change failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h2>
      
      <div>
        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
          Current Password
        </label>
        <input
          type="password"
          id="currentPassword"
          {...register('currentPassword', { required: 'Current password is required' })}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.currentPassword ? 'border-red-500' : 'border'
          }`}
        />
        {errors.currentPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.currentPassword.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          {...register('newPassword', { 
            required: 'New password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters'
            }
          })}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.newPassword ? 'border-red-500' : 'border'
          }`}
        />
        {errors.newPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          {...register('confirmPassword', {
            validate: (value) =>
              value === watch('newPassword') || 'Passwords do not match'
          })}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.confirmPassword ? 'border-red-500' : 'border'
          }`}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Update Password
        </button>
      </div>
    </form>
  );
};

export default SecuritySettings;