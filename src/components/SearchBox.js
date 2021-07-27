/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Tag,
  TagLabel,
  TagCloseButton,
  Divider,
  Select,
} from '@chakra-ui/react'

import { SearchIcon } from '@chakra-ui/icons'

import API from '../common/api'
import Recipes from './Recipes'

const SearchBox = () => {
  const [page, setPage] = useState(null)
  const [reachedEnd, setReachedEnd] = useState(false)
  const [recipes, setRecipes] = useState(null)
  const [ingredients, setIngredients] = useState([])
  const [peopleQuantity, setPeopleQuantity] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const difficulties = ['très facile', 'facile', 'Niveau moyen', 'difficile']

  useEffect(async () => {
    setReachedEnd(false)

    if (ingredients.length === 0 && peopleQuantity === '') {
      setRecipes(null)
      setPage(null)
    } else {
      let query = `recipes?per_page=${4}`

      if (peopleQuantity > 0 && !isNaN(peopleQuantity)) {
        query = query + `&quantity=${peopleQuantity}`
      }

      if (difficulties.includes(difficulty)) {
        query = query + `&difficulty=${difficulty}`
      }

      if (ingredients.length > 0) {
        const ingredientsParams =
          '&ingredients[]=' + ingredients.join('&ingredients[]=')
        query = query + ingredientsParams
      }

      const response = await API.get(query)

      setRecipes(response.data)
      setPage(response.data.pagination.next)
    }
  }, [ingredients, peopleQuantity, difficulty])

  const showMore = async () => {
    let ingredientsParams = ''
    if (ingredients.length > 0) {
      ingredientsParams =
        '&ingredients[]=' + ingredients.join('&ingredients[]=')
    }

    let peopleQuantityParam = ''
    if (peopleQuantity > 0 && !isNaN(peopleQuantity)) {
      peopleQuantityParam = `&quantity=${peopleQuantity}`
    }

    let difficultyParam = ''
    if (difficulties.includes(difficulty)) {
      difficultyParam = `&difficulty=${difficulty}`
    }

    const response = await API.get(
      `recipes?per_page=${4}${peopleQuantityParam}${difficultyParam}${ingredientsParams}&page=${page}`
    )

    if (response.data.data && response.data.data.length > 0) {
      setRecipes({
        data: [...recipes.data, ...response.data.data],
        pagination: response.data.pagination,
      })
      setPage(response.data.pagination.next)
    } else {
      setPage(null)
      setReachedEnd(true)
    }
  }

  return (
    <Flex direction="column">
      <Flex flexWrap="wrap" justify="space-between">
        <Flex direction="column" flex={2} minWidth="400px">
          <Flex color="gray" fontWeight="bold" py="20px">
            Enter an ingredient:
          </Flex>

          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              bg="white"
              type="text"
              placeholder="Tomates, Cailles, etc..."
              onKeyPress={event => {
                const value = event.target.value
                if (event.key === 'Enter' && value !== '') {
                  if (!ingredients.includes(value)) {
                    setIngredients([...ingredients, value])
                  }
                  event.target.value = ''
                }
              }}
            />
          </InputGroup>

          <Flex py="10px" flexWrap="wrap" justify="flex-start" flex={3}>
            {ingredients.map((ingredient, index) => (
              <Tag
                mb="10px"
                mr="10px"
                size="lg"
                key={index}
                borderRadius="full"
                variant="solid"
                colorScheme="green"
              >
                <TagLabel>{ingredient}</TagLabel>
                <TagCloseButton
                  onClick={() => {
                    const newIngredients = ingredients.filter(
                      name => name !== ingredient
                    )
                    setIngredients(newIngredients)
                  }}
                />
              </Tag>
            ))}

            {ingredients.length > 0 && (
              <Tag
                mb="10px"
                mr="10px"
                size="lg"
                borderRadius="full"
                variant="solid"
                bg="#EDF2F7"
                color="grey.800"
                border="1px #1A202C solid"
                cursor="pointer"
                onClick={() => {
                  setIngredients([])
                }}
              >
                <TagLabel>clear all</TagLabel>
                <TagCloseButton />
              </Tag>
            )}
          </Flex>
        </Flex>
        <Flex direction="column" flex={1} ml="20px" minWidth="195px">
          <Flex color="gray" fontWeight="bold" py="20px">
            Enter number of people:
          </Flex>
          <Input
            bg="white"
            placeholder="People quantity"
            onChange={event => {
              const value = Number(event.target.value)
              if (!isNaN(value) && value > 0) {
                setPeopleQuantity(value)
              }

              if (event.target.value === '') {
                if (ingredients.length === 0) {
                  setRecipes(null)
                }
                setPeopleQuantity('')
              }
            }}
          />
        </Flex>
        <Flex direction="column" flex={1} ml="20px" minWidth="195px">
          <Flex color="gray" fontWeight="bold" py="20px">
            Choose difficulty:
          </Flex>
          <Select
            bg="white"
            placeholder="Select difficulty"
            onChange={event => {
              setDifficulty(event.target.value)
            }}
          >
            {difficulties.map((diff, index) => (
              <option key={index} value={diff}>
                {diff}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>

      <Divider pt="20px" />

      <Recipes recipes={recipes} showMore={showMore} reachedEnd={reachedEnd} />
    </Flex>
  )
}

export default SearchBox
