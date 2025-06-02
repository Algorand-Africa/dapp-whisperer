import { AlgorandRoot } from "@/libs/algorand/algorand-root";

export const AlgorandProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <AlgorandRoot>{children}</AlgorandRoot>;
};
