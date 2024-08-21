import React from "react";

import { AppMenu } from "../Templates/AppMenu";
import { menu } from "../routes/routes";

function AppBar(props) {
  const { layoutColorMode, onMenuItemClick } = props;
  return (
    <div>
      <AppMenu
        model={menu}
        onMenuItemClick={onMenuItemClick}
        layoutColorMode={layoutColorMode}
      />
    </div>
  );
}

export default AppBar;
