import { AlgorandProvider } from "../algorand-provider";
import { RecoilProvider } from "../recoil-provider";

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilProvider>
      <AlgorandProvider>{children}</AlgorandProvider>
    </RecoilProvider>
  );
};
