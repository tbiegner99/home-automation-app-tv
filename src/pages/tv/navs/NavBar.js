import React from 'react';
import { HeaderNav, MenuItem, ToggleMenuItem } from '@tbiegner99/home-automation-components';
import Branding from './Branding';
import { HomeIcon, PowerIcon, MuteIcon } from '../../../icons/Icons';

import styles from './navBar.css';

const NavBar = (props) => (
  <HeaderNav>
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
  </HeaderNav>
);

export default NavBar;
