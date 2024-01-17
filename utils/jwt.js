
export const sendToken = (user, statusCode, res) => {
    const accessToken = user.SignAccessToken();

    res.status(statusCode).json({
        success: true,
        user,
        accessToken,
    })
}