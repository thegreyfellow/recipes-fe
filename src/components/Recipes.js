import React from 'react'
import { Flex, Text, Button } from '@chakra-ui/react'

import RecipeCard from './RecipeCard'

const Recipes = ({ recipes, showMore, reachedEnd }) => {
  return (
    <Flex pt="20px" direction="column">
      {recipes && recipes.data && recipes.data.length > 0 ? (
        <>
          <Flex flexWrap="wrap">
            {recipes.data.map(recipe => {
              return <RecipeCard recipe={recipe} />
            })}
          </Flex>

          {!reachedEnd && (
            <Button
              onClick={showMore}
              my="50px"
              justifySelf="center"
              alignSelf="center"
              width="20%"
              minWidth="max-content"
              border="1px grey solid"
            >
              <Text>Show more</Text>
            </Button>
          )}
        </>
      ) : (
        <Text alignSelf="center" mt="50px">
          No Recipes to show
        </Text>
      )}
    </Flex>
  )
}

export default Recipes
