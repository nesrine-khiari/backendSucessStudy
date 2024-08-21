import React from "react";
import { CSSTransition } from "react-transition-group";

function CSSTransitionComponent({ mobileMenuActive }) {
    return (
        <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
            <div className="layout-mask p-component-overlay"></div>
        </CSSTransition>
    );
}

export default CSSTransitionComponent;
