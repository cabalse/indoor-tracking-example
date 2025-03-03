import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PageLayout = ({ children }: Props) => (
  <div className="h-full w-full bg-gray-900">
    <div className="flex flex-col justify-center items-center h-screen">
      {children}
    </div>
  </div>
);

export default PageLayout;
