import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import React, { FC, memo } from 'react'
import { week } from '../helpers/helps'
import { Daily } from '../helpers/types'
import { degree } from '../helpers/utils'

type Props = {
  days: Daily[]
}

export const TableBlock: FC<Props> = memo(({ days }) => {
  const tableCell = (item: number) => {
    return (
      <TableCell align='right'>
        {Math.floor(item)}
        {degree}
      </TableCell>
    )
  }
  return (
    <Box py={2} px={1}>
      <TableContainer>
        <Table size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Temp per day</b>
              </TableCell>
              <TableCell align='right'>
                <b>morning</b>
              </TableCell>
              <TableCell align='right'>
                <b>day</b>
              </TableCell>
              <TableCell align='right'>
                <b>evening</b>
              </TableCell>
              <TableCell align='right'>
                <b>night</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {days &&
              days.map(day => {
                const item = day.temp
                return (
                  <TableRow key={day.dt}>
                    <TableCell component='th' scope='row'>
                      {week[new Date(day.dt * 1000).getDay()]}
                    </TableCell>
                    {tableCell(item.morn)}
                    {tableCell(item.day)}
                    {tableCell(item.eve)}
                    {tableCell(item.night)}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
})
