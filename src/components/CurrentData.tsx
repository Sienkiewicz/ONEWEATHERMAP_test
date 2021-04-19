import { Box, Grid, Typography } from '@material-ui/core'
import React, { FC, memo } from 'react'
import { upperCaseFirst } from '../helpers/helps'
import { CurrentType } from '../helpers/types'
import { degree } from '../helpers/utils'

type Props = {
  data: CurrentType
  hightTemp: number
  lowTemp: number
  city: string
}

export const CurrentData: FC<Props> = memo(
  ({ data, hightTemp, lowTemp, city }) => {
    return (
      <Box py={1}>
        <Typography variant='h4'>{upperCaseFirst(city)}</Typography>
        <Typography variant='body1'>{data.weather[0].description}</Typography>
        <Typography variant='h2'>
          {Math.floor(data.temp)}
          {degree}
        </Typography>
        <Grid container spacing={2} justify='center'>
          <Grid item>
            <Typography variant='body1' color='initial'>
              L {Math.floor(lowTemp)}
              {degree}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='body1' color='initial'>
              H {Math.floor(hightTemp)}
              {degree}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    )
  }
)
