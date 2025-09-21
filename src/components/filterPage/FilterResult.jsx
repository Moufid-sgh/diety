import RecipeCard from '../RecipeCard'

const FilterResult = ({ recipes }) => {

    return (
        <div className='mt-2 lg:mt-8 w-full'>
            <div className="flex flex-wrap justify-center md:justify-end items-center w-full my-6">
                {Array.isArray(recipes) && recipes.length > 0 && (
                    recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} el={recipe} />
                    ))
                )
                }
            </div>
        </div>
    )
}

export default FilterResult