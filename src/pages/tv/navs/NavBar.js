import React from 'react';
import { HeaderNavBar } from '../../../components/menus/HeaderNav';
import Branding from './Branding';
import MenuItem from '../../../components/menus/MenuItem';
import ToggleMenuItem from '../../../components/menus/ToggleMenuItem';
import { HomeIcon, PowerIcon, MuteIcon } from '../../../components/icons/Icons';

import styles from './navBar.css';

const NavBar = (props) => (
  <HeaderNavBar>
    <div style={{ width: 0, overflow: 'visible' }}>
      <MenuItem className={styles.powerIcon} onClick={props.onPowerOn}>
        <div>
          <PowerIcon />
        </div>
        <div className={styles.iconText}>On</div>
      </MenuItem>
      <MenuItem className={styles.powerIcon} onClick={props.onPowerOff}>
        <div>
          <PowerIcon />
        </div>
        <div className={styles.iconText}>Off</div>
      </MenuItem>
      <ToggleMenuItem onToggle={props.onToggleMute}>
        <MuteIcon />
      </ToggleMenuItem>
    </div>

    <Branding />
    <HomeIcon onClick={props.onHomeClick} />
  </HeaderNavBar>
);

export default NavBar;
