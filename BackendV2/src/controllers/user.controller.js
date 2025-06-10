import asyncHandler from '../utils/AsyncHandler.js';
import ApiError from '../utils/ApiError.js';
const registerUser = asyncHandler(async (req, res) => {
    // getting all the data from the user.routes.js...
    const { fullName, username, email, password } = req.body;
    // custom validation
    // simple hack to validate it throught the if statement..
    // but we have to use the zod for checking the field's length...
    if (
        [fullName, username, email, password].some(field => field.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
});
export default registerUser;