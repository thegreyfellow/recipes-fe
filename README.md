# README

A simple straight forward recipe search using a set of recipes
file in the repository.

### Setup:

* Node version:
	*  v14.17.x
- React version:
	-  17.0.x
- Packages used:
	- React.
	- Chakra UI for UI components and styling.
	- Axios for requests.
-  Configuration:
	- Add API url as env variable called `REACT_APP_API_PATH`
- Project initialization:
	- run the current commands:
	```bash
	$ git clone git@github.com:thegreyfellow/recipes-fe.git
	$ yarn install
	$ yarn start
	$ # then check your browser at localhost:3000
	```

### Ideas to be implemented:
- [ ] One thing to make the UI more pretty, is to add a `see more`
button at the end of the Recipe card, for when there is a lot of ingredients all the cards will have the same height.

- [ ] the image in the card would be better if they all had the same height too, the UI will look more consistent.

- [ ] Add any other information possible as a filter to minimize the request duration (aka. query duration)


