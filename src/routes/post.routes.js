const router = require('express').Router();

const postValidators = require('../validators/post.validators');
const commentValidators = require('../validators/comment.validators');
const authMiddleware = require('../middlewares/auth.middleware');
const PostsController = require('../controllers/posts.controller');
const CommentsController = require('../controllers/comments.controller');

// Todos los posts
router.get('/', PostsController.getAllPosts);

// Posts por id
router.get('/:id', postValidators.getPostById, PostsController.getPostById);

// Crear un nuevo post
router.post('/', postValidators.createPost, authMiddleware.isAuth, PostsController.createPost);

// Darle like al post
router.post('/:id/like', postValidators.likePost, authMiddleware.isAuth, PostsController.likePost);

// Darle dislike al post
router.post('/:id/dislike', postValidators.dislikePost, authMiddleware.isAuth, PostsController.dislikePost);

// Actualizar un post
router.patch('/:id', postValidators.updatePost, authMiddleware.isAuth, PostsController.updatePost);

// Eliminar un post
router.delete('/:id', postValidators.deletePost, authMiddleware.isAuth, PostsController.deletePost);

/*=======================
Rutas de comentarios que
dependen de un post 
========================*/
// Crear un comentario en un post
router.post('/:id/comment', commentValidators.createComment, authMiddleware.isAuth, CommentsController.createComment);

// Todos los comentarios de un post
router.get('/:id/comment', commentValidators.getCommentsByPost, CommentsController.getCommentsByPost)

// Eliminar un comentario de un post y de la coleccion de comentarios
router.delete('/:postId/comment/:commentId', commentValidators.deleteComment, authMiddleware.isAuth, CommentsController.deleteComment)

module.exports = router;