import { RecoilRoot } from "@/libs/recoil/recoil-root";

export const RecoilProvider = ({ children }: { children: React.ReactNode }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
