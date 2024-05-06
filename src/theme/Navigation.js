import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import RestoreIcon from '@mui/icons-material/Restore'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'

export default function Navigation() {
  const [value, setValue] = useState(0)

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
      >
        <BottomNavigationAction
          component={Link}
          label='Home'
          to='/'
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          component={Link}
          label='Investors'
          to='/investors'
          icon={<AssignmentIndIcon />}
        />
      </BottomNavigation>
    </Box>
  )
}
