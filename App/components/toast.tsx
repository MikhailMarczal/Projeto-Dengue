import Toast, { ToastOptions } from 'react-native-root-toast';

export default function ShowToast({ text, options }: { text: string; options?: ToastOptions }) {
  return Toast.show(text, {
    duration: Toast.durations.LONG,
    opacity: 1,
    ...options,
  });
}
