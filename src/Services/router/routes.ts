/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LoginUserController } from './../../Controllers/auth/loginUserController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ClientsRegisterController } from './../../Controllers/auth/registerClientController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { WorkersRegisterController } from './../../Controllers/auth/registerWorkerController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { materialPostController } from './../../Controllers/post/materialpostController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PostController } from './../../Controllers/post/postController';
import type { RequestHandler, Router } from 'express';
const multer = require('multer');
const upload = multer();

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "FlattenMaps_T_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IWorker": {
        "dataType": "refAlias",
        "type": {"ref":"FlattenMaps_T_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IClient": {
        "dataType": "refAlias",
        "type": {"ref":"FlattenMaps_T_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IWorker.email-or-password_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"email":{"dataType":"string"},"password":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Payload": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_IWorker.email-or-password_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IMaterialPost": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string"},
            "description": {"dataType":"string"},
            "updatedAt": {"dataType":"string"},
            "workerId": {"dataType":"string"},
            "adresse": {"dataType":"string"},
            "photo": {"dataType":"string"},
            "createdAt": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPost": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string"},
            "description": {"dataType":"string"},
            "updatedAt": {"dataType":"string"},
            "clientId": {"dataType":"string"},
            "adresse": {"dataType":"string"},
            "photo": {"dataType":"string"},
            "createdAt": {"dataType":"string","required":true},
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["pending"]},{"dataType":"enum","enums":["reserved"]},{"dataType":"enum","enums":["completed"]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IResPost": {
        "dataType": "refAlias",
        "type": {"ref":"FlattenMaps_T_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.post('/login',
            ...(fetchMiddlewares<RequestHandler>(LoginUserController)),
            ...(fetchMiddlewares<RequestHandler>(LoginUserController.prototype.loginUser)),

            function LoginUserController_loginUser(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"Payload"},
                    notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"msg":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new LoginUserController();


              const promise = controller.loginUser.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/register/clients',
            upload.single('photo'),
            ...(fetchMiddlewares<RequestHandler>(ClientsRegisterController)),
            ...(fetchMiddlewares<RequestHandler>(ClientsRegisterController.prototype.createClient)),

            function ClientsRegisterController_createClient(request: any, response: any, next: any) {
            const args = {
                    notFoundResponse: {"in":"res","name":"401","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"msg":{"dataType":"string","required":true}}},
                    nom: {"in":"formData","name":"nom","required":true,"dataType":"string"},
                    prenom: {"in":"formData","name":"prenom","required":true,"dataType":"string"},
                    email: {"in":"formData","name":"email","required":true,"dataType":"string"},
                    password: {"in":"formData","name":"password","required":true,"dataType":"string"},
                    adresse: {"in":"formData","name":"adresse","required":true,"dataType":"string"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    photo: {"in":"formData","name":"photo","required":true,"dataType":"file"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new ClientsRegisterController();


              const promise = controller.createClient.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/register/workers',
            upload.single('photo'),
            ...(fetchMiddlewares<RequestHandler>(WorkersRegisterController)),
            ...(fetchMiddlewares<RequestHandler>(WorkersRegisterController.prototype.createWorker)),

            function WorkersRegisterController_createWorker(request: any, response: any, next: any) {
            const args = {
                    notFoundResponse: {"in":"res","name":"401","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"msg":{"dataType":"string","required":true}}},
                    nom: {"in":"formData","name":"nom","required":true,"dataType":"string"},
                    prenom: {"in":"formData","name":"prenom","required":true,"dataType":"string"},
                    email: {"in":"formData","name":"email","required":true,"dataType":"string"},
                    password: {"in":"formData","name":"password","required":true,"dataType":"string"},
                    adresse: {"in":"formData","name":"adresse","required":true,"dataType":"string"},
                    profession: {"in":"formData","name":"profession","required":true,"dataType":"string"},
                    avis: {"in":"formData","name":"avis","required":true,"dataType":"string"},
                    experience: {"in":"formData","name":"experience","required":true,"dataType":"string"},
                    description: {"in":"formData","name":"description","required":true,"dataType":"string"},
                    photo: {"in":"formData","name":"photo","required":true,"dataType":"file"},
                    req: {"in":"request","name":"req","dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new WorkersRegisterController();


              const promise = controller.createWorker.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/materialpost',
            upload.single('photo'),
            ...(fetchMiddlewares<RequestHandler>(materialPostController)),
            ...(fetchMiddlewares<RequestHandler>(materialPostController.prototype.createPost)),

            function materialPostController_createPost(request: any, response: any, next: any) {
            const args = {
                    title: {"in":"formData","name":"title","required":true,"dataType":"string"},
                    adresse: {"in":"formData","name":"adresse","required":true,"dataType":"string"},
                    description: {"in":"formData","name":"description","required":true,"dataType":"string"},
                    workerId: {"in":"formData","name":"workerId","required":true,"dataType":"string"},
                    photo: {"in":"formData","name":"photo","required":true,"dataType":"file"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new materialPostController();


              const promise = controller.createPost.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/materialpost',
            ...(fetchMiddlewares<RequestHandler>(materialPostController)),
            ...(fetchMiddlewares<RequestHandler>(materialPostController.prototype.getmaterialposts)),

            function materialPostController_getmaterialposts(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new materialPostController();


              const promise = controller.getmaterialposts.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/materialpost/:materialpostId',
            ...(fetchMiddlewares<RequestHandler>(materialPostController)),
            ...(fetchMiddlewares<RequestHandler>(materialPostController.prototype.getPostById)),

            function materialPostController_getPostById(request: any, response: any, next: any) {
            const args = {
                    materialpostId: {"in":"path","name":"materialpostId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new materialPostController();


              const promise = controller.getPostById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/materialpost/:materialpostId',
            upload.single('photo'),
            ...(fetchMiddlewares<RequestHandler>(materialPostController)),
            ...(fetchMiddlewares<RequestHandler>(materialPostController.prototype.updatematerialPost)),

            function materialPostController_updatematerialPost(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    materialpostId: {"in":"path","name":"materialpostId","required":true,"dataType":"string"},
                    title: {"in":"formData","name":"title","dataType":"string"},
                    adresse: {"in":"formData","name":"adresse","dataType":"string"},
                    description: {"in":"formData","name":"description","dataType":"string"},
                    workerId: {"in":"formData","name":"workerId","dataType":"string"},
                    photo: {"in":"formData","name":"photo","dataType":"file"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new materialPostController();


              const promise = controller.updatematerialPost.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/materialpost/:materialpostId',
            ...(fetchMiddlewares<RequestHandler>(materialPostController)),
            ...(fetchMiddlewares<RequestHandler>(materialPostController.prototype.delete)),

            function materialPostController_delete(request: any, response: any, next: any) {
            const args = {
                    materialpostId: {"in":"path","name":"materialpostId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new materialPostController();


              const promise = controller.delete.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/post',
            upload.single('photo'),
            ...(fetchMiddlewares<RequestHandler>(PostController)),
            ...(fetchMiddlewares<RequestHandler>(PostController.prototype.createPost)),

            function PostController_createPost(request: any, response: any, next: any) {
            const args = {
                    title: {"in":"formData","name":"title","required":true,"dataType":"string"},
                    adresse: {"in":"formData","name":"adresse","required":true,"dataType":"string"},
                    description: {"in":"formData","name":"description","required":true,"dataType":"string"},
                    clientId: {"in":"formData","name":"clientId","required":true,"dataType":"string"},
                    photo: {"in":"formData","name":"photo","required":true,"dataType":"file"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PostController();


              const promise = controller.createPost.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/post',
            ...(fetchMiddlewares<RequestHandler>(PostController)),
            ...(fetchMiddlewares<RequestHandler>(PostController.prototype.getPosts)),

            function PostController_getPosts(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PostController();


              const promise = controller.getPosts.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/post/:postId',
            ...(fetchMiddlewares<RequestHandler>(PostController)),
            ...(fetchMiddlewares<RequestHandler>(PostController.prototype.getPostById)),

            function PostController_getPostById(request: any, response: any, next: any) {
            const args = {
                    postId: {"in":"path","name":"postId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PostController();


              const promise = controller.getPostById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/post/:postId',
            upload.single('photo'),
            ...(fetchMiddlewares<RequestHandler>(PostController)),
            ...(fetchMiddlewares<RequestHandler>(PostController.prototype.updatePost)),

            function PostController_updatePost(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    postId: {"in":"path","name":"postId","required":true,"dataType":"string"},
                    title: {"in":"formData","name":"title","dataType":"string"},
                    adresse: {"in":"formData","name":"adresse","dataType":"string"},
                    description: {"in":"formData","name":"description","dataType":"string"},
                    clientId: {"in":"formData","name":"clientId","dataType":"string"},
                    photo: {"in":"formData","name":"photo","dataType":"file"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PostController();


              const promise = controller.updatePost.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/post/:postId',
            ...(fetchMiddlewares<RequestHandler>(PostController)),
            ...(fetchMiddlewares<RequestHandler>(PostController.prototype.delete)),

            function PostController_delete(request: any, response: any, next: any) {
            const args = {
                    postId: {"in":"path","name":"postId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PostController();


              const promise = controller.delete.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/post',
            ...(fetchMiddlewares<RequestHandler>(PostController)),
            ...(fetchMiddlewares<RequestHandler>(PostController.prototype.reserve)),

            function PostController_reserve(request: any, response: any, next: any) {
            const args = {
                    postId: {"in":"query","name":"postId","required":true,"dataType":"string"},
                    workerId: {"in":"query","name":"workerId","required":true,"dataType":"string"},
                    reservedPost: {"in":"res","name":"401","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"msg":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new PostController();


              const promise = controller.reserve.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            response.status(statusCode || 200)
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'queries':
                    return validationService.ValidateParam(args[key], request.query, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
