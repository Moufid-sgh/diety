import RecipeCard from '../RecipeCard'

const FilterResult = ({ recipes }) => {

    return (
        <div className='mt-2 lg:mt-8 w-full'>
            <div className="flex flex-wrap justify-center items-start w-full my-6">
                {Array.isArray(recipes) && recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} el={recipe} />
                    ))
                    )
                    :
                    (
                        <div className="w-full text-center text-2xl my-8">
                            لم يتم العثور على وصفات
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default FilterResult