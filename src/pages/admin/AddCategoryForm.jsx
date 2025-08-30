import { toast } from "react-toastify"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { createCategory } from "../../redux/apiCalls/categoryApiCall"
const AddCategoryForm = () => {
    const [title, setTitle] = useState("")
    const dispatch=useDispatch();
    const formSubmitHandler = (e) => {
        e.preventDefault()
        if(title.trim() === "") {
            return toast.error("Category title is required")
        }
        dispatch(createCategory({title}))
        setTitle("")
    }
  return (
    <div className='add-category'>
        <h6 className="add-category-title">Add New Category</h6>
        <form onSubmit={formSubmitHandler} className="add-category-form">
            <div className="add-category-form-group">
                <label htmlFor="title">Category Title</label>
                <input 
                    type="text" 
                    id="title"
                    placeholder='Enter category title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <button className='add-category-btn' type='submit'>
                Add
            </button>
        </form>
    </div>
  )
}

export default AddCategoryForm