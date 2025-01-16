import { ReactNode } from "react";

const Heading2 = ({children, classNames} : {children:ReactNode, classNames?:string}) => {
    return (
        <h1 className={`text-primary-15 text-[36px] md:text-[40px] lg:text-[48px] font-semibold leading-7 md:leading-[56px] font-Inter ${classNames}`}>{children}</h1>
    );
};

export default Heading2;