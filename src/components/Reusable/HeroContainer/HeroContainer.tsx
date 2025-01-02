import { ReactNode } from "react";

const HeroContainer = ({ children, classNames }: { children: ReactNode, classNames?:string }) => {
    return (
        <div className={`bg-primary-10 rounded-bl-[96px] ${classNames}`}>
            {children}
        </div>
    );
};

export default HeroContainer;