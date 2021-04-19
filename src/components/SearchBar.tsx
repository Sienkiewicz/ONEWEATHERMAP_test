import React, { ChangeEvent, FC, useCallback, useState } from 'react'
import { CircularProgress, Grid, TextField, Fab } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

type Props = {
  title: string
  query: string
  isFetching: boolean

  handlerSearchBar(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
  startFetch(): void
}

const AMOUNT_OF_LATTER = 1

export const SearchBar: FC<Props> = React.memo(
  ({ title, query, handlerSearchBar, startFetch, isFetching }) => {
    const [isFocused, setIsFocused] = useState(false)
    const isValid = query.length < AMOUNT_OF_LATTER

    const addFocus = useCallback(() => {
      setIsFocused(true)
    }, [setIsFocused])

    const deleteFocus = useCallback(() => {
      setIsFocused(false)
    }, [setIsFocused])

    const setFetch = useCallback(() => {
      startFetch()
      setIsFocused(false)
    }, [startFetch, setIsFocused])

    return (
      <Grid container spacing={1} justify='center' alignItems='center'>
        <Grid item xs={9}>
          <TextField
            required
            fullWidth
            id='searchBar'
            label={title}
            value={query}
            onFocus={addFocus}
            onBlur={deleteFocus}
            helperText={
              isFocused && isValid && 'you must add at least 3 symbol'
            }
            error={isFocused && isValid}
            onChange={e => handlerSearchBar(e)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                !isValid && startFetch()
                setIsFocused(false)
              }
            }}
          />
        </Grid>
        <Grid item>
          <Fab
            color='primary'
            aria-label='add'
            onClick={setFetch}
            disabled={isValid}
            size='small'
          >
            {isFetching ? (
              <CircularProgress size={25} color='inherit' />
            ) : (
              <SearchIcon />
            )}
          </Fab>
        </Grid>
      </Grid>
    )
  }
)
