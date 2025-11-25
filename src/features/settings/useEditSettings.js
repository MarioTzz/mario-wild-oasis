import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting } from '../../services/apiSettings';
import toast from 'react-hot-toast';
function useEditSettings() {
  const queryClient = useQueryClient();
  const {
    mutate: editSettings,
    isLoading: isEditing,
    error,
  } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success('Settings have been updated');
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    onError: err => {
      toast.error(err.message || 'Settings update failed');
      throw new Error('Settings update failed');
    },
  });
  return { editSettings, isEditing, error };
}

export default useEditSettings;
