import React from 'react'
import { Flex } from '@chakra-ui/react'

import Layout from '../components/Layout'
import SearchBox from '../components/SearchBox'

const Home = () => {
  return (
    <Layout>
      <Flex direction="column" justify="center">
        <SearchBox />
      </Flex>
    </Layout>
  )
}

export default Home
