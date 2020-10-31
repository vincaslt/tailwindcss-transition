import React, { ReactNode, useContext, useEffect, useRef } from 'react';
import { CSSTransition as ReactCSSTransition } from 'react-transition-group';

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

interface CSSTransitionProps extends TransitionProps {
  isChild?: boolean;
}

interface ParentContextProps {
  parent: {
    show?: boolean;
    appear?: string | boolean;
    isInitialRender?: boolean;
  };
}

const TransitionContext = React.createContext<ParentContextProps>({
  parent: {},
});

function useIsInitialRender() {
  const isInitialRender = useRef(true);
  useEffect(() => {
    isInitialRender.current = false;
  }, []);
  return isInitialRender.current;
}

function CSSTransition({
  show,
  nodeRef,
  enter = '',
  enterFrom = '',
  enterTo = '',
  leave = '',
  leaveFrom = '',
  leaveTo = '',
  appear,
  children,
  isChild,
}: CSSTransitionProps) {
  const enterClasses = enter.split(' ').filter((s) => s.length);
  const enterFromClasses = enterFrom.split(' ').filter((s) => s.length);
  const enterToClasses = enterTo.split(' ').filter((s) => s.length);
  const leaveClasses = leave.split(' ').filter((s) => s.length);
  const leaveFromClasses = leaveFrom.split(' ').filter((s) => s.length);
  const leaveToClasses = leaveTo.split(' ').filter((s) => s.length);

  function addClasses(classes: string[]) {
    if (nodeRef.current) nodeRef.current.classList.add(...classes);
  }

  function removeClasses(classes: string[]) {
    if (nodeRef.current) nodeRef.current.classList.remove(...classes);
  }

  return (
    <ReactCSSTransition
      appear={appear}
      unmountOnExit
      in={show}
      nodeRef={nodeRef}
      addEndListener={(done) => {
        nodeRef.current?.addEventListener(
          'transitionend',
          (e) => {
            if (!isChild || e.target === nodeRef.current) {
              done();
            } else if (isChild) {
              e.stopPropagation();
            }
          },
          false
        );
      }}
      onEnter={() => {
        addClasses([...enterClasses, ...enterFromClasses]);
      }}
      onEntering={() => {
        removeClasses(enterFromClasses);
        addClasses(enterToClasses);
      }}
      onEntered={() => {
        removeClasses([...enterToClasses, ...enterClasses]);
      }}
      onExit={() => {
        addClasses([...leaveClasses, ...leaveFromClasses]);
      }}
      onExiting={() => {
        removeClasses(leaveFromClasses);
        addClasses(leaveToClasses);
      }}
      onExited={() => {
        removeClasses([...leaveToClasses, ...leaveClasses]);
      }}
    >
      {children}
    </ReactCSSTransition>
  );
}

export function Transition({ show, appear, ...rest }: TransitionProps) {
  const { parent } = useContext(TransitionContext);
  const isInitialRender = useIsInitialRender();
  const isChild = show === undefined;

  if (isChild) {
    return (
      <CSSTransition
        appear={parent.appear || !parent.isInitialRender}
        show={parent.show}
        isChild
        {...rest}
      />
    );
  }

  return (
    <TransitionContext.Provider
      value={{
        parent: {
          show,
          isInitialRender,
          appear,
        },
      }}
    >
      <CSSTransition appear={appear} show={show} {...rest} />
    </TransitionContext.Provider>
  );
}

export default Transition;
