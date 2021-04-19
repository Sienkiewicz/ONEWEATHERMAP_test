import { Box, Icon, makeStyles, Typography } from '@material-ui/core'
import React, { FC, memo } from 'react'
import { HourlyType } from '../helpers/types'
import { degree } from '../helpers/utils'

const useStyles = makeStyles({
  overflow: {
    overflowY: 'auto',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      width: 0,
    },
  },
})

type Props = {
  hours: HourlyType[]
}

export const HoursBlock: FC<Props> = memo(({ hours }) => {
  const classes = useStyles()
  return (
    <Box display='flex' className={classes.overflow} pt={1}>
      {hours &&
        hours.map((hour, i) => (
          <Box key={hour.dt}>
            <Typography variant='body1' color='initial'>
              {i === 0 ? 'now' : new Date(hour.dt * 1000).getHours()}
            </Typography>
            <Icon>
              <img
                src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                alt={`${hour.weather[0].description}`}
              />
            </Icon>
            <Typography variant='body1' color='initial'>
              {Math.floor(hour.temp)}
              {degree}
            </Typography>
          </Box>
        ))}
    </Box>
  )
})
