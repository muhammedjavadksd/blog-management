import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {

    console.log(req.headers);

    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization header is missing or invalid' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json("You are not authenticated!");
    }


    console.log(token);

    jwt.verify(token, process.env.SECRET, async (err, data) => {
        if (err) {
            return res.status(403).json("Token is not valid!");
        }

        req.userId = data._id;
        next();
    });
};

export default verifyToken;
