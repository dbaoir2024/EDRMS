import { useForm } from 'react-hook-form';
// Use this import:
import { useAuth } from '../../../contexts/AuthContext';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  department: string;
}

const ProfileSettings = () => {
  const { user, updateProfile } = useAuth();
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isDirty },
    reset
  } = useForm<ProfileFormData>({
    defaultValues: {
      firstName: user?.name?.split(' ')[0] || '',
      lastName: user?.name?.split(' ')[1] || '',
      email: user?.email || '',
      title: '',
      department: ''
    }
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        department: data.department
      });
      reset(data); // Reset form with new values
      // Show success toast
    } catch (error) {
      // Show error toast
      console.error('Profile update failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Settings</h2>
      
      {/* Form fields from your original code */}
      {/* ... */}

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => reset()}
            disabled={!isDirty}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isDirty}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save changes
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileSettings;