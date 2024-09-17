import { useRouter } from "next/navigation";

const useNavigation = () => {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return { navigateTo };
};

export default useNavigation;
