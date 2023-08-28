"use client";

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState } from 'react';
import { ButtonTheme } from './ButtonTheme';
import SigninButton from './SigninButton';
import { Separator } from '../ui/separator';

export default function MenuNavigation() {
    const [value, setValue] = useState(0);

    return (
        <>
            <div className='grid grid-cols-3 justify-between items-center mb-10'>
                <div>
                    LOGO
                </div>
                <div className='flex items-center justify-center'>
                    MENU CENTRAL
                </div>
                <div className='flex gap-6  justify-end'>
                    <SigninButton />
                    <ButtonTheme />
                </div>
            </div>
            <div>
                <Separator/>
            </div>
        </>
    )
}