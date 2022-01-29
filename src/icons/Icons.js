import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

export const createIcon = (icon) => (props) => (
  <i {...props}>
    <FontAwesomeIcon icon={icon} />
  </i>
);

export const PowerIcon = createIcon(faPowerOff);
export const MuteIcon = createIcon(faVolumeMute);
export { HomeIcon } from '@tbiegner99/home-automation-components';
