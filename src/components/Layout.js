import React from 'react'
import { ChakraProvider, Box, theme } from '@chakra-ui/react'

const Layout = ({ ...props }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box p="100px" fontSize="md" bg="gray.50" minHeight="100vh">
        {props.children}
      </Box>
    </ChakraProvider>
  )
}

export default Layout
