import React, { useState } from 'react'
import { useStore } from './UseStore';
interface Recipes{
    id:number;
    name:string;
    ingredients:string[];
    instructions:string;
}
const RecipeApp = () => {
   const {recipes,AddRecipe,RemoveRecipe}= useStore();
   const [name,setname]= useState<string>('');
   const [ingredients,setingredients]=useState<string>('')
   const [instructions,setinstructions]=useState<string>('')
   const [editingRecipe,seteditingRecipe]=useState<Recipes|null>(null);

   const handleAddRecipe=()=>{
    if(name.trim()==='' || ingredients.trim()===''||instructions.trim()===''){
        return
    }
    AddRecipe({
        id:Date.now(),
        name,
        ingredients:ingredients.split(',').map((ingredients)=>ingredients.trim()),instructions
    });
    setname(''),
    setingredients(''),
    setinstructions('')
   }

   const handleEditRecipe=(recipe:Recipes)=>{
    seteditingRecipe(recipe)
    setname(recipe.name)
    setingredients(recipe.ingredients.join(',')),
    setinstructions(recipe.instructions)
   }
   
   const handleUpdateRecipe=()=>{
    if(name.trim()==='' || ingredients.trim()===''||instructions.trim()===''){
        return
    }
    if(editingRecipe){
        RemoveRecipe(editingRecipe.id)
        AddRecipe({
        id:Date.now(),
        name,
        ingredients:ingredients.split(',').map((ingredients)=>ingredients.trim()),instructions
    });
    seteditingRecipe(null)
     setname(''),
    setingredients(''),
    setinstructions('')
   }
}
const handleCancelEdit=()=>{
    seteditingRecipe(null);
     setname(''),
    setingredients(''),
    setinstructions('')
   }
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h1 className=" text-3xl font-bold mb-6 text-green-800">
                Recipe Book
            </h1>
          <div className='space-y-4 mb-6'>
            <input type="text" value={name}onChange={(e)=>setname(e.target.value)} placeholder='Recipe Name' className='w-full px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500' />

             <input type="text" value={ingredients}onChange={(e)=>setingredients(e.target.value)} placeholder='Ingredients (comma seperated)' className='w-full px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500' />

              <textarea  value={instructions}onChange={(e)=>setinstructions(e.target.value)} placeholder='Instructions' className='w-full px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'/>
                <div className='flex justify-between'>
                    {editingRecipe ?(
                        <>
                        <button onClick={handleUpdateRecipe}
                        className='bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500'
                        >Update Recipe</button>
                        <button onClick={handleCancelEdit}
                        className='bg-gray-500 py-2 px-4 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-500 hover:bg-gray-600 '
                        >Cancel</button>
                        </>
                    ):(
                       <>
                       <button onClick={handleAddRecipe} 
                       className='bg-green-500 text-white px-4 py-2 hover:bg-green-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                       >Add Recipe</button>
                       </>
                    )
                }
                </div>
          </div>
          <ul className='space-y-4'>
            {recipes.map((recipe)=>(
                <li key={recipe.id} className='p-4 bg-green-50 rounded-lg shadow-sm'>
                    <h2 className="text-xl font-semibold text-green-800 mb-2">{recipe.name}</h2>
                    <p className='text-green-700 mb-2'>
                <strong>Ingredients:</strong>{recipe.ingredients.join(",")}
                    </p>
                    <div className='flex justify-between'>
                        <button onClick={()=>handleEditRecipe(recipe)} 
                        className='bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500'
                        >Edit</button>
                        <button onClick={()=>RemoveRecipe(recipe.id)}
                           className= 'bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500'
                            >Delete</button>
                    </div>
                </li>
            ))}
          </ul>
        </div>
    </div>
  )
}

export default RecipeApp
