import React from 'react'
import { Box, Image, Text, Flex, Tag, TagLabel } from '@chakra-ui/react'

import { TimeIcon } from '@chakra-ui/icons'
import { MdPeopleOutline } from 'react-icons/md'
import { ReactComponent as DifficultyIcon } from '../assets/icons/difficulty-icon.svg'

const RecipeCard = ({ recipe }) => {
  const imageUrl =
    (recipe && recipe.image) ||
    'https://image.shutterstock.com/image-photo/notepad-your-recipe-herbs-spices-600w-370298699.jpg'

  const getPeopleQuantity = quantity => {
    if (Number(quantity) === 1) {
      return `1 person`
    } else if (Number(quantity) > 1) {
      return `${quantity} people`
    } else {
      return null
    }
  }

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      mb="2%"
      mr="2%"
    >
      <Image src={imageUrl} alt={recipe.name} />

      <Box p="6">
        <Box d="flex" direction="row" justifyContent="space-between">
          <Flex direction="column">
            <Flex alignItems="center" mt="10px">
              <MdPeopleOutline size="20px" />

              <Text ml="10px">{getPeopleQuantity(recipe.people_quantity)}</Text>
            </Flex>

            <Flex alignItems="center" mt="10px">
              <TimeIcon />

              <Text ml="10px">{recipe.total_time}</Text>
            </Flex>
          </Flex>

          <Flex direction="column">
            <Flex alignItems="center" mt="10px">
              <DifficultyIcon width="22px" height="22px" />

              <Text ml="10px">{recipe.difficulty}</Text>
            </Flex>
          </Flex>
        </Box>

        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
          {recipe.name}
        </Box>

        <Box>
          {recipe && (
            <>
              <Flex py="10px" flexWrap="wrap">
                {recipe.existing_ingredients.map(({ id, name }) => (
                  <Tag
                    size="md"
                    key={id}
                    borderRadius="full"
                    variant="solid"
                    colorScheme="green"
                    mr="10px"
                    mt="10px"
                  >
                    <TagLabel>{name}</TagLabel>
                  </Tag>
                ))}

                {recipe.missing_ingredients.map(({ id, name }) => (
                  <Tag
                    size="md"
                    key={id}
                    borderRadius="full"
                    variant="solid"
                    bg="#EDF2F7"
                    color="grey.800"
                    mr="10px"
                    mt="10px"
                  >
                    <TagLabel>{name}</TagLabel>
                  </Tag>
                ))}
              </Flex>
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default RecipeCard
