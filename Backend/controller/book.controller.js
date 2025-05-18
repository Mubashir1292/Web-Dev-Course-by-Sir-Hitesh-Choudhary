import {books} from '../books.js'
export const getAllBooks=async(req,res)=>{
    try{
        const allBooks=await books;
        if(!allBooks){
            return res.status(404).json({message:"Books not founded"});
        } 
        res.status(200).json(allBooks);
    }catch(error){
        res.status(500).json({message:"Error while fetching the books"});
    }
} 
export const getBookById=(req,res)=>{
    try{
        const id=req.params.id;
        const book=books.find(item=>item.id===id);
        if(!book){
            return res.status(404).json({message:"Book not founded"});
        }
        res.status(200).json(book);
    }catch(error){
        res.status(500).json({message:"Error while searching book"})
    }
}