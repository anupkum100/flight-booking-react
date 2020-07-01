/*!
 * This component is used show the layover time between 2 flights
 * Component used from Material UI
 */

import React from 'react';
import { Chip } from '@material-ui/core';
import {calculateLayoverTime } from '../service/Utility';
 
export default function LayoverTime(props: any) {
    return <Chip variant="outlined" size="small" label={`Layover Time ${calculateLayoverTime(props)}`} />
}
