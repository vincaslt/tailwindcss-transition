"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transition = void 0;
const react_1 = __importStar(require("react"));
const react_transition_group_1 = require("react-transition-group");
const TransitionContext = react_1.default.createContext({
    parent: {},
});
function useIsInitialRender() {
    const isInitialRender = react_1.useRef(true);
    react_1.useEffect(() => {
        isInitialRender.current = false;
    }, []);
    return isInitialRender.current;
}
function CSSTransition({ show, nodeRef, enter = '', enterFrom = '', enterTo = '', leave = '', leaveFrom = '', leaveTo = '', appear, children, isChild, }) {
    const enterClasses = enter.split(' ').filter((s) => s.length);
    const enterFromClasses = enterFrom.split(' ').filter((s) => s.length);
    const enterToClasses = enterTo.split(' ').filter((s) => s.length);
    const leaveClasses = leave.split(' ').filter((s) => s.length);
    const leaveFromClasses = leaveFrom.split(' ').filter((s) => s.length);
    const leaveToClasses = leaveTo.split(' ').filter((s) => s.length);
    function addClasses(classes) {
        if (nodeRef.current)
            nodeRef.current.classList.add(...classes);
    }
    function removeClasses(classes) {
        if (nodeRef.current)
            nodeRef.current.classList.remove(...classes);
    }
    return (react_1.default.createElement(react_transition_group_1.CSSTransition, { appear: appear, unmountOnExit: true, in: show, nodeRef: nodeRef, addEndListener: (done) => {
            var _a;
            (_a = nodeRef.current) === null || _a === void 0 ? void 0 : _a.addEventListener('transitionend', (e) => {
                if (!isChild || e.target === nodeRef.current) {
                    done();
                }
                else if (isChild) {
                    e.stopPropagation();
                }
            }, false);
        }, onEnter: () => {
            addClasses([...enterClasses, ...enterFromClasses]);
        }, onEntering: () => {
            removeClasses(enterFromClasses);
            addClasses(enterToClasses);
        }, onEntered: () => {
            removeClasses([...enterToClasses, ...enterClasses]);
        }, onExit: () => {
            addClasses([...leaveClasses, ...leaveFromClasses]);
        }, onExiting: () => {
            removeClasses(leaveFromClasses);
            addClasses(leaveToClasses);
        }, onExited: () => {
            removeClasses([...leaveToClasses, ...leaveClasses]);
        } }, children));
}
function Transition(_a) {
    var { show, appear } = _a, rest = __rest(_a, ["show", "appear"]);
    const { parent } = react_1.useContext(TransitionContext);
    const isInitialRender = useIsInitialRender();
    const isChild = show === undefined;
    if (isChild) {
        return (react_1.default.createElement(CSSTransition, Object.assign({ appear: parent.appear || !parent.isInitialRender, show: parent.show, isChild: true }, rest)));
    }
    return (react_1.default.createElement(TransitionContext.Provider, { value: {
            parent: {
                show,
                isInitialRender,
                appear,
            },
        } },
        react_1.default.createElement(CSSTransition, Object.assign({ appear: appear, show: show }, rest))));
}
exports.Transition = Transition;
exports.default = Transition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUF3RTtBQUN4RSxtRUFBNkU7QUEyQjdFLE1BQU0saUJBQWlCLEdBQUcsZUFBSyxDQUFDLGFBQWEsQ0FBcUI7SUFDaEUsTUFBTSxFQUFFLEVBQUU7Q0FDWCxDQUFDLENBQUM7QUFFSCxTQUFTLGtCQUFrQjtJQUN6QixNQUFNLGVBQWUsR0FBRyxjQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsaUJBQVMsQ0FBQyxHQUFHLEVBQUU7UUFDYixlQUFlLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUNsQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDUCxPQUFPLGVBQWUsQ0FBQyxPQUFPLENBQUM7QUFDakMsQ0FBQztBQUVELFNBQVMsYUFBYSxDQUFDLEVBQ3JCLElBQUksRUFDSixPQUFPLEVBQ1AsS0FBSyxHQUFHLEVBQUUsRUFDVixTQUFTLEdBQUcsRUFBRSxFQUNkLE9BQU8sR0FBRyxFQUFFLEVBQ1osS0FBSyxHQUFHLEVBQUUsRUFDVixTQUFTLEdBQUcsRUFBRSxFQUNkLE9BQU8sR0FBRyxFQUFFLEVBQ1osTUFBTSxFQUNOLFFBQVEsRUFDUixPQUFPLEdBQ1k7SUFDbkIsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5RCxNQUFNLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEUsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFD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