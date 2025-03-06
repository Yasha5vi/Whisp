// try catch
// basically baar baar 
// async await likhne se accha ek utility bna di

const asyncHandler = (fn)=>{
    async (req, res, next)=>{
        try{
            await fn(req, res, next)
        }catch(err){
            res.status(err.code || 500).json({
                success:false,
                message:err.message
            })
        }
    }
}

export  { asyncHandler };

// promise vala method
// const asyncHandler = (fn) => {
//     (req, res, next)=>{
//         Promise.resolve(fn(req, res, next))
//         .catch((err) => next(err))
//     }
// }