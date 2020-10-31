import React, { ReactNode } from 'react';
interface TransitionProps {
    nodeRef: React.RefObject<HTMLDivElement>;
    show?: boolean;
    enter?: string;
    enterFrom?: string;
    enterTo?: string;
    leave?: string;
    leaveFrom?: string;
    leaveTo?: string;
    appear?: string | boolean;
    children: ReactNode;
}
export declare function Transition({ show, appear, ...rest }: TransitionProps): JSX.Element;
export default Transition;
