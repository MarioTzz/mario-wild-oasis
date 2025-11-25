import { useMutation } from '@tanstack/react-query';
import { signup as signupAPI } from '../../services/apiAuth';
import toast from 'react-hot-toast';
function useSignup() {
  const {
    isLoading,
    mutate: signup,
    error,
  } = useMutation({
    mutationFn: signupAPI,
    onSuccess: user => {
      toast.success('Signup successful!');
    },
    onError: err => {
      toast.error(err.message || 'Signup failed');
    },
  });
  return { isLoading, signup, error };
}

export default useSignup;
