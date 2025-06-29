import jwt from 'jsonwebtoken'

export const adminloggedin = async (req, res, next) => {
    try {
        // Get token from custom header
        const token = req.headers.token || req.headers['x-access-token'];
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                msg: "No token provided in headers" 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded.isAdmin) {
            return res.status(403).json({ 
                success: false, 
                msg: "Admin access required" 
            });
        }
        
        req.user = decoded; // Attach decoded user to request
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        
        let msg = "Invalid token";
        if (error.name === 'TokenExpiredError') {
            msg = "Token expired";
        } else if (error.name === 'JsonWebTokenError') {
            msg = "Malformed token";
        }
        
        res.status(401).json({ success: false, msg });
    }
};