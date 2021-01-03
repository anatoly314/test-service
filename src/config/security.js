import jwt from 'jsonwebtoken';

export function generateJwtToken() {
    const token = jwt.sign({ foo: 'bar' }, process.env.JWT_SECRET);
    return token;
}
