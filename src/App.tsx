import './App.css'
import Typography from '@material-ui/core/Typography'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Box, Container, Divider, makeStyles } from '@material-ui/core'
import { SearchBar } from './components/SearchBar'
import { fetchData } from './helpers/query'
import { RootDataType } from './helpers/types'
import { CurrentData } from './components/CurrentData'
import { TableBlock } from './components/TableBlock'
import { HoursBlock } from './components/HoursBlock'

const useStyles = makeStyles(theme => ({
  root: {
    background: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: ' blur(25px)',
    borderBottomColor: '#ccc',
    borderRightColor: '#ccc',
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
  },
  input: {
    color: 'white',
  },
}))

function App() {
  const classes = useStyles()
  const [query, setQuery] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [data, setData] = useState<RootDataType | undefined>()
  const [city, setCity] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const title = 'write your city'

  const handlerSearchBar = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setQuery(e.target.value)
    },
    [setQuery]
  )

  const addErrorMessage = useCallback(
    (tempQuery?: string) => {
      setData(undefined)
      setErrorMessage(
        tempQuery
          ? `Seems like the city '${tempQuery.toUpperCase()}' was not found`
          : 'Something wrong. Check later'
      )
      setIsFetching(false)
    },
    [setData, setErrorMessage, setIsFetching]
  )

  const startFetch = useCallback(() => {
    setIsFetching(true)
    setErrorMessage('')
  }, [setIsFetching])

  useEffect(() => {
    if (!!query) {
      const tempQuery = query

      setCity(query)
      setQuery('')

      fetchData(tempQuery).then(d => {
        if (Array.isArray(d)) {
          addErrorMessage(tempQuery)
          return
        }

        if (d.hasOwnProperty('cod')) {
          addErrorMessage()
          return
        }

        setData(d as RootDataType)
        setIsFetching(false)
      })
    }
  }, [isFetching])

  return (
    <Box className='App'>
      <Container maxWidth='sm'>
        <Box
          className={classes.root}
          m={{ xs: 2, sm: 3 }}
          border={1}
          borderRadius={5}
          p={1}
        >
          <SearchBar
            title={title}
            query={query}
            handlerSearchBar={handlerSearchBar}
            startFetch={startFetch}
            isFetching={isFetching}
          />
        </Box>
        {data ? (
          <Box
            className={classes.root}
            m={{ xs: 2, sm: 3 }}
            border={1}
            borderRadius={5}
            // p={1}
          >
            <CurrentData
              city={city}
              data={data?.current}
              hightTemp={data.daily[0].temp.max}
              lowTemp={data.daily[0].temp.min}
            />
            <Divider />
            <HoursBlock hours={data.hourly} />
            <Divider />
            <TableBlock days={data.daily.slice(0, 5)} />
          </Box>
        ) : (
          errorMessage && (
            <Typography variant='h6' color='initial'>
              {errorMessage}
            </Typography>
          )
        )}
      </Container>
    </Box>
  )
}

export default App
