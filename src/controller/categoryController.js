import Category from '../model/Category.js'
import Counter from '../model/Counter.js'

export const getCategory = async (req, res) => {
    try {
        const category = await Category.find().sort({category_id: 1})
        res.json(category)
    } catch (error) {
        console.error('Loi khi goi getCategory', error)
        res.json({message: 'Server Error'})
    }
}

export const getCategoryById = async (req, res) => {
    try {
        const id = Number(req.params.category_id)

        const category = await Category.find({category_id: id})

        res.json(category)

    } catch (error) {
        console.error('Loi khi goi getCategoryById', error)
        res.json({message: 'Server Error'})
    }
}  

export const createCategory = async (req, res) =>{
    let counter = null
    try {
        counter = await Counter.findOneAndUpdate(
            {_id: 'category_id'},
            {$inc: {seq: 1}}
            ,{new: true, upsert: true}
        )

        const category = new Category({
            ...req.body,
            category_id: counter.seq
        })

        const newCategory = await category.save()

        res.json(newCategory)

    } catch (error) {
        console.error('Loi khi goi createCategory', error)
        if(counter) {
            try {
                await Counter.findOneAndUpdate(
                    {_id: 'category_id'},
                    {$inc: {seq: -1}}
            )
            } catch (counterError) {
                console.error('Hoan tac counter', counterError)
            }
        }
        res.json({message: 'Server Error'})
    }
}

export const updateCategory = async (req, res) => {
    try {
        const updateCategory = await Category.findOneAndUpdate(
            {category_id: req.params.category_id},
            {$set: req.body},
            {new: true, runValidators: true}
        )

        if(!updateCategory) {
            return res.json({message: 'Khong co update'})
        }
        res.json(updateCategory)
    } catch (error) {
        console.error('Loi khi goi updateCategory', error)
        res.json({message: 'Server Error'})
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const deleteCategory = await Category.findOneAndDelete({category_id: req.params.category_id})
        res.json(deleteCategory)   
    } catch (error) {
        console.error('Loi khi goi deleteCategory', error)
        res.json({message: 'Server Error'})
    }
}

export const searchCategory = async (req, res) => {
    try {
        const {keyword} = req.query

        if(!keyword || !keyword.trim()) {
            return res.json({message: 'Vui long nhap tu khoa tim kiem'})
        }

        const category = await Category.find(
            {category_name: {
                $regex: keyword.trim(),
                $options: "i"
            }}
        ).sort({category_id: 1})

        if(category.length === 0 ) {
            return res.json({message: 'Khong tim thay danh muc'})
        }

        res.json(category)

    } catch (error) {
        console.error('Loi khi goi searchCategory', error)
        res.json({message: 'Server Error'})
    }
}