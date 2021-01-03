import { Server } from 'socket.io';
import { io as ioClient } from 'socket.io-client';
import jwt from 'jsonwebtoken';

import { keepResourceLocally, getResourceLocally } from "../api/models/resource.model";
import { generateJwtToken } from "./security";

let socketClient;

if (process.env.SERVICE_TYPE === 'registry') {
    const options = {
        serveClient: false
    };

    const io = new Server(process.env.SOCKET_PORT, options);
    io.use(function(socket, next){
        if (socket.handshake.query && socket.handshake.query.token){
            jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET, function(err, decoded) {
                if (err) {
                    return next(new Error('Authentication error'));
                }
                socket.decoded = decoded;
                next();
            });
        }
        else {
            next(new Error('Authentication error'));
        }
    })
    .on('connection', function(socket) {
        // Connection now authenticated to receive further events

        socket.on('resource', function(resource, callback) {
            const resourceId = keepResourceLocally(resource);
            callback({
                resourceId
            });
        });

        socket.on('get_resource', function(resourceId, callback) {
            const resource = getResourceLocally(resourceId);
            callback(resource);
        });
    });
}

if (process.env.SERVICE_TYPE === 'service') {
    const token = generateJwtToken();
    const registryUri = process.env.REGISTRY_URI;

    socketClient = ioClient.connect(`http://${registryUri}`, {
        query: { token }
    });
}

export async function sendResourceToRegistry(resource) {
    const response = await new Promise((resolve, reject) => {
        if (socketClient.disconnected) {
            return reject(Error("Registry unavailable"));
        }
        socketClient.emit('resource', resource, (response) => {
            return resolve(response);
        });
    });
    return response;
}

export async function getResourceFromRegistry(resourceId) {
    const response = await new Promise((resolve, reject) => {
        if (socketClient.disconnected) {
            return reject(Error("Registry unavailable"));
        }
        socketClient.emit('get_resource', resourceId, (response) => {
            return resolve(response);
        });
    });
    return response;
}
