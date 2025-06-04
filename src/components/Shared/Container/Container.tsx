import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
    return (
        <div className="max-w-[1300px] mx-auto px-5 md:p-10 xl:p-5 2xl:p-0">
            {children}
        </div>
    );
};

export default Container;